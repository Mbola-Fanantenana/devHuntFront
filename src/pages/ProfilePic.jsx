import { useState } from "react";
import { Link } from 'react-router-dom'

const ProfilePic = () => {
    const [imgURL, setImgURL] = useState(null);
    const [zoom, setZoom] = useState(1);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImgURL(URL.createObjectURL(file));
        }
    };

    const handleZoomChange = (event) => {
        const newZoom = parseFloat(event.target.value);
        setZoom(newZoom);
    };

    return (
        <div className="bg-[#ddd] w-full h-screen flex items-center justify-center">
            <div className="flex flex-col justify-center items-center p-4 m-2 bg-white bg-opacity-25 w-[60%] h-[65%] backdrop-blur-md shadow-lg rounded-lg space-y-2">
                <h1 className="font-medium text-xl">Ajouter une photo de profil</h1>
                <hr className="border-t border-slate-400 w-full" />
                <div className="w-1/2 flex justify-center relative">
                    <label htmlFor="fileInput" className="custom-file-upload">
                        <input type="file" id="fileInput" className="hidden" onChange={handleFileInputChange} />
                        <div className="flex items-center justify-center w-[250px] h-[250px] border border-dashed border-[#26393D] rounded-full overflow-hidden relative">
                            {imgURL && (
                                <img src={imgURL} alt="Preview" className="w-full h-full object-cover" style={{ transform: `scale(${zoom})` }} />
                            )}
                            {!imgURL && (
                                <p className="text-[#26393D] text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Cliquez ici pour ajouter l&#39;image.</p>
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
                    <button className="bg-[#007a55] hover:bg-emerald-800 py-2 px-4 rounded text-white">Importer</button>
                </div>
            </div>
        </div>
    );

};

export default ProfilePic;
