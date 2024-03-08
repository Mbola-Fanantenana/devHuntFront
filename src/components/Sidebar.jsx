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
          className={`text-[#323232] px-4 py-2 rounded w-full text-center ${
            location.pathname === "/responsable"
              ? "bg-[#279E81] text-white"
              : "bg-white"
          }`}
        >
          Responsable
        </Link>
        <Link
          to={"/information"}
          className={`text-[#323232] px-4 py-2 rounded w-full text-center ${
            location.pathname === "/information"
              ? "bg-[#279E81] text-white"
              : "bg-white"
          }`}
        >
          Information
        </Link>
        <Link
          to={"/entraide"}
          className={`text-[#323232] px-4 py-2 rounded w-full text-center ${
            location.pathname === "/entraide"
              ? "bg-[#279E81] text-white pr-4"
              : "bg-white"
          }`}
        >
          Entraide
        </Link>
        <Link
          to={"/forum"}
          className={`text-[#323232] px-4 py-2 rounded w-full text-center ${
            location.pathname === "/forum"
              ? "bg-[#279E81] text-white pr-4"
              : "bg-white"
          }`}
        >
          Forum
        </Link>
      </div>
      <SpeechRecognitionComponent onResult={handleSpeechResult} />
    </div>
  );
};

export default Sidebar;
