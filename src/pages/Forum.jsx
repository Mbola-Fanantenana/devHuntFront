import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import FormModal from "../components/FormModal.jsx";
import ErrorModal from "../components/ErrorModal.jsx";

const Forum = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userConnected, setUserConnected] = useState("");
  const [error, setError] = useState(null);
  const [idModifier, setIdModifier] = useState("");
  const [dataChanged, setDataChanged] = useState(false);

  const [forum, setForum] = useState([]);
  const initialFormState = {
    titre: "",
    contenuForum: "",
    heureForum: "",
    idUtilisateur: "",
  };
  const [imagURL, setImgURL] = useState(null);
  const [test, setTest] = useState(null);

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const userLocaleStorage = localStorage.getItem("userSession");
    setUserConnected(JSON.parse(userLocaleStorage).idUtilisateur);
  }, []);

  useEffect(() => {
    axios
      .get(`${config.API_HOST}/api/forums`)
      .then((response) => {
        setForum(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const ouvrirModifier = async (id) => {
    await handleOpenModal();
    setIdModifier(id);
    console.log(id);
    axios
      .get(`${config.API_HOST}/api/forum/${id}`)
      .then((response) => {
        setFormData({
          titre: response.data.titre,
          contenuForum: response.data.contenuForum,
        });

        setImgURL(response.data.imgForum);
        console.log(response.data.imgForum);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleUpdate = () => {
    axios
      .patch(
        `${config.API_HOST}/api/updateForum/${idModifier}`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) => {
        setFormData(initialFormState);
        setDataChanged(!dataChanged);
        await setIdModifier("");
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (idForum) => {
    console.log(userConnected);
    axios
      .delete(`${config.API_HOST}/api/deleteForum/${idForum}`)
      .then((response) => {
        setDataChanged(!dataChanged);
      })
      .catch((error) => {
        console.log(error);
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
        onAction={() => {
          if (idModifier === "") {
            handleSubmit();
          } else {
            handleUpdate();
          }
        }}
        actionLabel={idModifier === "" ? "Ajouter" : "Modifier"}
        titleMessage="Créer un forum"
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
                    src={
                      !idModifier
                        ? URL.createObjectURL(test)
                        : `${config.API_HOST}/uploads/${imagURL}`
                    }
                    // src={`${config.API_HOST}/uploads/${imagURL}`}
                    alt="Preview"
                    className="max-w-full max-h-full"
                  />
                ) : (
                  <p className="text-[#26393D]">
                    {/* Cliquer ici pour ajouter une photo */}
                    {imagURL}
                  </p>
                )}
              </div>
            </label>
          </div>
        </form>
      </FormModal>
      <div>
        <div>
          {forum.map((item) => (
            <ul
              key={item.idForum}
              className="p-4 my-4 border rounded-md shadow-md"
            >
              <li className="text-lg font-bold">{item.titre}</li>
              <li className="mt-2">{item.contenuForum}</li>
              <li className="mt-2">
                <img
                  src={`${config.API_HOST}/uploads/${item.imgForum}`}
                  alt=""
                  className="w-40 h-40 rounded-md"
                />
              </li>
              <li className="mt-2">{item.heureForum}</li>
              <li className="flex items-center mt-2">
                <button
                  onClick={() => handleDelete(item.idForum)}
                  className="px-2 mr-2 bg-red-500 rounded-lg"
                >
                  Supprimer
                </button>
                <button
                  type="button"
                  onClick={() => ouvrirModifier(item.idForum)}
                  className="px-2 bg-green-500 rounded-lg"
                >
                  Modifier
                </button>
              </li>
            </ul>
          ))}

          {/* Affichage du modal d'erreur */}
          <ErrorModal
            isOpen={error !== null}
            onClose={handleCloseErrorModal}
            titleMessage="Message d'erreur"
          >
            {error}
          </ErrorModal>
        </div>
      </div>
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
