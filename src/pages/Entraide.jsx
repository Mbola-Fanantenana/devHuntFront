import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import FormModal from "../components/FormModal.jsx";
import { Link } from "react-router-dom";

const Entraide = () => {
    const [entraide, setEntraide] = useState([]);
    const [dataChanged, setDataChanged] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idModifier, setIdModifier] = useState('');
    const [logo, setLogo] = useState(null);
    const [userConnected, setUserConnected] = useState(null);

    const initialeState = {
        logoEntraide: "",
        chefEntraide: "",
        detailEntraide: "",
        lienEntraide: "",
        nomEntraide: "",
        idUtilisateur: ""
    };

    const [formData, setFormData] = useState(initialeState);

    useEffect(() => {
        axios
            .get(`${config.API_HOST}/api/entraides`)
            .then((response) => {
                setEntraide(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [dataChanged]);

    useEffect(() => {
        document.title = 'ENI Novice | Entraide'
    })

    useEffect(() => {
        const userLocaleStorage = localStorage.getItem("userSession");
        setUserConnected(JSON.parse(userLocaleStorage).idUtilisateur);
    }, []);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIdModifier('');
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleModalAction = () => {
        setIsModalOpen(false);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        console.log(userConnected)
        const formDataAppend = new FormData();
        formDataAppend.append("logoEntraide", logo);
        formDataAppend.append("chefEntraide", formData.chefEntraide);
        formDataAppend.append("detailEntraide", formData.detailEntraide);
        formDataAppend.append("lienEntraide", formData.lienEntraide);
        formDataAppend.append("nomEntraide", formData.nomEntraide);
        formDataAppend.append("idUtilisateur", userConnected);

        axios
            .post(`${config.API_HOST}/api/createEntraide`, formDataAppend)
            .then((response) => {
                setFormData(initialeState);
                setDataChanged(!dataChanged);
                handleCloseModal();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const ouvrirModifier = async (id) => {
        await handleOpenModal();
        setIdModifier(id);
        console.log(id);
        axios.get(`${config.API_HOST}/api/entraide/${id}`)
            .then((response) => {
                setFormData({
                    // logoEntraide: response.data.logoEntraide,
                    chefEntraide: response.data.chefEntraide,
                    detailEntraide: response.data.detailEntraide,
                    lienEntraide: response.data.lienEntraide,
                    nomEntraide: response.data.nomEntraide,
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleUpdate = () => {
        axios
            .post(`${config.API_HOST}/api/updateEntraide/${idModifier}`, JSON.stringify(formData), {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(async (response) => {
                setFormData(initialeState);
                setDataChanged(!dataChanged);
                await setIdModifier('');
                handleCloseModal();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleDelete = (idEntraide) => {
        axios
            .delete(`${config.API_HOST}/api/deleteEntraide/${idEntraide}`)
            .then((response) => {
                setDataChanged(!dataChanged);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const imgURLChangeHandler = (e) => {
        const file = e.target.files[0];
        setLogo(file);
    };

    return (
        <>
            <FormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onAction={() => {
                    if (idModifier === '') {
                        handleSubmit();
                    } else {
                        handleUpdate();
                    }
                }}
                actionLabel={idModifier === '' ? ("Ajouter") : ("Modifier")}
                titleMessage="Ajouter un club"
            >
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1 text-black">Chef du club</label>
                        <input
                            className="w-full px-4 py-2 bg-white bg-opacity-50 rounded-md focus:outline-none focus:bg-opacity-75"
                            name="chefEntraide"
                            id="chefEntraide"
                            onChange={handleInputChange}
                            value={formData.chefEntraide}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1 text-black">Detail du club</label>
                        <input
                            className="w-full px-4 py-2 bg-white bg-opacity-50 rounded-md focus:outline-none focus:bg-opacity-75"
                            name="detailEntraide"
                            id="detailEntraide"
                            onChange={handleInputChange}
                            value={formData.detailEntraide}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1 text-black">Lien</label>
                        <input
                            className="w-full px-4 py-2 bg-white bg-opacity-50 rounded-md focus:outline-none focus:bg-opacity-75"
                            name="lienEntraide"
                            id="lienEntraide"
                            onChange={handleInputChange}
                            value={formData.lienEntraide}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1 text-black">Nom du club</label>
                        <input
                            className="w-full px-4 py-2 bg-white bg-opacity-50 rounded-md focus:outline-none focus:bg-opacity-75"
                            name="nomEntraide"
                            id="nomEntraide"
                            onChange={handleInputChange}
                            value={formData.nomEntraide}
                        />
                    </div>
                    <label htmlFor="fileInput" className="custome-file-upload">
                        <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            onChange={imgURLChangeHandler}
                        />
                        <div className="flex items-center justify-center h-[100px] border border-dashed border-[#26393D] rounded-md">
                            {logo ? (
                                <img
                                    src={URL.createObjectURL(logo)}
                                    alt="Preview"
                                    className="max-w-full max-h-full"
                                />
                            ) : (
                                <p className="text-[#26393D]">
                                    Cliquer ici pour ajouter une photo
                                </p>
                            )}
                        </div>
                    </label>
                </form>
            </FormModal>
            <div className="flex justify-between p-4 m-2 bg-white bg-opacity-25 rounded-lg shadow-lg backdrop-blur-md">
                <div>
                    <button className="px-4 py-2 rounded bg-emerald-500 text-white" onClick={handleOpenModal}>Ajouter</button>
                </div>

                <div className="max-w-full">
                    <h2 className="text-3xl font-bold tracking-tight text-[#007a55] sm:text-4xl">
                        Clubs existants à l&#39;ENI
                    </h2>
                </div>
            </div>
            <div
                role="list"
                className="grid grid-cols-3 gap-3 p-4 m-2 bg-white bg-opacity-25 rounded-lg shadow-lg backdrop-blur-md"
            >
                {entraide.map((club) => (
                    <div key={club.idEntraide}
                        className="flex items-center p-4 m-2 bg-white bg-opacity-25 rounded-lg shadow-lg gap-x-6 backdrop-blur-md">
                        <img
                            className="w-16 h-16 rounded-full"
                            src={`${config.API_HOST}/${club.logoEntraide}`}
                            alt=""
                        />
                        <div>
                            <h3 className="text-base font-semibold leading-7 tracking-tight text-[#50C878]">
                                {club.nomEntraide}
                            </h3>
                            <p className="text-sm font-semibold leading-6 text-gray-500">
                                <u>Chef du club:</u> {club.chefEntraide}
                            </p>
                            <Link to={club.lienEntraide} target="_blank" className="text-sm font-semibold leading-6 text-gray-500">
                                <div className="flex">
                                    <p>Lien vers la page: </p>
                                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path d="M20 12.05C19.9813 10.5255 19.5273 9.03809 18.6915 7.76295C17.8557 6.48781 16.673 5.47804 15.2826 4.85257C13.8921 4.2271 12.3519 4.01198 10.8433 4.23253C9.33473 4.45309 7.92057 5.10013 6.7674 6.09748C5.61422 7.09482 4.77005 8.40092 4.3343 9.86195C3.89856 11.323 3.88938 12.8781 4.30786 14.3442C4.72634 15.8103 5.55504 17.1262 6.69637 18.1371C7.83769 19.148 9.24412 19.8117 10.75 20.05V14.38H8.75001V12.05H10.75V10.28C10.7037 9.86846 10.7483 9.45175 10.8807 9.05931C11.0131 8.66687 11.23 8.30827 11.5161 8.00882C11.8022 7.70936 12.1505 7.47635 12.5365 7.32624C12.9225 7.17612 13.3368 7.11255 13.75 7.14003C14.3498 7.14824 14.9482 7.20173 15.54 7.30003V9.30003H14.54C14.3676 9.27828 14.1924 9.29556 14.0276 9.35059C13.8627 9.40562 13.7123 9.49699 13.5875 9.61795C13.4627 9.73891 13.3667 9.88637 13.3066 10.0494C13.2464 10.2125 13.2237 10.387 13.24 10.56V12.07H15.46L15.1 14.4H13.25V20C15.1399 19.7011 16.8601 18.7347 18.0985 17.2761C19.3369 15.8175 20.0115 13.9634 20 12.05Z" fill="#3B5998"></path>
                                        </g>
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
        ;
};

export default Entraide;
