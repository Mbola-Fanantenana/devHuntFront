import {Link} from "react-router-dom";
import FormModal from "../components/FormModal.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import config from '../../config.json';

const Information = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userConnected, setUserConnected] = useState("");
    const [contenue, setContenue] = useState('');
    const [imgURL, setImgURL] = useState(null);

    useEffect(() => {
        const userLocaleStorage = localStorage.getItem('userSession');
        setUserConnected(JSON.parse(userLocaleStorage).idUtilisateur);
    }, []);
    function getCurrentTime() {
        const now = new Date();

        const hours = now.getHours();
        const minutes = now.getMinutes();

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');

        const currentTime = `${formattedHours}:${formattedMinutes}`;

        return currentTime;
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleModalAction = () => {
        setIsModalOpen(false);
    }

    const contenueChangeHandler = (e) => {
        setContenue(e.target.value);
    };

    const imgURLChangeHandler = (e) => {
        const file = e.target.files[0];
        setImgURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('contenueInfo', contenue);
        formData.append('heureInfo', getCurrentTime());
        formData.append('imgInfo', imgURL);
        formData.append('idUtilisateur', userConnected);

        console.log(contenue);
        console.log(getCurrentTime());
        console.log(imgURL);
        console.log(userConnected);
    
        console.log(formData);
    
        axios.post(`${config.API_HOST}/api/createInfo`, formData)
            .then(() => {
                console.log("mety");
            })
            .catch((error) => {
                console.error('Erreur lors de la requête : ', error);
            });
    }
    

    return (
        <div className=" p-2 bg-white min-h-screen flex flex-col">
            <div>
                <button className="bg-emerald-500 py-2 px-4 rounded" onClick={handleOpenModal}>Ajouter</button>
            </div>

            <FormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onAction={handleSubmit}
                actionLabel="Confirmer"
                titleMessage="Titre du modal"
            >
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-black block mb-1">Contenue de l'information</label>
                        <textarea
                            className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75"
                            name="contenueInfo"
                            id="contenueInfo"
                            onChange={contenueChangeHandler}
                            value={contenue}
                        ></textarea>
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="fileInput" className="custom-file-upload">
                            <input type="file" id="fileInput" className="hidden" onChange={imgURLChangeHandler}/>
                            <div
                                className="flex items-center justify-center h-[200px] border border-dashed border-[#26393D] rounded-md">
                                {imgURL ? (
                                    <img src={URL.createObjectURL(imgURL)} alt="Preview"
                                         className="max-w-full max-h-full"/>
                                ) : (
                                    <p className="text-[#26393D]">Cliquez ici pour ajouter l&#39;image.</p>
                                )}
                            </div>
                        </label>
                    </div>
                </form>
            </FormModal>
            <div className={'py-2 grid grid-cols-2 gap-2'}>
                <div
                    className={'w-full flex px-4 py-2 rounded-md bg-gray-600 bg-opacity-50 focus:outline-none focus:bg-opacity-75'}>
                    <div className={'p-2 bg-red-500 rounded-xl'}>
                        Photo de profile
                    </div>
                    <div className={'p-2 bg-red-500 rounded-xl'}>
                        Nom de propriétaire de l'information
                        <span> Date et heure</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Information