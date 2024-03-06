import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import FormModal from "../components/FormModal.jsx";
import ErrorModal from "../components/ErrorModal.jsx";

const Forum = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userConnected, setUserConnected] = useState("");
  const [error, setError] = useState(null);
  const initialFormState = ({
    titre: "",
    contenuForum: "",
    heureForum: "",
    idUtilisateur: "",
  });
  const [imagURL, setImgURL] = useState(null);

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const userLocaleStorage = localStorage.getItem("userSession");
    setUserConnected(JSON.parse(userLocaleStorage).idUtilisateur);
  }, []);

  function getCurrentTime() {
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    const currentTime = `${formattedHours}:${formattedMinutes}`;

    return currentTime;
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleModalAction = () => {
    setIsModalOpen(false);
  };

  const handleCloseErrorModal = () => {
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const imgURLChangeHandler = (e) => {
    const file = e.target.files[0];
    setImgURL(file);
  };

  const handleSubmit = async () => {
    console.log(userConnected);
    const formaData = new FormData();

    formaData.append("titre", formData.titre);
    formaData.append("contenuForum", formData.contenuForum);
    formaData.append("heureForum", getCurrentTime());
    formaData.append("idUtilisateur", userConnected);
    formaData.append("imgForum", imagURL);
  

    axios
      .post(`${config.API_HOST}/api/createForum`, formaData)
      .then(() => {
        console.log("Forum créé !!!!!");
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen p-2 bg-white ">
      <div>
        <button
          className="px-4 py-2 rounded bg-emerald-500"
          onClick={handleOpenModal}
        >
          Ajouter
        </button>
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
            <label htmlFor="titre" className="block mb-1 text-black">
              Titre
            </label>
            <input
              type="text"
              id="titre"
              name="titre"
              value={formData.titre}
              onChange={handleInputChange}
              autoComplete="off"
            />
            <label htmlFor="contenuForum" className="block mb-1 text-black">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 bg-white bg-opacity-50 rounded-md focus:outline-none focus:bg-opacity-75"
              name="contenuForum"
              id="contenue"
              value={formData.contenuForum}
              onChange={handleInputChange}
            ></textarea>
            <label htmlFor="fileInput" className="custome-file-upload">
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={imgURLChangeHandler}
              />
              <div className="flex items-center justify-center h-[200px] border border-dashed border-[#26393D] rounded-md">
                {imagURL ? (
                  <img
                    src={URL.createObjectURL(imagURL)}
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
          </div>
        </form>
      </FormModal>
      <ErrorModal
        isOpen={error !== null}
        onClose={handleCloseErrorModal}
        titleMessage="Message d'erreur"
      >
        {error}
      </ErrorModal>
      ;
    </div>
  );
};

export default Forum;
