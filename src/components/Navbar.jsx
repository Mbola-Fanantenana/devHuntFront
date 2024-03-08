/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Link } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config.json";
import botAvatar from "../assets/Image/Bot avatar.jpg";
import avatar from "../assets/Image/avatar.jpg";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userConnected, setUserConnected] = useState("");
  const [pseudoUtilisateur, setPseudoUtilisateur] = useState("")

  useEffect(() => {
    const userLocaleStorage = localStorage.getItem("userSession");
    const parsedUser = JSON.parse(userLocaleStorage)
    setUserConnected(parsedUser.idUtilisateur)
    setPseudoUtilisateur(parsedUser.pseudoUtilisateur)
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userSession");
      window.location.href = "/login";
    } catch (erreur) {
      console.error("Erreur lors de la déconnexion :", erreur);
    }
  };

  const handleConfirmAction = () => {
    console.log("Action confirmée !");
    handleLogout();
    setIsModalOpen(false);
  };

  const [showChat, setShowChat] = useState(false);

  const openChat = () => {
    setShowChat(true);
  };

  const closeChat = () => {
    setShowChat(false);
  };

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState([]);
  const [history, setHistory] = useState([]);
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.API_HOST}/api/history`)
      .then((response) => {
        setHistory(response.data.history);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleGenerateResponse = async () => {
    try {
      setPrompt("");
      setQuestion((prevQuestion) => [...prevQuestion, prompt]);

      const result = await axios.post(`${config.API_HOST}/api/generate`, {
        prompt,
      });

      setResponse(result.data);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="p-4 m-2 flex justify-between items-center bg-[#119877] bg-opacity-60 backdrop-blur-md shadow-lg rounded">
        <Link
          to={"/profil"}
          className="text-white flex items-center bg-[#119877] bg-opacity-50 hover:bg-opacity-70 py-1 px-2 rounded-3xl"
        >
          <img src={avatar} alt="" className="w-8 h-8 mr-2 rounded-full border-2" />
          <h1 className="text-[#323232]">Bienvenue, <span className="font-medium">{pseudoUtilisateur}</span></h1>
        </Link>
        <div className="flex">
          <button className="mx-4 text-white" onClick={openChat} title="ChatBot">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM8.5 6.38C9.53 6.38 10.38 7.22 10.38 8.26C10.38 9.3 9.54 10.14 8.5 10.14C7.46 10.14 6.62 9.28 6.62 8.25C6.62 7.22 7.47 6.38 8.5 6.38ZM12 19.08C9.31 19.08 7.12 16.89 7.12 14.2C7.12 13.5 7.69 12.92 8.39 12.92H15.59C16.29 12.92 16.86 13.49 16.86 14.2C16.88 16.89 14.69 19.08 12 19.08ZM15.5 10.12C14.47 10.12 13.62 9.28 13.62 8.24C13.62 7.2 14.46 6.36 15.5 6.36C16.54 6.36 17.38 7.2 17.38 8.24C17.38 9.28 16.53 10.12 15.5 10.12Z"
                  fill="#ddd"
                ></path>
              </g>
            </svg>
          </button>
          <Link to={"/message"} className="mx-4 text-white" title="Messages">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M18.4704 16.83L18.8604 19.99C18.9604 20.82 18.0704 21.4 17.3604 20.97L13.9004 18.91C13.6604 18.77 13.6004 18.47 13.7304 18.23C14.2304 17.31 14.5004 16.27 14.5004 15.23C14.5004 11.57 11.3604 8.59 7.50038 8.59C6.71038 8.59 5.94038 8.71 5.22038 8.95C4.85038 9.07 4.49038 8.73 4.58038 8.35C5.49038 4.71 8.99038 2 13.1704 2C18.0504 2 22.0004 5.69 22.0004 10.24C22.0004 12.94 20.6104 15.33 18.4704 16.83Z"
                  fill="#ddd"
                ></path>
                <path
                  d="M13 15.2298C13 16.4198 12.56 17.5198 11.82 18.3898C10.83 19.5898 9.26 20.3598 7.5 20.3598L4.89 21.9098C4.45 22.1798 3.89 21.8098 3.95 21.2998L4.2 19.3298C2.86 18.3998 2 16.9098 2 15.2298C2 13.4698 2.94 11.9198 4.38 10.9998C5.27 10.4198 6.34 10.0898 7.5 10.0898C10.54 10.0898 13 12.3898 13 15.2298Z"
                  fill="#ddd"
                ></path>
              </g>
            </svg>
          </Link>
          <Link to={"/map"} className="mx-4 text-white" title="Localisation">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M20.6211 8.45C19.5711 3.83 15.5411 1.75 12.0011 1.75C12.0011 1.75 12.0011 1.75 11.9911 1.75C8.46107 1.75 4.42107 3.82 3.37107 8.44C2.20107 13.6 5.36107 17.97 8.22107 20.72C9.28107 21.74 10.6411 22.25 12.0011 22.25C13.3611 22.25 14.7211 21.74 15.7711 20.72C18.6311 17.97 21.7911 13.61 20.6211 8.45ZM12.0011 13.46C10.2611 13.46 8.85107 12.05 8.85107 10.31C8.85107 8.57 10.2611 7.16 12.0011 7.16C13.7411 7.16 15.1511 8.57 15.1511 10.31C15.1511 12.05 13.7411 13.46 12.0011 13.46Z"
                  fill="#ddd"
                ></path>
              </g>
            </svg>
          </Link>
          <button className="mx-4 text-white" onClick={handleOpenModal} title="Déconnexion">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M17.2929 14.2929C16.9024 14.6834 16.9024 15.3166 17.2929 15.7071C17.6834 16.0976 18.3166 16.0976 18.7071 15.7071L21.6201 12.7941C21.6351 12.7791 21.6497 12.7637 21.6637 12.748C21.87 12.5648 22 12.2976 22 12C22 11.7024 21.87 11.4352 21.6637 11.252C21.6497 11.2363 21.6351 11.2209 21.6201 11.2059L18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289C16.9024 8.68342 16.9024 9.31658 17.2929 9.70711L18.5858 11H13C12.4477 11 12 11.4477 12 12C12 12.5523 12.4477 13 13 13H18.5858L17.2929 14.2929Z"
                  fill="#ddd"
                ></path>{" "}
                <path
                  d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H14.5C15.8807 22 17 20.8807 17 19.5V16.7326C16.8519 16.647 16.7125 16.5409 16.5858 16.4142C15.9314 15.7598 15.8253 14.7649 16.2674 14H13C11.8954 14 11 13.1046 11 12C11 10.8954 11.8954 10 13 10H16.2674C15.8253 9.23514 15.9314 8.24015 16.5858 7.58579C16.7125 7.4591 16.8519 7.35296 17 7.26738V4.5C17 3.11929 15.8807 2 14.5 2H5Z"
                  fill="#ddd"
                ></path>{" "}
              </g>
            </svg>
          </button>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
        titleMessage="Déconnexion"
      >
        Êtes-vous sûr de vouloir effectuer cette action ?
      </ConfirmModal>
      {showChat && (
        <>
          <div className="relative flex justify-end mr-10">
            <div className="fixed inset-0 backdrop-filter backdrop-blur-lg"></div>
            <div
              className="absolute z-50 flex flex-col rounded"
              style={{ width: "30%", height: "500px" }}
            >
              <div className="bg-[#ddd] py-2 border-b-2 flex items-center justify-between pl-8 pr-4">
                <div className="flex items-center">
                  <img
                    src={botAvatar}
                    alt=""
                    className="w-8 h-8 mr-2 rounded-full"
                  />
                  <h1>Akama Bot</h1>
                </div>
                <button
                  className="flex text-gray-500 hover:text-gray-700 place-content-end"
                  onClick={closeChat}
                >
                  <svg
                    width="35px"
                    height="35px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                        fill="#0F0F0F"
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>
              <div
                className={"p-2 bg-[#ddd]"}
                style={{ maxHeight: "100%", overflowY: "auto" }}
              >
                <div className={"my-5"}>
                  <div className={"flex flex-col p-2 space-y-2"}>
                    {question.map((item, index) => (
                      <div key={index} className="space-y-2 message-wrapper">
                        <div
                          className={
                            "w-[80%] px-4 py-2 rounded-xl flex place-content-end bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75 ml-auto"
                          }
                        >
                          {item}
                        </div>
                        <div className="flex">
                          <img
                            src={botAvatar}
                            alt=""
                            className="w-8 h-8 mr-2 rounded-full"
                          />
                          {!response[index] ? (
                            <div className="w-[80%] px-4 py-2 rounded-xl bg-slate-700 bg-opacity-70 focus:outline-none focus:bg-opacity-75">
                              ....
                            </div>
                          ) : (
                            <div className="w-[80%] px-4 py-2 rounded-xl bg-slate-700 bg-opacity-70 focus:outline-none focus:bg-opacity-75">
                              {response[index]}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={"p-2 bg-[#ddd] sticky bottom-0 flex space-x-2"}>
                <input
                  type="text"
                  value={prompt}
                  className="w-full px-4 py-2 bg-white bg-opacity-50 rounded-md focus:outline-none focus:bg-opacity-75"
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Envoyer un message ..."
                />
                <button
                  className="bg-[#007a55] w-[30%] bg-opacity-60 hover:bg-opacity-80 text-white py-2 px-2 flex justify-center rounded-md focus:outline-none text-lg font-medium"
                  onClick={handleGenerateResponse}
                >
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.0693 8.50867L9.50929 4.22867C3.75929 1.34867 1.39929 3.70867 4.27929 9.45867L5.14929 11.1987C5.39929 11.7087 5.39929 12.2987 5.14929 12.8087L4.27929 14.5387C1.39929 20.2887 3.74929 22.6487 9.50929 19.7687L18.0693 15.4887C21.9093 13.5687 21.9093 10.4287 18.0693 8.50867ZM14.8393 12.7487H9.43929C9.02929 12.7487 8.68929 12.4087 8.68929 11.9987C8.68929 11.5887 9.02929 11.2487 9.43929 11.2487H14.8393C15.2493 11.2487 15.5893 11.5887 15.5893 11.9987C15.5893 12.4087 15.2493 12.7487 14.8393 12.7487Z"
                      fill="#ddd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
