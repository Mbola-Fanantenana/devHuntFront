import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import FormModal from "../components/FormModal.jsx";
import ErrorModal from "../components/ErrorModal.jsx";

const Forum = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCom, setIsModalOpenCom] = useState(false);
  const [userConnected, setUserConnected] = useState("");
  const [error, setError] = useState(null);
  const [idModifier, setIdModifier] = useState("");
  const [com, setCom] = useState("");
  const [formCom, setFormCom] = useState("");
  const [dataChanged, setDataChanged] = useState(false);

  const [forum, setForum] = useState([]);
  const [commentForum, setCommentForum] = useState([]);
  const [forumById, setForumById] = useState([]);
  const initialFormState = {
    titre: "",
    contenuForum: "",
    heureForum: "",
    idUtilisateur: "",
  };
  const initialFormStateCom = {
    idForum : '',
    idUtilisateur : '',
    contenu : '',
    heureCom : ''

  };
  const [imagURL, setImgURL] = useState(null);
  const [test, setTest] = useState(null);

  const [formData, setFormData] = useState(initialFormState);
  const [formDataCom, setFormDataCom] = useState(initialFormStateCom);

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
  const handleCloseModalCom = () => {
    setIsModalOpenCom(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleOpenModalCom = () => {
    setIsModalOpenCom(true);
  };

  const handleModalAction = () => {
    setIsModalOpenCom(false);
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

  const handleInputChangeCom = (e) => {
    const { name, value } = e.target;

    setFormDataCom({
      ...formDataCom,
      [name]: value,
    });
  };

  function getCurrentTime() {
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    const currentTime = `${formattedHours}:${formattedMinutes}`;

    return currentTime;
  }

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
        handleCloseModal()
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

  const handleComSubmit = (idForum) => {
    const formDataComAttend = new FormData();

    formDataComAttend.append('idForum', idForum)
    formDataComAttend.append('idUtilisateur', userConnected)
    formDataComAttend.append('contenu', formDataCom.contenu)
    formDataComAttend.append('heureCom', getCurrentTime())

    axios
        .post(`${config.API_HOST}/api/createCom`, formDataComAttend)
        .then(() => {
          console.log("mety");
        })
        .catch((error) => {
          console.error("Erreur lors de la requête : ", error);
        });
  }

  const handleCom = (idForum) => {
    setCom(idForum);
  }

  const setComNull = () => {
    setCom('');
  }

  const setForumComment = (idForum) => {
    setFormCom(idForum)
    handleOpenModalCom()

    axios.get(`${config.API_HOST}/api/forum/comments/${idForum}`)
        .then((response) => {
          setCommentForum(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

    axios
        .get(`${config.API_HOST}/api/forum/${idForum}`)
        .then((response) => {
          setForumById(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }
  function formatDate(inputDate) {
    const dateObj = new Date(inputDate);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

    return formattedDate;
  }

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
      <FormModal
          isOpen={isModalOpenCom}
          onClose={handleCloseModalCom}
          // onAction={handleSubmitCom}
          actionLabel={''}
          titleMessage="Forum"
      >
        <div key={forumById.idEntraide}
             className="flex items-center p-4 m-2 bg-white bg-opacity-25 rounded-lg shadow-lg gap-x-6 backdrop-blur-md">
          <img
              className="w-16 h-16 rounded-full"
              src={"https://hotelleriejobs.s3.amazonaws.com/news/15361/image_url/Capture_d_e_cran_2016-10-31_a__13.02.54.png"}
              alt=""
          />
          <div>
            <h3 className="text-base font-semibold leading-7 tracking-tight text-[#50C878]">
              {forumById.titre}
            </h3>
            <p className="text-sm font-semibold leading-6 text-gray-500">
              {forumById.dateForum}
            </p>
            <p className="text-sm font-semibold leading-6 text-gray-500">
              {forumById.utilisateur?.nomUtilisateur}
            </p>
            <p className="text-sm font-semibold leading-6 text-gray-500">
              {forumById.heureForum}
            </p>
            <p className="text-sm font-semibold leading-6 text-gray-500">
              {forumById.contenuForum}
            </p>
          </div>
        </div>
        <div className={`py-1`}>
          {commentForum.comments ? (
              <div>
                {commentForum.comments.map((item, index) => (
                    <div className={'p-1 my-1 rounded-lg bg-red-500'}>
                      <p>{item.contenu}</p>
                      <p>{formatDate(item.dateCom)}</p>
                      <p>{item.heureCom}</p>
                    </div>
                ))}
              </div>
          ) : ('')}
        </div>
      </FormModal>
      <div>
        <div>
          {forum.map((item) => (
              <ul
                  onClick={() => setForumComment(item.idForum)}
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
              <textarea
                  name="contenu"
                  id="contenu"
                  cols="10"
                  rows="10"
                  className={`bg-red-500 ${com === item.idForum ? 'visible' : 'hidden'}`}
                  onChange={handleInputChangeCom}
                  value={formDataCom.contenu}
              >
              </textarea>
              <li className="flex items-center mt-2">
                <div className={`${com === item.idForum ? 'visible' : 'hidden'}`}>
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
                  <button
                      type="button"

                      onClick={() => handleComSubmit(item.idForum)}
                      className="px-2 bg-blue-500 rounded-lg"
                  >
                    Coms
                  </button>
                  <button
                      type="button"
                      onClick={() => setComNull()}
                      className="px-2 bg-gray-500 rounded-lg"
                  >
                    Annuler
                  </button>
                </div>
                <div className={`${com === item.idForum ? 'hidden' : 'visible'}`}>
                  <button
                      type="submit"
                      onClick={() => handleCom(item.idForum)}
                      className="px-2 bg-blue-500 rounded-lg"
                  >
                    Commenter
                  </button>
                </div>
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
