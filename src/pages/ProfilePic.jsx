import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from 'react-router-dom'
import config from '../../config.json'
import ErrorModal from "../components/ErrorModal";

const ProfilePic = () => {
    const navigate = useNavigate();
    const param = useParams();
    const [imgURL, setImgURL] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [user, setUser] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${config.API_HOST}/api/user/${param.idUtilisateur}`).then((response) => {
            setUser(response.data);
        }).catch(error => {
            console.log("Error occured getting user detail: " + error);
        });
    }, []);

    const handleCloseErrorModal = () => {
        setError(null);
    };

    const handleZoomChange = (event) => {
        const newZoom = parseFloat(event.target.value);
        setZoom(newZoom);
    };

    const imgURLChangeHandler = (e) => {
        const file = e.target.files[0];
        setImgURL(file);
    };

    const submitActionHandler = (e) => {
        e.preventDefault();

        const formDataAppend = new FormData();
        formDataAppend.append("imgUtilisateur", imgURL);

        console.log(imgURL);

        axios.patch(`${config.API_HOST}/api/updateUser/${param.idUtilisateur}`, formDataAppend)
            .then(() => {
                navigate(`/login`);
            })
            .catch((error) => {
                setError("An error occurred. Please try again later.");
            });
    };

    return (
        <div className="bg-[#ddd] w-full h-screen flex items-center justify-center">
            <form className="flex flex-col justify-center items-center p-4 m-2 bg-white bg-opacity-25 w-[60%] h-[70%] backdrop-blur-md shadow-lg rounded-lg space-y-2" onSubmit={submitActionHandler}>
                <h1 className="font-medium text-xl">Ajouter une photo de profil</h1>
                <hr className="border-t border-slate-400 w-full" />
                {user && (
                    <>
                        <p className="text-medium">{user.nomUtilisateur} {user.prenomUtilisateur}</p>
                    </>
                )}
                <div className="w-1/2 flex justify-center relative">
                    <label htmlFor="fileInput" className="custom-file-upload">
                        <input type="file" id="fileInput" className="hidden" onChange={imgURLChangeHandler} />
                        <div className="flex items-center justify-center w-[250px] h-[250px] border border-dashed border-[#26393D] rounded-full overflow-hidden relative">
                            {imgURL ? (
                                <img
                                    src={URL.createObjectURL(imgURL)}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    style={{ transform: `scale(${zoom})` }}
                                />
                            ) : (
                                <p className="text-[#26393D] text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Cliquez ici pour ajouter l&#39;image
                                    Cliquer ici pour ajouter une photo
                                </p>
                            )}
                        </div>
                    </label>
                </div>
                <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={zoom}
                    onChange={handleZoomChange}
                    className="bg-white bg-opacity-25 backdrop-blur-md w-[50%] rounded-lg overflow-hidden mx-auto"
                    style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                />
                <hr className="border-t border-slate-400 w-full" />
                <div className="w-full flex justify-end space-x-2">
                    <Link to={'/login'} className="bg-slate-400 hover:bg-slate-600 py-2 px-4 rounded text-gray-900 hover:text-white">Plus tard</Link>
                    <button type="submit" className="bg-[#007a55] hover:bg-emerald-800 py-2 px-4 rounded text-white">Importer</button>
                </div>
            </form>
            <ErrorModal
                isOpen={error !== null}
                onClose={handleCloseErrorModal}
                titleMessage="Message d'erreur"
            >
                {error}
            </ErrorModal>
        </div>
    );

};

export default ProfilePic;
