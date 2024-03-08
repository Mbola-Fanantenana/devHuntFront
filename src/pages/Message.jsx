/* eslint-disable react/no-unknown-property */
// Import des bibliothèques nécessaires
import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../config.json';
import io from 'socket.io-client';

// Initialisation du socket
const socket = io(`${api.API_SOCKET}`);

function Message() {
    const [storedData, setStoredData] = useState([]);
    const [conversation, setConversation] = useState([]);
    const [message, setMessage] = useState([]);
    const [allUser, setAllUser] = useState([]);
    const [titreMessage, setTitreMessage] = useState([]);
    const [recepteur, setRecepteur] = useState('');
    const [loading, setLoading] = useState(true);
    const [dataChanged, setDataChanged] = useState(false);
    const [unreadCounts, setUnreadCounts] = useState([]);
    const [notif_Total, setNotif_total] = useState(0);
    const [formData, setFormData] = useState({
        contenuMessage: '',
        heureMessage: '',
    });
    const [searchTerm, setSearchTerm] = useState('');

    socket.on('update', () => {
        setDataChanged(!dataChanged);
    });

    // Utilisation de useEffect pour gérer le cycle de vie du composant
    useEffect(() => {
        const dataFromLocalStorage = localStorage.getItem('userSession');
        if (dataFromLocalStorage) {
            setStoredData(JSON.parse(dataFromLocalStorage));
        }
        setAllUsers();
        notification_badge(JSON.parse(dataFromLocalStorage).idUtilisateur);
    }, [dataChanged]);

    useEffect(() => {
        document.title = 'ENI Novice | Messages'
    })

    useEffect(() => {
        const fetchConversation = async () => {
            axios
                .get(`${api.API_HOST}/api/getConversationDeuxUser/${recepteur}/${storedData.idUtilisateur}`)
                .then(async (response) => {
                    await setMessage(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        fetchConversation();
    }, [dataChanged, recepteur, storedData.idUtilisateur]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
            ["heureMessage"]: getCurrentTime(),
        });
    };

    const setAllUsers = async () => {
        try {
            const usersResponse = await axios.get(`${api.API_HOST}/api/users`);
            setAllUser(usersResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    const notification_badge = async (id) => {
        try {
            const unreadCountsResponse = await axios.get(`${api.API_HOST}/api/getUnreadMessageCountsForUser/${id}`);
            const unreadCountsData = unreadCountsResponse.data;

            setUnreadCounts(unreadCountsData);
            setDataChanged(!dataChanged);

            const totalUnreadCount = Object.values(unreadCountsData).reduce((acc, user) => acc + user.unreadCount, 0);
            setNotif_total(totalUnreadCount);
        } catch (error) {
            console.error(error);
        }
    };

    const setMessageWith = (idRecepteur) => {
        setRecepteur(idRecepteur);
        axios
            .get(`${api.API_HOST}/api/getConversationDeuxUser/${idRecepteur}/${storedData.idUtilisateur}`)
            .then(async (response) => {
                await setMessage(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get(`${api.API_HOST}/api/markMessagesAsRead/${storedData.idUtilisateur}/${idRecepteur}`).then(() => {
            setDataChanged(!dataChanged);
        });

        axios
            .get(`${api.API_HOST}/api/user/${idRecepteur}`)
            .then((response) => {
                setTitreMessage(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const sendMessage = () => {
        axios
            .post(
                `${api.API_HOST}/api/createMessage/${storedData.idUtilisateur}/${recepteur}`,
                JSON.stringify(formData),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then(async () => {
                await axios.get(`${api.API_HOST}/api/markMessagesAsRead/${storedData.idUtilisateur}/${recepteur}`);
                setFormData({
                    contenuMessage: '',
                    heureMessage: '',
                });
                await notification_badge(storedData.idUtilisateur);
                setDataChanged(!dataChanged);
            })
            .catch((error) => {
                console.error('Erreur lors de la requête : ', error);
            });
    };

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}`;
    };

    const setLoadingTrue = () => {
        setLoading(true);
    };

    const setLoadingFalse = async () => {
        setLoading(false);

        if (storedData) {
            try {
                const conversationResponse = await axios.get(
                    `${api.API_HOST}/api/getConversationByUserId/${storedData.idUtilisateur}`
                );

                const usersPromises = Object.keys(conversationResponse.data).map(async (user) => {
                    const utilisateurResponse = await axios.get(`${api.API_HOST}/api/user/${user}`);
                    return utilisateurResponse.data;
                });

                const usersData = await Promise.all(usersPromises);

                setConversation(usersData);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className={` w-full min-h-[80vh] max-h-[80vh] `}>
            {/* <div className="flex-1 p-4 m-2 flex justify-center font-medium bg-white bg-opacity-25 backdrop-blur-md shadow-lg rounded-lg">
                {storedData.nomUtilisateur} {storedData.prenomUtilisateur}
            </div> */}
            <div className="relative flex-1 m-2 bg-white bg-opacity-25 backdrop-blur-md shadow-lg rounded-lg flex flex-row">
                <div className={`w-1/4 rounded-tl-lg rounded-bl-lg flex-1 bg-white bg-opacity-25 px-2`}>
                    <div className='flex justify-center my-4 space-x-3'>
                        <div className="relative inline-flex ">
                            <button onClick={setLoadingTrue}
                                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded bg-[#007a55] text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                type="button">
                                En ligne
                            </button>
                            <span
                                className="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4 bg-[#ea4444] text-white min-w-[24px] min-h-[24px]">
                                {notif_Total && (
                                    <span className=''>
                                        {notif_Total}
                                    </span>
                                )}
                            </span>
                        </div>
                        <div className="relative inline-flex">
                            <button onClick={setLoadingFalse}
                                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded bg-[#007a55] text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                type="button">
                                Discussion
                            </button>
                            <span
                                className="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4 bg-[#ea4444] text-white min-w-[24px] min-h-[24px]">
                                {notif_Total && (
                                    <span className=''>
                                        {notif_Total}
                                    </span>
                                )}
                            </span>
                        </div>
                    </div>
                    <hr className={`my-1 border-0.3 border-black`} />
                    <input
                        type="text"
                        placeholder="Rechercher un utilisateur..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-2 border-gray-500 w-full py-2 rounded"
                    />
                    <hr className={`my-1 border-0.3 border-black`} />
                    <div className="space-y-2">
                        {loading ? (
                            allUser
                                .filter((user) =>
                                    `${user.nomUtilisateur} ${user.prenomUtilisateur}`
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                )
                                .map((user, index) => {
                                    const unreadCountData = unreadCounts.find((data) => data.senderId === user.idUtilisateur);

                                    return (
                                        <div
                                            key={index}
                                            onClick={() => setMessageWith(user.idUtilisateur)}
                                            className={`flex hover:bg-green-600 px-1 py-2 bg-[#fff] rounded items-center cursor-pointer w-full`}
                                        >
                                            <div className={`badge ${unreadCountData ? 'badge-unread' : 'badge-read'}`}></div>
                                            <div className={`mx-2`}>
                                                <span className="font-bold">{user.nomUtilisateur}</span>
                                                <span className="ml-2">{user.prenomUtilisateur}</span>
                                            </div>
                                        </div>
                                    );
                                })
                        ) : (
                            conversation
                                .filter((user) =>
                                    `${user.nomUtilisateur} ${user.prenomUtilisateur}`
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                )
                                .map((user, index) => {
                                    const unreadCountData = unreadCounts.find((data) => data.senderId === user.idUtilisateur);

                                    return (
                                        <div
                                            key={index}
                                            onClick={() => setMessageWith(user.idUtilisateur)}
                                            className={`px-3 py-1 my-0.5 bg-white rounded-lg cursor-pointer`}
                                        >
                                            {user.nomUtilisateur} {user.prenomUtilisateur}
                                            <span
                                                className="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4 bg-red-500 text-white min-w-[30px] min-h-[30px]">
                                                {unreadCountData && (
                                                    <span className="text-red-500">{unreadCountData.unreadCount || ''}</span>
                                                )}
                                            </span>
                                        </div>
                                    );
                                })
                        )}
                    </div>
                </div>
                <div className='flex flex-col w-3/4 rounded-r-md bg-[#ddd]'>
                    {titreMessage && titreMessage.length === 0 ? (
                        ''
                    ) : (
                        <>
                            <div className={`flex rounded-tr-lg`}>
                                <div
                                    className={`py-2 px-4 bg-[#007a55] bg-opacity-50 rounded ml-4 text-center my-3 shadow shadow-gray-200`}
                                >
                                    {titreMessage.nomUtilisateur} {titreMessage.prenomUtilisateur}
                                </div>
                            </div>
                        </>
                    )}
                    {/* <hr className={`my-1 border-0.3 border-black`} /> */}
                    <div className="px-6 overflow-auto h-[390px] bg-[#f2f2f2] border-b border-gray-200">
                        {message && message.length !== 0 ? (
                            <div className={`flex flex-col items-center justify-center p-6`}>
                                {message.map((msg, index) => (
                                    <div key={index} className='w-[100%] m-3 space-y-3'>
                                        <div className={`flex flex-row justify-center text-xs space-x-2`}><span>{msg.dateEnvoi.split('T')[0]} </span><span>{msg.heureMessage} </span> </div>
                                        <div
                                            className={`px-3 w-[100%] py-2 my-1 rounded-xl ${msg.emetteurMessageId === storedData.idUtilisateur
                                                ? "w-[80%] px-4 py-2 rounded flex place-content-end bg-[#007a55] bg-opacity-80 text-white focus:outline-none focus:bg-opacity-75 ml-auto"
                                                : "w-[80%] px-4 py-2 rounded-xl bg-slate-500 bg-opacity-70 focus:outline-none focus:bg-opacity-75"
                                                }`}
                                        >
                                            {msg.contenuMessage}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <div className={`px-8 py-5 text-gray-600 bg-gray-300 rounded-md`}>
                                    Aucun message pour le moment ...
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-start sticky space-x-2 bottom-0 p-2 rounded-br-lg">
                        <input
                            type="text"
                            name={'contenuMessage'}
                            className="w-[100%] py-2 outline-none bg-gray-50 border pl-4 border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Écrire un nouveau message..."
                            value={formData.contenuMessage}
                            onChange={handleInputChange}
                        />
                        <button
                            type="submit"
                            onClick={sendMessage}
                            className="px-5 text-sm bg-[#007a55] font-medium pr-4 rounded text-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                        >
                            <svg
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18.0693 8.50867L9.50929 4.22867C3.75929 1.34867 1.39929 3.70867 4.27929 9.45867L5.14929 11.1987C5.39929 11.7087 5.39929 12.2987 5.14929 12.8087L4.27929 14.5387C1.39929 20.2887 3.74929 22.6487 9.50929 19.7687L18.0693 15.4887C21.9093 13.5687 21.9093 10.4287 18.0693 8.50867ZM14.8393 12.7487H9.43929C9.02929 12.7487 8.68929 12.4087 8.68929 11.9987C8.68929 11.5887 9.02929 11.2487 9.43929 11.2487H14.8393C15.2493 11.2487 15.5893 11.5887 15.5893 11.9987C15.5893 12.4087 15.2493 12.7487 14.8393 12.7487Z"
                                    fill="#ddd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
<style jsx>{`
  .badge {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
  }

  .badge-read {
    background-color: #4caf50; /* couleur du badge pour les messages lus */
  }

  .badge-unread {
    background-color: #f44336; /* couleur du badge pour les messages non lus */
  }
`}</style>
export default Message;
