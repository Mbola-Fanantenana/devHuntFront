import { Link } from "react-router-dom";
import FormModal from "../components/FormModal.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";

const Information = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userConnected, setUserConnected] = useState("");
  const [infos, setInfos] = useState([]);
  const [contenue, setContenue] = useState("");
  const [imgURL, setImgURL] = useState(null);
  const [idModifier, setIdModifier] = useState("");

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

  const contenueChangeHandler = (e) => {
    setContenue(e.target.value);
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

    console.log(contenue);
    console.log(getCurrentTime());
    console.log(imgURL);
    console.log(userConnected);

    console.log(formData);

    axios
      .post(`${config.API_HOST}/api/createInfo`, formData)
      .then(() => {
        console.log("mety");
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
          contenue: response.data.contenueInfo
        });
        
        setImgURL(response.data.imgInfo) 
        console.log(response.data.imgInfo)
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
          actionLabel={idModifier === "" ? ("Ajouter") : ("Modifier")}
        titleMessage="Créer info"
      >
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-black">
              Contenue de l&#39;information
            </label>
            <textarea
              className="w-full px-4 py-2 bg-white bg-opacity-50 rounded-md focus:outline-none focus:bg-opacity-75"
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
      <div className={"py-2 grid grid-cols-2 gap-2"}>
        {infos.map((item) => (
          <div
            className={
              "w-full flex px-4 py-2 rounded-md bg-gray-600 bg-opacity-50 focus:outline-none focus:bg-opacity-75"
            }
          >
            <div className={"p-2 bg-gray-500 rounded-xl"}>
                <img src={`${config.API_HOST}/uploads/${item.imgInfo}`} alt="" />
            </div>
            <div className={"p-2 bg-gray-500 rounded-xl"}>
              {item.contenueInfo}
              <span>{item.heureInfo}</span>
            </div>
            <div>
            <button
                onClick={() => handleDelete(item.idInfo)}
                className={"bg-red-500 px-2 rounded-lg"}
              >
                -
              </button>
              <button
                type="button"
                onClick={() => ouvrirModifier(item.idInfo)}
                className={"bg-green-500 px-2 rounded-lg"}
              >
                *
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Information;
