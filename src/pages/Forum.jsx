/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import FormModal from "../components/FormModal.jsx";
import ErrorModal from "../components/ErrorModal.jsx";
import CommentModal from "../components/CommentModal";

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
    idForum: '',
    idUtilisateur: '',
    contenu: '',
    heureCom: ''

  };
  const [imagURL, setImgURL] = useState(null);

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
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get(`${config.API_HOST}/api/forum/comments/${formCom}`)
      .then((response) => {
        setCommentForum(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dataChanged]);

  useEffect(() => {
    document.title = 'ENI Novice | Forum'
  })

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
        handleCloseModal()
        setDataChanged(!dataChanged);
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
      .then(async () => {
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
    axios
      .delete(`${config.API_HOST}/api/deleteForum/${idForum}`)
      .then(() => {
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
        setFormDataCom(initialFormStateCom);
        setDataChanged(!dataChanged);
        setCom('');
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
        setDataChanged(!dataChanged);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${config.API_HOST}/api/forum/${idForum}`)
      .then((response) => {
        setForumById(response.data);
        setDataChanged(!dataChanged);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleDeleteCom = (idCom) => {
    axios
      .delete(`${config.API_HOST}/api/deleteCom/${idCom}`)
      .then((response) => {
        setDataChanged(!dataChanged);
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
    <div className="flex-1 p-4 m-2 bg-white bg-opacity-25 backdrop-blur-md shadow-lg rounded-lg overflow-auto" style={{ height: '515px' }}>
      <div>
        <button
          className="px-4 py-2 rounded bg-emerald-500 text-white"
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
              className="w-full px-4 py-2 rounded bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-80"
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
      <CommentModal
        isOpen={isModalOpenCom}
        onClose={handleCloseModalCom}
        titleMessage="Commentaire"
      >
        <div key={forumById.idEntraide}
          className="flex items-center p-4 m-2 bg-white bg-opacity-25 rounded-lg shadow-lg gap-x-6 backdrop-blur-md">
          <img
            className="w-16 h-16 rounded-full"
            src={`${config.API_HOST}/uploads/${forumById.imgForum}`}
            alt=""
          />
          <div>
            <h3 className="text-base font-semibold leading-7 tracking-tight text-[#50C878]">
              {forumById.titre}
            </h3>
            <p className="text-sm font-semibold leading-6 text-gray-500">
              {forumById.utilisateur?.nomUtilisateur}
            </p>
            <p className="text-sm font-light leading-6 text-gray-500">
              {forumById.dateForum} - {forumById.heureForum}
            </p>
            <p className="text-sm font-semibold leading-6 text-gray-500">
              {forumById.contenuForum}
            </p>
          </div>
        </div>
        <div className={`py-1 h-[200px]`}>
          {commentForum.comments ? (
            <div className="h-[200px] overFlow-auto ">
              {commentForum.comments.map((item) => (
                <>
                  <div className={'p-2 my-1 rounded-lg bg-slate-300'}>
                    <div className="flex space-x-2 font-bold">
                      <p className="text-lg">{item.utilisateur.nomUtilisateur}</p>
                      <p className="text-lg">{item.utilisateur.prenomUtilisateur}</p>
                    </div>
                    <p className="text-lg">{item.contenu}</p>
                    <p className="text-[10px] text-end">{formatDate(item.dateCom)} - {item.heureCom}</p>
                    <button
                      onClick={() => handleDeleteCom(item.idCom)}
                      className="px-2 rounded-lg"
                    >
                      <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z" fill="#292D32"></path> <path d="M19.2297 8.14C18.9897 7.89 18.6597 7.75 18.3197 7.75H5.67975C5.33975 7.75 4.99975 7.89 4.76975 8.14C4.53975 8.39 4.40975 8.73 4.42975 9.08L5.04975 19.34C5.15975 20.86 5.29975 22.76 8.78975 22.76H15.2097C18.6997 22.76 18.8398 20.87 18.9497 19.34L19.5697 9.09C19.5897 8.73 19.4597 8.39 19.2297 8.14ZM13.6597 17.75H10.3297C9.91975 17.75 9.57975 17.41 9.57975 17C9.57975 16.59 9.91975 16.25 10.3297 16.25H13.6597C14.0697 16.25 14.4097 16.59 14.4097 17C14.4097 17.41 14.0697 17.75 13.6597 17.75ZM14.4997 13.75H9.49975C9.08975 13.75 8.74975 13.41 8.74975 13C8.74975 12.59 9.08975 12.25 9.49975 12.25H14.4997C14.9097 12.25 15.2497 12.59 15.2497 13C15.2497 13.41 14.9097 13.75 14.4997 13.75Z" fill="#292D32"></path> </g></svg>
                    </button>
                  </div>
                </>
              ))}
            </div>
          ) : ('')}
        </div>
      </CommentModal>
      <div>
        <div className="grid grid-cols-2 gap-2 w-full">
          {forum.map((item) => (
            <ul
              key={item.idForum}
              className="p-4 my-4 border bg-[#ddd] rounded-md shadow-md"
            >
              <div className="flex flex-row justify-between">
                <div className="flex flex-row space-x-2">
                  <li className="text-lg font-bold cursor-pointer" onClick={() => setForumComment(item.idForum)}>{item.titre}</li>
                  <li className="text-sm">{item.heureForum}</li>
                </div>
                <div className={`${com === item.idForum ? 'hidden' : 'visible'} flex justify-end`}>
                  <button
                    type="submit"
                    onClick={() => handleCom(item.idForum)}
                    className="px-2 rounded-lg"
                  >
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M17 2H7C4.24 2 2 4.23 2 6.98V12.96V13.96C2 16.71 4.24 18.94 7 18.94H8.5C8.77 18.94 9.13 19.12 9.3 19.34L10.8 21.33C11.46 22.21 12.54 22.21 13.2 21.33L14.7 19.34C14.89 19.09 15.19 18.94 15.5 18.94H17C19.76 18.94 22 16.71 22 13.96V6.98C22 4.23 19.76 2 17 2ZM8 12C7.44 12 7 11.55 7 11C7 10.45 7.45 10 8 10C8.55 10 9 10.45 9 11C9 11.55 8.56 12 8 12ZM12 12C11.44 12 11 11.55 11 11C11 10.45 11.45 10 12 10C12.55 10 13 10.45 13 11C13 11.55 12.56 12 12 12ZM16 12C15.44 12 15 11.55 15 11C15 10.45 15.45 10 16 10C16.55 10 17 10.45 17 11C17 11.55 16.56 12 16 12Z" fill="#292D32"></path>
                      </g>
                    </svg>
                    <span
                      className="rounded-full py-1 px-1 text-xs font-medium content-[''] top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4 bg-[#ea4444] text-white min-w-[30px] min-h-[30px]">
                      <span className="text-green-800 font-bold">{item.nombreComs}</span>
                    </span>
                  </button>
                </div>
              </div>
              <li className="mt-2">{item.contenuForum}</li>
              <li className="mt-2 flex justify-center">
                <img
                  src={`${config.API_HOST}/uploads/${item.imgForum}`}
                  alt=""
                  className="w-40 h-40 rounded-md"
                />
              </li>
              <textarea
                name="contenu"
                id="contenu"
                cols="10"
                rows="10"
                className={`bg-white w-full p-2 border border-gray-400 mt-2 rounded ${com === item.idForum ? 'visible' : 'hidden'}`}
                onChange={handleInputChangeCom}
                value={formDataCom.contenu}
              >
              </textarea>
              <li className="flex items-center mt-2">
                <div className={`${userConnected === item.idUtilisateur ? 'visible' : 'hidden'}`}>
                  <button
                    type="button"

                    onClick={() => handleComSubmit(item.idForum)}
                    className="px-2 rounded-lg"
                  >
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z" fill="#292D32"></path> </g></svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => ouvrirModifier(item.idForum)}
                    className="px-2 rounded-lg"
                  >
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM10.95 17.51C10.66 17.8 10.11 18.08 9.71 18.14L7.25 18.49C7.16 18.5 7.07 18.51 6.98 18.51C6.57 18.51 6.19 18.37 5.92 18.1C5.59 17.77 5.45 17.29 5.53 16.76L5.88 14.3C5.94 13.89 6.21 13.35 6.51 13.06L10.97 8.6C11.05 8.81 11.13 9.02 11.24 9.26C11.34 9.47 11.45 9.69 11.57 9.89C11.67 10.06 11.78 10.22 11.87 10.34C11.98 10.51 12.11 10.67 12.19 10.76C12.24 10.83 12.28 10.88 12.3 10.9C12.55 11.2 12.84 11.48 13.09 11.69C13.16 11.76 13.2 11.8 13.22 11.81C13.37 11.93 13.52 12.05 13.65 12.14C13.81 12.26 13.97 12.37 14.14 12.46C14.34 12.58 14.56 12.69 14.78 12.8C15.01 12.9 15.22 12.99 15.43 13.06L10.95 17.51ZM17.37 11.09L16.45 12.02C16.39 12.08 16.31 12.11 16.23 12.11C16.2 12.11 16.16 12.11 16.14 12.1C14.11 11.52 12.49 9.9 11.91 7.87C11.88 7.76 11.91 7.64 11.99 7.57L12.92 6.64C14.44 5.12 15.89 5.15 17.38 6.64C18.14 7.4 18.51 8.13 18.51 8.89C18.5 9.61 18.13 10.33 17.37 11.09Z" fill="#292D32"></path> </g></svg>
                  </button>
                  <button
                    onClick={() => handleDelete(item.idForum)}
                    className="px-2 rounded-lg"
                  >
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z" fill="#292D32"></path> <path d="M19.2297 8.14C18.9897 7.89 18.6597 7.75 18.3197 7.75H5.67975C5.33975 7.75 4.99975 7.89 4.76975 8.14C4.53975 8.39 4.40975 8.73 4.42975 9.08L5.04975 19.34C5.15975 20.86 5.29975 22.76 8.78975 22.76H15.2097C18.6997 22.76 18.8398 20.87 18.9497 19.34L19.5697 9.09C19.5897 8.73 19.4597 8.39 19.2297 8.14ZM13.6597 17.75H10.3297C9.91975 17.75 9.57975 17.41 9.57975 17C9.57975 16.59 9.91975 16.25 10.3297 16.25H13.6597C14.0697 16.25 14.4097 16.59 14.4097 17C14.4097 17.41 14.0697 17.75 13.6597 17.75ZM14.4997 13.75H9.49975C9.08975 13.75 8.74975 13.41 8.74975 13C8.74975 12.59 9.08975 12.25 9.49975 12.25H14.4997C14.9097 12.25 15.2497 12.59 15.2497 13C15.2497 13.41 14.9097 13.75 14.4997 13.75Z" fill="#292D32"></path> </g></svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setComNull()}
                    className="px-2 rounded-lg"
                  >
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.9997 3.75H10.2797C8.86969 3.75 7.52969 4.34 6.57969 5.39L3.04969 9.27C1.63969 10.82 1.63969 13.18 3.04969 14.73L6.57969 18.61C7.52969 19.65 8.86969 20.25 10.2797 20.25H16.9997C19.7597 20.25 21.9997 18.01 21.9997 15.25V8.75C21.9997 5.99 19.7597 3.75 16.9997 3.75ZM16.5297 13.94C16.8197 14.23 16.8197 14.71 16.5297 15C16.3797 15.15 16.1897 15.22 15.9997 15.22C15.8097 15.22 15.6197 15.15 15.4697 15L13.5297 13.06L11.5897 15C11.4397 15.15 11.2497 15.22 11.0597 15.22C10.8697 15.22 10.6797 15.15 10.5297 15C10.2397 14.71 10.2397 14.23 10.5297 13.94L12.4697 12L10.5297 10.06C10.2397 9.77 10.2397 9.29 10.5297 9C10.8197 8.71 11.2997 8.71 11.5897 9L13.5297 10.94L15.4697 9C15.7597 8.71 16.2397 8.71 16.5297 9C16.8197 9.29 16.8197 9.77 16.5297 10.06L14.5897 12L16.5297 13.94Z" fill="#292D32"></path> </g></svg>
                  </button>
                </div>
              </li>
            </ul>
          ))}

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
    </div>
  );
};

export default Forum;
