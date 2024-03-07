import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Lottie from "lottie-react";
import LoginAnimation from "../assets/Lotties/login-animation.json";
import Footer from "../components/Footer";
import axios from "axios";
import config from "../../config.json";
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";

const Inscription = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const initialFormState = {
    emailUtilisateur: "",
    pseudoUtilisateur: "",
    mdpUtilisateur: "",
    confirmMdp: "",
    nomUtilisateur: "",
    prenomUtilisateur: "",
    adresseUtilisateur: "",
    telUtilisateur: "",
    matriculeUtilisateur: "",
    niveauUtilisateur: "",
  };
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentStep === 1) {
      if (
        !formData.nomUtilisateur ||
        !formData.prenomUtilisateur ||
        !formData.adresseUtilisateur ||
        !formData.telUtilisateur
      ) {
        setError("Les champs ne doivent pas être vides !");
        console.log("1 - malalaka");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (
        !formData.matriculeUtilisateur ||
        !formData.niveauUtilisateur ||
        !formData.pseudoUtilisateur
      ) {
        setError("Les champs ne doivent pas être vides !");
        return;
      }
      setCurrentStep(3);
    } else {
      if (
        !formData.emailUtilisateur ||
        !formData.mdpUtilisateur ||
        !formData.confirmMdp
      ) {
        setError("Les champs ne doivent pas être vides !");
        return;
      }
      if (formData.mdpUtilisateur !== formData.confirmMdp) {
        setError("Vos mots de passe ne correspondent pas !");
        return;
      }

      setLoading(true);

      try {
        axios
          .post(`${config.API_HOST}/api/signup`, JSON.stringify(formData), {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            setFormData(initialFormState);
            setCurrentStep(4);
            console.log("création compte réussie");
            setSuccess("Félicitation, votre compte a bien été créé !");
          })
          .catch((error) => {
            console.error("Erreur lors de la requête : ", error);
            setError("An error occurred. Please try again later.");
          });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCloseErrorModal = () => {
    setError(null);
  };

  const handleCloseSuccessModal = () => {
    setSuccess(null);
    navigate('/photo-profil');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#ddd]">
      <div className="flex items-center justify-center flex-grow space-x-8">
        <div className="relative md:w-[40%] sm:w-[40%]">
          <p className="absolute flex items-center mt-10 text-[#323232] text-opacity-80 xl:text-4xl sm:block xs:block backdrop-blur-lg">
            Découvrez la technologie différemment.
          </p>
          <div
            className={`relative xl:w-[100%] lg:w-[100%] md:w-[100%] sm:block xs:block`}
          >
            <Lottie
              animationData={LoginAnimation}
              loop={true}
              autoplay={true}
              className="w-full h-auto"
            />
          </div>
          <p className="absolute flex items-center -mt-20 text-[#323232] text-opacity-80 xl:text-4xl sm:block backdrop-blur-lg">
            Au delà de votre imagination.
          </p>
        </div>
        <div className="relative w-full max-w-md p-8 border border-gray-200 rounded md:bg-white md:bg-opacity-80 sm:bg-transparent backdrop-blur-lg md:w-auto">
          {currentStep === 1 && (
            <>
              <h2 className="mb-4 text-3xl font-bold text-[#323232]">
                Inscrivez-vous (Étape 1)
              </h2>
              <hr className="mb-2 border-t border-[#323232] border-opacity-50" />
              <div className="mb-4">
                <label htmlFor="nom" className="block mb-1 text-[#323232]">
                  Nom de famille
                </label>
                <input
                  name="nomUtilisateur"
                  value={formData.nomUtilisateur}
                  onChange={handleInputChange}
                  type="text"
                  id="nom"
                  className="w-full px-4 py-2 bg-slate-300 bg-opacity-50 rounded-md focus:outline-none focus:bg-opacity-75"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="prenom" className="block mb-1 text-[#323232]">
                  Prénom(s)
                </label>
                <input
                  name="prenomUtilisateur"
                  value={formData.prenomUtilisateur}
                  onChange={handleInputChange}
                  type="text"
                  id="prenom"
                  className="w-full px-4 py-2 bg-slate-300 bg-opacity-50 rounded-md focus:outline-none focus:bg-opacity-75"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="adresse" className="block mb-1 text-[#323232]">
                  Adresse
                </label>
                <input
                  name="adresseUtilisateur"
                  value={formData.adresseUtilisateur}
                  onChange={handleInputChange}
                  type="text"
                  id="adresse"
                  className="w-full px-4 py-2 bg-slate-300 bg-opacity-50 rounded-md focus:outline-none focus:bg-opacity-75"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="tel" className="block mb-1 text-[#323232]">
                  Numéro téléphone
                </label>
                <input
                  name="telUtilisateur"
                  value={formData.telUtilisateur}
                  onChange={handleInputChange}
                  type="text"
                  id="tel"
                  className="w-full px-4 py-2 bg-slate-300 bg-opacity-50 rounded-md focus:outline-none focus:bg-opacity-75"
                />
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <h2 className="mb-4 text-3xl font-bold text-[#323232]">
                Inscrivez-vous (Étape 2)
              </h2>
              <hr className="mb-2 border-t border-[#323232] border-opacity-50" />
              <div className="mb-4">
                <label htmlFor="matricule" className="block mb-1 text-[#323232]">
                  Matricule
                </label>
                <input
                  name="matriculeUtilisateur"
                  value={formData.matriculeUtilisateur}
                  onChange={handleInputChange}
                  type="text"
                  id="matricule"
                  className="w-full px-4 py-2 bg-slate-300 bg-opacity-50 rounded-md focus:outline-none focus:bg-opacity-75"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="niveau" className="block mb-1 text-[#323232]">
                  Niveau
                </label>
                <select
                  name="niveauUtilisateur"
                  value={formData.niveauUtilisateur}
                  onChange={handleInputChange}
                  id="niveau"
                  className="w-full px-4 py-2 bg-slate-300 bg-opacity-50 rounded-md focus:outline-none focus:bg-opacity-75"
                >
                  <option value="" disabled>
                    Sélectionnez votre niveau
                  </option>
                  <option value="L1">L1</option>
                  <option value="L2">L2</option>
                  <option value="L3">L3</option>
                  <option value="M1">M1</option>
                  <option value="M2">M2</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1 text-[#323232]">
                  Pseudo
                </label>
                <input
                  name="pseudoUtilisateur"
                  value={formData.pseudoUtilisateur}
                  onChange={handleInputChange}
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-slate-300 bg-opacity-50 rounded-md focus:outline-none focus:bg-opacity-75"
                />
              </div>
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="w-full px-4 py-2 my-4 text-lg font-medium bg-slate-400 hover:bg-slate-600 text-gray-900 hover:text-white bg-opacity-25 rounded-md hover:bg-opacity-50 focus:outline-none"
              >
                Retour
              </button>
            </>
          )}
          {currentStep === 3 && (
            <>
              <h2 className="mb-4 text-3xl font-bold text-[#323232]">
                Inscrivez-vous (Étape 3)
              </h2>
              <hr className="mb-2 border-t border-[#323232] border-opacity-50" />
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1 text-[#323232]">
                  Adresse email
                </label>
                <input
                  name="emailUtilisateur"
                  value={formData.emailUtilisateur}
                  onChange={handleInputChange}
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-slate-300 bg-opacity-50 rounded-md focus:outline-none focus:bg-opacity-75"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-1 text-[#323232]">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="confirmMdp"
                    value={formData.confirmMdp}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-300 bg-opacity-50 rounded-md focus:outline-none focus:bg-opacity-75"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    {showPassword ? (
                      <FiEye className="text-[#323232]" />
                    ) : (
                      <FiEyeOff className="text-[#323232]" />
                    )}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-1 text-[#323232]">
                  Confirmez le mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="password"
                    name="mdpUtilisateur"
                    value={formData.mdpUtilisateur}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-300 bg-opacity-50 rounded-md focus:outline-none focus:bg-opacity-75"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    {showConfirmPassword ? (
                      <FiEye className="text-[#323232]" />
                    ) : (
                      <FiEyeOff className="text-[#323232]" />
                    )}
                  </button>
                </div>
              </div>
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="w-full px-4 py-2 my-4 text-lg font-medium bg-slate-400 hover:bg-slate-600 text-gray-900 hover:text-white bg-opacity-25 rounded-md hover:bg-opacity-50 focus:outline-none"
              >
                Retour
              </button>
            </>
          )}
          {currentStep !== 4 && (
            <form>
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="w-full px-4 py-2 text-lg font-medium text-white bg-[#007a55] bg-opacity-60 rounded-md hover:bg-opacity-80 focus:outline-none"
                disabled={loading}
              >
                {currentStep === 3 && loading ? 'Chargement...' : currentStep === 3 ? "Finaliser l'inscription" : "Suivant"}
              </button>
            </form>
          )}
          <p className="mt-4 text-center text-[#323232]">
            Vous avez un compte ?{" "}
            <Link to="/login" className="text-[#007a55] hover:text-emerald-700">
              Connectez-vous
            </Link>
          </p>
        </div>
        <ErrorModal
          isOpen={error !== null}
          onClose={handleCloseErrorModal}
          titleMessage="Message d'erreur"
        >
          {error}
        </ErrorModal>
        <SuccessModal isOpen={success !== null} onClose={handleCloseSuccessModal} titleMessage="Message de suucès">{success}</SuccessModal>
      </div>
      <Footer textColor="#323232" copyright="&copy; < Minds Merge /> - 2024" />
    </div>
  );
};

export default Inscription;
