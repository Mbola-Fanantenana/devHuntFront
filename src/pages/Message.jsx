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

    // Écoute de l'événement 'update' du socket
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
            <div className={`bg-gray-300 rounded-xl text-center`}>
                {storedData.nomUtilisateur} {storedData.prenomUtilisateur}
            </div>
            <div className={`w-full flex h-full m-8 flex-row bg-green-200`}>
                <div className={`w-1/4 `}>
                    <div className='m-5 space-x-5'>
                        <div class="relative inline-flex">
                            <button onClick={setLoadingTrue}
                                    class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                    type="button">
                                En ligne
                            </button>
                            <span
                                class="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4 bg-red-500 text-white min-w-[24px] min-h-[24px]">
                            {notif_Total && (
                                <span className=''>
                                    {notif_Total}
                                </span>
                            )}
                        </span>
                        </div>
                        <div class="relative inline-flex">
                            <button onClick={setLoadingFalse}
                                    class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                    type="button">
                                En ligne
                            </button>
                            <span
                                class="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4 bg-red-500 text-white min-w-[24px] min-h-[24px]">
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
                        className="px-3 w-full py-2 rounded-xl"
                    />
                    <hr className={`my-1 border-0.3 border-black`} />
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
                                        className={`flex hover:bg-gray-600 px-3 py-1 my-0.5 bg-white rounded-lg items-center cursor-pointer user-item`}
                                    >
                                        <div
                                            className={`badge ${unreadCountData ? 'badge-unread' : 'badge-read'}`}
                                        ></div>
                                        <div className={`ml-4`}>
                                            <span className="font-bold">{user.nomUtilisateur}</span>
                                            <span className="ml-2">{user.prenomUtilisateur}</span>
                                            <span
                                                class="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4 bg-red-500 text-white min-w-[30px] min-h-[30px]">
                            {unreadCountData && (
                                <span className="text-red-500">{unreadCountData.unreadCount || ''}</span>
                            )}
                        </span>

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
                                            class="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4 bg-red-500 text-white min-w-[30px] min-h-[30px]">
                            {unreadCountData && (
                                <span className="text-red-500">{unreadCountData.unreadCount || ''}</span>
                            )}
                        </span>
                                    </div>
                                );
                            })
                    )}
                </div>
                <div className="relative w-full min-h-[85vh] max-h-[85vh] p-6 overflow-y-auto  bg-white border-b border-gray-200">

                    {titreMessage && titreMessage.length === 0 ? (
                        ''
                    ) : (
                        <>
                            <div className={`flex space-x-3`}>
                                <div
                                    className={`py-2 px-3 bg-slate-800 text-white rounded-full text-center my-3`}
                                >
                                    Messages
                                </div>
                                <div
                                    className={`py-2 px-3 bg-slate-500 rounded-full text-center my-3`}
                                >
                                    {titreMessage.nomUtilisateur} {titreMessage.prenomUtilisateur}
                                </div>
                            </div>
                            <hr className={`my-1 border-0.3 border-black`} />
                        </>
                    )}
                    {message && message.length !== 0 ? (
                        <div className={`flex flex-col items-center   justify-center`}>
                            {message.map((msg, index) => (
                                <div key={index} className='w-[100%]  m-3 space-y-3'>
                                    <div className={`flex flex-row justify-center text-xs space-x-2`}><span>{msg.dateEnvoi.split('T')[0]} </span><span>{msg.heureMessage} </span> </div>
                                    <div
                                        className={`px-3 w-[100%] py-2 my-1 rounded-xl ${msg.emetteurMessageId === storedData.idUtilisateur
                                            ? 'bg-blue-500 text-white self-end'
                                            : 'bg-white text-black'
                                        }`}
                                    >

                                        {msg.contenuMessage}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className={`px-3 py-5 text-gray-600 bg-gray-200 rounded-xl`}>
                                Aucun message pour le moment ...
                            </div>
                        </>
                    )}

                </div>

            </div>
            <div className="flex justify-end  space-x-2 mt-4">
                <input
                    type="text"
                    name={'contenuMessage'}
                    className="w-[75%] py-2 pl-4 mx-3 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Écrire un nouveau message..."
                    value={formData.contenuMessage}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    onClick={sendMessage}
                    className="px-5 text-sm bg-red-500 font-medium rounded-full text-slate hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                >
                    +
                </button>
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
