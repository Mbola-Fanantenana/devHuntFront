import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import FormModal from "../components/FormModal.jsx";

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
            <div className="flex-1 p-4 m-2 bg-white bg-opacity-25 rounded-lg shadow-lg backdrop-blur-md">
                <div>
                    <button className="px-4 py-2 rounded bg-emerald-500" onClick={handleOpenModal}>Ajouter</button>
                </div>

                <div className="max-w-full">
                    <h2 className="text-3xl font-bold tracking-tight text-[#007a55] sm:text-4xl">
                        Clubs existants à l'ENI
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                    </p>
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
                                {club.chefEntraide}
                            </p>
                            <p className="text-sm font-semibold leading-6 text-gray-500">
                                {club.lienEntraide}
                            </p>
                            {/*<p className="text-sm font-semibold leading-6 text-gray-500">*/}
                            {/*    {club.detailEntraide}*/}
                            {/*</p>*/}
                            {/* <button onClick={() => handleDelete(club.idEntraide)}
                                    className={'bg-red-500 px-2 rounded-lg'}>
                                -
                            </button>
                            <button type='button' onClick={() => ouvrirModifier(club.idEntraide)}
                                    className={'bg-green-500 px-2 rounded-lg'}>
                                *
                            </button> */}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
        ;
};

export default Entraide;
