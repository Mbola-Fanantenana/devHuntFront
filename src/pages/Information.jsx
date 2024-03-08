import { Link } from "react-router-dom";
import FormModal from "../components/FormModal.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import Toast from "../components/Toast.jsx";

const Information = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userConnected, setUserConnected] = useState("");
  const [infos, setInfos] = useState([]);
  const [contenue, setContenue] = useState("");
  const [imgURL, setImgURL] = useState(null);
  const [idModifier, setIdModifier] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [dataChanged, setDataChanged] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    const userLocaleStorage = localStorage.getItem("userSession");
    setUserConnected(JSON.parse(userLocaleStorage).idUtilisateur);
  }, []);

  useEffect(() => {
    axios
      .get(`${config.API_HOST}/api/infos`)
      .then((response) => {
        setInfos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dataChanged]);

  useEffect(() => {
    document.title = "ENI Novice | Informations";
  }, [])

  function getCurrentTime() {
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    const currentTime = `${formattedHours}:${formattedMinutes}`;

    return currentTime;
  }

  function formatDate(inputDate) {
    const dateObj = new Date(inputDate);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

    return formattedDate;
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

  const contenueChangeHandler = (e) => {
    setContenue(e.target.value);
  };

  const handleShowToast = () => {
    setShowToast(true);
  };

  const imgURLChangeHandler = (e) => {
    const file = e.target.files[0];
    setImgURL(file);
  };

  const handleSubmit = async () => {
    console.log(userConnected);
    //e.preventDefault();

    const formData = new FormData();
    formData.append("contenueInfo", contenue);
    formData.append("heureInfo", getCurrentTime());
    formData.append("imgInfo", imgURL);
    formData.append("idUtilisateur", userConnected);

    axios
      .post(`${config.API_HOST}/api/createInfo`, formData)
      .then(() => {
        handleShowToast();
        setDataChanged(!dataChanged);
        handleCloseModal();
        setContenue("");
        imgURL(null)
      })
      .catch((error) => {
        console.error("Erreur lors de la requête : ", error);
      });
  };

  const ouvrirModifier = async (id) => {
    await handleOpenModal();
    setIdModifier(id);
    console.log(id);
    axios
      .get(`${config.API_HOST}/api/info/${id}`)
      .then((response) => {
        setFormData({
          contenue: response.data.contenueInfo,
        });

        setImgURL(response.data.imgInfo);
        console.log(response.data.imgInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = () => {
    axios
      .patch(
        `${config.API_HOST}/api/updateInfo/${idModifier}`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) => {
        setFormData(infos);
        setDataChanged(!dataChanged);
        await setIdModifier("");
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (idInfo) => {
    console.log(userConnected);
    axios
      .delete(`${config.API_HOST}/api/deleteInfo/${idInfo}`)
      .then((response) => {
        setDataChanged(!dataChanged);
        handleShowToast();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex-1 p-4 m-2 bg-white bg-opacity-25 rounded-lg shadow-lg backdrop-blur-md h-[520px] overflow-auto no-scrollbar">
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
        titleMessage="Créer info"
      >
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-black">
              Contenue de l&#39;information
            </label>
            <textarea
              className="w-full px-4 py-2 bg-white rounded-md bg-opacity-35 focus:outline-none focus:bg-opacity-75"
              name="contenueInfo"
              id="contenueInfo"
              onChange={contenueChangeHandler}
              value={contenue}
            ></textarea>
          </div>
          <div className="w-1/2">
            <label htmlFor="fileInput" className="custom-file-upload">
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={imgURLChangeHandler}
              />
              <div className="flex items-center justify-center h-[200px] border border-dashed border-[#26393D] rounded-md">
                {imgURL ? (
                  <img
                    src={URL.createObjectURL(imgURL)}
                    alt="Preview"
                    className="max-w-full max-h-full"
                  />
                ) : (
                  <p className="text-[#26393D]">
                    Cliquez ici pour ajouter l&#39;image.
                  </p>
                )}
              </div>
            </label>
          </div>
        </form>
      </FormModal>
      <div>
        <div className="grid grid-cols-2 gap-3">
          {infos.map((item) => (
            <div
              onClick={() => setForumComment(item.idForum)}
              key={item.idInfo}
              className="flex-grow p-4 my-4 bg-white border rounded-md shadow-lg"
            >
              <div className="flex flex-row items-center">
                <div className="flex-grow w-1/2 space-y-32">
                  <div>
                  {showMore ? (
                    <p className="mt-2 text-justify">{item.contenueInfo}</p>
                  ) : (
                    <p className="mt-2 text-justify" style={{ maxHeight: "100px", overflow: "hidden" }}>
                      {item.contenueInfo}
                    </p>
                  )}
                  {item.contenueInfo.length > 50 && (
                    <button onClick={toggleShowMore} className="text-green-500 hover:underline">
                      {showMore ? "Voir moins" : "Voir plus"}
                    </button>
                  )}
                </div>
                  <div className="mt-2 text-[10px] font-semibold">{formatDate(item.dateInfo)} - {item.heureInfo}</div>
                </div>
                <div className="w-1/2 ml-4">
                  <img
                    src={`${config.API_HOST}/uploads/${item.imgInfo}`}
                    alt=""
                    className="w-56 h-56 rounded-md shadow-md"
                  />
                </div>
              </div>
              <li className="flex items-center mt-2">
                <div className={`${userConnected === item.idUtilisateur ? 'visible' : 'hidden'}`}>
                  <button
                    type="button"
                    onClick={() => ouvrirModifier(item.idInfo)}
                    className="px-2 rounded-lg"
                  >
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM10.95 17.51C10.66 17.8 10.11 18.08 9.71 18.14L7.25 18.49C7.16 18.5 7.07 18.51 6.98 18.51C6.57 18.51 6.19 18.37 5.92 18.1C5.59 17.77 5.45 17.29 5.53 16.76L5.88 14.3C5.94 13.89 6.21 13.35 6.51 13.06L10.97 8.6C11.05 8.81 11.13 9.02 11.24 9.26C11.34 9.47 11.45 9.69 11.57 9.89C11.67 10.06 11.78 10.22 11.87 10.34C11.98 10.51 12.11 10.67 12.19 10.76C12.24 10.83 12.28 10.88 12.3 10.9C12.55 11.2 12.84 11.48 13.09 11.69C13.16 11.76 13.2 11.8 13.22 11.81C13.37 11.93 13.52 12.05 13.65 12.14C13.81 12.26 13.97 12.37 14.14 12.46C14.34 12.58 14.56 12.69 14.78 12.8C15.01 12.9 15.22 12.99 15.43 13.06L10.95 17.51ZM17.37 11.09L16.45 12.02C16.39 12.08 16.31 12.11 16.23 12.11C16.2 12.11 16.16 12.11 16.14 12.1C14.11 11.52 12.49 9.9 11.91 7.87C11.88 7.76 11.91 7.64 11.99 7.57L12.92 6.64C14.44 5.12 15.89 5.15 17.38 6.64C18.14 7.4 18.51 8.13 18.51 8.89C18.5 9.61 18.13 10.33 17.37 11.09Z" fill="#292D32"></path> </g></svg>
                  </button>
                  <button
                    onClick={() => handleDelete(item.idInfo)}
                    className="px-2 rounded-lg"
                  >
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z" fill="#292D32"></path> <path d="M19.2297 8.14C18.9897 7.89 18.6597 7.75 18.3197 7.75H5.67975C5.33975 7.75 4.99975 7.89 4.76975 8.14C4.53975 8.39 4.40975 8.73 4.42975 9.08L5.04975 19.34C5.15975 20.86 5.29975 22.76 8.78975 22.76H15.2097C18.6997 22.76 18.8398 20.87 18.9497 19.34L19.5697 9.09C19.5897 8.73 19.4597 8.39 19.2297 8.14ZM13.6597 17.75H10.3297C9.91975 17.75 9.57975 17.41 9.57975 17C9.57975 16.59 9.91975 16.25 10.3297 16.25H13.6597C14.0697 16.25 14.4097 16.59 14.4097 17C14.4097 17.41 14.0697 17.75 13.6597 17.75ZM14.4997 13.75H9.49975C9.08975 13.75 8.74975 13.41 8.74975 13C8.74975 12.59 9.08975 12.25 9.49975 12.25H14.4997C14.9097 12.25 15.2497 12.59 15.2497 13C15.2497 13.41 14.9097 13.75 14.4997 13.75Z" fill="#292D32"></path> </g></svg>
                  </button>
                </div>
              </li>
            </div>
          ))}
        </div>
      </div>
      {showToast && <Toast message="Opération réussie !!" />}
    </div>
  );
};

export default Information;
