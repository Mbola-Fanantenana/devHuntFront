import { useState } from "react";

const ProfilePic = () => {
    const [imgURL, setImgURL] = useState(null);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImgURL(URL.createObjectURL(file));
        }
    };

    return (
        <div className="bg-[#ddd] w-full h-screen flex items-center justify-center">
            <div className="flex p-4 m-2 bg-white bg-opacity-25 w-[60%] backdrop-blur-md shadow-lg rounded-lg">
                <h1 className="font-medium text-lg">Ajouter une photo de profil</h1>
                <hr />
                <div className="w-1/2">
                    <label htmlFor="fileInput" className="custom-file-upload">
                        <input type="file" id="fileInput" className="hidden" onChange={handleFileInputChange} />
                        <div className="flex items-center justify-center w-[250px] h-[250px] border border-dashed border-[#26393D] rounded-full">
                            {imgURL ? (
                                <img src={imgURL} alt="Preview" className="max-w-full max-h-full" />
                            ) : (
                                <p className="text-[#26393D] text-center">Cliquez ici pour ajouter l&#39;image.</p>
                            )}
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ProfilePic;
