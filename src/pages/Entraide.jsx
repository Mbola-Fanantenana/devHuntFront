import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../config.json";
import FormModal from "../components/FormModal.jsx";

const Entraide = () => {
    const [entraide, setEntraide] = useState([]);
    const [dataChanged, setDataChanged] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idModifier, setIdModifier] = useState('');

    const initialeState = {
        logoEntraide: "",
        chefEntraide: "",
        detailEntraide: "",
        lienEntraide: "",
        nomEntraide: ""
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
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        axios
            .post(`${config.API_HOST}/api/createEntraide`, JSON.stringify(formData), {
                headers: {
                    "Content-Type": "application/json",
                },
            })
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
                        <label htmlFor="email" className="text-black block mb-1">Chef du club</label>
                        <input
                            className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75"
                            name="chefEntraide"
                            id="chefEntraide"
                            onChange={handleInputChange}
                            value={formData.chefEntraide}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-black block mb-1">Detail du club</label>
                        <input
                            className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75"
                            name="detailEntraide"
                            id="detailEntraide"
                            onChange={handleInputChange}
                            value={formData.detailEntraide}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-black block mb-1">Lien</label>
                        <input
                            className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75"
                            name="lienEntraide"
                            id="lienEntraide"
                            onChange={handleInputChange}
                            value={formData.lienEntraide}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-black block mb-1">Nom du club</label>
                        <input
                            className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75"
                            name="nomEntraide"
                            id="nomEntraide"
                            onChange={handleInputChange}
                            value={formData.nomEntraide}
                        />
                    </div>
                </form>
            </FormModal>
            <div className="flex-1 p-4 m-2 bg-white bg-opacity-25 backdrop-blur-md shadow-lg rounded-lg">
                <div>
                    <button className="bg-emerald-500 py-2 px-4 rounded" onClick={handleOpenModal}>Ajouter</button>
                </div>

                <div className="max-w-full">
                    <h2 className="text-3xl font-bold tracking-tight text-[#007a55] sm:text-4xl">
                        Meet our leadership
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae
                        ullamcorper
                        suspendisse.
                    </p>
                </div>
            </div>
            <div
                role="list"
                className="grid grid-cols-3 gap-3 bg-white bg-opacity-25 backdrop-blur-md shadow-lg rounded-lg p-4 m-2"
            >
                {entraide.map((club) => (
                    <div key={club.idEntraide}
                         className="flex items-center gap-x-6 bg-white bg-opacity-25 backdrop-blur-md shadow-lg rounded-lg p-4 m-2">
                        <img
                            className="w-16 h-16 rounded-full"
                            src={"https://hotelleriejobs.s3.amazonaws.com/news/15361/image_url/Capture_d_e_cran_2016-10-31_a__13.02.54.png"}
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
                            <button onClick={() => handleDelete(club.idEntraide)}
                                    className={'bg-red-500 px-2 rounded-lg'}>
                                -
                            </button>
                            <button type='button' onClick={() => ouvrirModifier(club.idEntraide)}
                                    className={'bg-green-500 px-2 rounded-lg'}>
                                *
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
        ;
};

export default Entraide;
