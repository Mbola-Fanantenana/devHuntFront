import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Image/logo.png";
import SpeechRecognitionComponent from "./SpeechRecognition";

const Sidebar = () => {
  const location = useLocation();

  const handleSpeechResult = (text) => {
    console.log("message: ", text);

    switch (true) {
      case text.includes("responsable"):
        window.location.href = '/responsable'
        break;
      case text.includes("information"):
        window.location.href = '/information'
        break;
      case text.includes("entraide"):
        window.location.href = '/entraide'
        break;
      case text.includes("forum"):
        window.location.href = '/forum'
        break;
      case text.includes("message"):
        window.location.href = '/message'
        break;
      default:
        // Ajoutez un comportement par défaut si aucun cas ne correspond
        break;
    }
  };

  return (
    <div className="bg-[#119877] bg-opacity-60 backdrop-blur-md rounded p-2 m-2 shadow-lg px-12 max-h-screen w-[15%] flex flex-col justify-center items-center">
      <Link
        className="flex flex-col items-center justify-center"
        to={"/accueil"}
      >
        <img className="w-32 h-auto" src={logo} alt="Logo ENI" />
      </Link>
      <hr className="border border-slate-200 w-[150px] mt-4" />
      <div className="flex flex-col mt-4 space-y-2 h-2/3">
        <Link
          to={"/responsable"}
          className={`text-[#323232] px-4 py-2 rounded w-full text-center flex justify-between items-center ${location.pathname === "/responsable"
            ? "bg-[#279E81] text-white"
            : "bg-white"
            }`}
        >
          <div className="1/5">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier"> <g clipPath="url(#clip0_429_11217)">
                {
                  location.pathname === '/responsable' ? (
                    <>
                      <path d="M4 18C4 15.7908 5.79086 14 8 14H16C18.2091 14 20 15.7908 20 18V18C20 19.1045 19.1046 20 18 20H6C4.89543 20 4 19.1045 4 18V18Z" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round"></path>
                      <circle cx="12" cy="6.99997" r="3" stroke="#fff" strokeWidth="2.5"></circle>
                    </>
                  ) : (
                    <>
                      <path d="M4 18C4 15.7908 5.79086 14 8 14H16C18.2091 14 20 15.7908 20 18V18C20 19.1045 19.1046 20 18 20H6C4.89543 20 4 19.1045 4 18V18Z" stroke="#292929" strokeWidth="2.5" strokeLinejoin="round"></path>
                      <circle cx="12" cy="6.99997" r="3" stroke="#292929" strokeWidth="2.5"></circle>
                    </>
                  )
                }
              </g>
                <defs>
                  <clipPath id="clip0_429_11217">
                    <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
                </defs>
              </g>
            </svg>
          </div>
          <div className="4/5">
            Responsable
          </div>
        </Link>
        <Link
          to={"/information"}
          className={`text-[#323232] px-4 py-2 rounded w-full text-center flex justify-between items-center ${location.pathname === "/information"
            ? "bg-[#279E81] text-white"
            : "bg-white"
            }`}
        >
          <div className="w-1/5 flex justify-start">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g clipPath="url(#clip0_429_11160)">
                  {
                    location.pathname === '/information' ? (
                      <>
                        <circle cx="12" cy="11.9999" r="9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></circle>
                        <rect x="12" y="8" width="0.01" height="0.01" stroke="#279E81" strokeWidth="3.75" strokeLinejoin="round"></rect>
                        <path d="M12 12V16" stroke="#279E81" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </>
                    ) : (
                      <>
                        <circle cx="12" cy="11.9999" r="9" stroke="#292929" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></circle>
                        <rect x="12" y="8" width="0.01" height="0.01" stroke="#292929" strokeWidth="3.75" strokeLinejoin="round"></rect>
                        <path d="M12 12V16" stroke="#292929" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </>
                    )
                  }
                </g>
                <defs>
                  <clipPath id="clip0_429_11160">
                    <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
                </defs>
              </g>
            </svg>
          </div>
          <div className="w-4/5">
            Information
          </div>
        </Link>
        <Link
          to={"/entraide"}
          className={`text-[#323232] px-4 py-2 rounded w-full text-center flex justify-between items-center ${location.pathname === "/entraide"
            ? "bg-[#279E81] text-white"
            : "bg-white"
            }`}
        >
          <div className="w-1/5">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g clipPath="url(#clip0_429_11110)">
                  {
                    location.pathname === '/entraide' ? (
                      <>
                        <path d="M11 8L7 4M7 4L3 8M7 4L7 20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M13 16L17 20M17 20L21 16M17 20L17 4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </>
                    ) : (
                      <>
                        <path d="M11 8L7 4M7 4L3 8M7 4L7 20" stroke="#292929" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M13 16L17 20M17 20L21 16M17 20L17 4" stroke="#292929" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </>
                    )
                  }
                </g>
                <defs>
                  <clipPath id="clip0_429_11110">
                    <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
                </defs>
              </g>
            </svg>
          </div>
          <div className="4/5">
            Entraide
          </div>
        </Link>
        <Link
          to={"/forum"}
          className={`text-[#323232] px-4 py-2 rounded w-full text-center flex justify-between items-center ${location.pathname === "/forum"
            ? "bg-[#279E81] text-white"
            : "bg-white"
            }`}
        >
          <div className="1/5">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g clipPath="url(#clip0_429_11097)">
                  {
                    location.pathname === '/forum' ? (
                      <>
                        <path d="M3 5H21V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V5Z" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M7 14H10" stroke="#279E81" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M7 10L17 10" stroke="#279E81" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </>
                    ) : (
                      <>
                        <path d="M3 5H21V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V5Z" stroke="#292929" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M7 14H10" stroke="#292929" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M7 10L17 10" stroke="#292929" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </>
                    )
                  }
                </g>
                <defs>
                  <clipPath id="clip0_429_11097">
                    <rect width="24" height="24" fill="white"></rect>
                  </clipPath>
                </defs>
              </g>
            </svg>
          </div>
          <div className="4/5">
            Forum
          </div>
        </Link>
      </div>
      <SpeechRecognitionComponent onResult={handleSpeechResult} />
    </div>
  );
};

export default Sidebar;
