import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Lottie from 'lottie-react';
import LoginAnimation from '../assets/Lotties/login-animation.json';
import Footer from "../components/Footer";
import axios from "axios";
import config from '../../config.json';
import ErrorModal from "../components/ErrorModal";

const Inscription = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const initialFormState = ({
        emailUtilisateur: '',
        pseudoUtilisateur: '',
        mdpUtilisateur: '',
        confirmMdp: '',
        nomUtilisateur: '',
        prenomUtilisateur: '',
        adresseUtilisateur: '',
        telUtilisateur: '',
        matriculeUtilisateur: '',
        niveauUtilisateur: ''
    })
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState(initialFormState);
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
            if (!formData.nomUtilisateur || !formData.prenomUtilisateur || !formData.adresseUtilisateur || !formData.telUtilisateur) {
                setError("Les champs ne doivent pas être vides !");
                console.log("1 - malalaka");
                return;
            }
            setCurrentStep(2);
        } else if (currentStep === 2) {
            if (!formData.matriculeUtilisateur || !formData.niveauUtilisateur || !formData.pseudoUtilisateur ) {
                setError("Les champs ne doivent pas être vides !");
                return;
            }
            setCurrentStep(3);
        } else {
            if (!formData.emailUtilisateur || !formData.mdpUtilisateur || !formData.confirmMdp) {
                setError("Les champs ne doivent pas être vides !");
                return;
            }
            if (formData.mdpUtilisateur !== formData.confirmMdp) {
                setError("Vos mots de passe ne correspondent pas !");
                return;
            }
            console.log("tafiditra");
            axios.post(`${config.API_HOST}/api/signup`, JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(() => {
                    setFormData(initialFormState);
                    setCurrentStep(4);
                })
                .catch((error) => {
                    console.error('Erreur lors de la requête : ', error);
                });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCloseErrorModal = () => {
        setError(null);
    };

    return (
        <div className="bg-gradient-to-r from-purple-700 to-blue-800 min-h-screen flex flex-col">
            <div className="flex-grow flex justify-center items-center space-x-8">
                <div className='relative md:w-[40%] sm:w-[40%]'>
                    <p className="absolute flex items-center xl:text-4xl sm:block xs:block mt-10 text-white text-opacity-50 backdrop-blur-lg">Découvrez
                        la technologie différemment.</p>
                    <div className={`relative xl:w-[100%] lg:w-[100%] md:w-[100%] sm:block xs:block`}>
                        <Lottie
                            animationData={LoginAnimation}
                            loop={true}
                            autoplay={true}
                            className="w-full h-auto"
                        />
                    </div>
                    <p className="absolute flex items-center xl:text-4xl sm:block -mt-20 text-white text-opacity-50 backdrop-blur-lg">Au
                        delà de votre imagination.</p>
                </div>
                <div
                    className="md:bg-white md:bg-opacity-20 sm:bg-transparent backdrop-blur-lg rounded p-8 max-w-md relative w-full md:w-auto border border-gray-200">
                    {currentStep === 1 && (
                        <>
                            <h2 className="text-3xl font-bold text-white mb-4">Inscrivez-vous (Étape 1)</h2>
                            <hr className="border-t border-white border-opacity-50 mb-2" />
                            <div className="mb-4">
                                <label htmlFor="nom" className="text-white block mb-1">Nom de famille</label>
                                <input
                                    name="nomUtilisateur"
                                    value={formData.nomUtilisateur}
                                    onChange={handleInputChange}
                                    type="text"
                                    id="nom"
                                    className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="prenom" className="text-white block mb-1">Prénom(s)</label>
                                <input
                                    name="prenomUtilisateur"
                                    value={formData.prenomUtilisateur}
                                    onChange={handleInputChange}
                                    type="text"
                                    id="prenom"
                                    className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="adresse" className="text-white block mb-1">Adresse</label>
                                <input
                                    name="adresseUtilisateur"
                                    value={formData.adresseUtilisateur}
                                    onChange={handleInputChange}
                                    type="text"
                                    id="adresse"
                                    className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="tel" className="text-white block mb-1">Numéro téléphone</label>
                                <input
                                    name="telUtilisateur"
                                    value={formData.telUtilisateur}
                                    onChange={handleInputChange}
                                    type="text"
                                    id="tel"
                                    className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75"
                                />
                            </div>
                        </>
                    )}
                    {currentStep === 2 && (
                        <>
                            <h2 className="text-3xl font-bold text-white mb-4">Inscrivez-vous (Étape 2)</h2>
                            <hr className="border-t border-white border-opacity-50 mb-2" />
                            <div className="mb-4">
                                <label htmlFor="matricule" className="text-white block mb-1">Matricule</label>
                                <input
                                    name="matriculeUtilisateur"
                                    value={formData.matriculeUtilisateur}
                                    onChange={handleInputChange}
                                    type="text"
                                    id="matricule"
                                    className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="niveau" className="text-white block mb-1">Niveau</label>
                                <select
                                    name="niveauUtilisateur"
                                    value={formData.niveauUtilisateur}
                                    onChange={handleInputChange}
                                    id="niveau"
                                    className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75"
                                >
                                    <option value="" disabled>Sélectionnez votre niveau</option>
                                    <option value="L1">L1</option>
                                    <option value="L2">L2</option>
                                    <option value="L3">L3</option>
                                    <option value="M1">M1</option>
                                    <option value="M2">M2</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="text-white block mb-1">Pseudo</label>
                                <input
                                    name="pseudoUtilisateur"
                                    value={formData.pseudoUtilisateur}
                                    onChange={handleInputChange}
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75"
                                />
                            </div>
                            <button
                                onClick={() => setCurrentStep(currentStep - 1)}
                                className="bg-white w-full bg-opacity-25 hover:bg-opacity-50 text-white py-2 px-4 rounded-md focus:outline-none text-lg font-medium my-4"
                            >
                                Retour
                            </button>
                        </>
                    )}
                    {currentStep === 3 && (
                        <>
                            <h2 className="text-3xl font-bold text-white mb-4">Inscrivez-vous (Étape 3)</h2>
                            <hr className="border-t border-white border-opacity-50 mb-2" />
                            <div className="mb-4">
                                <label htmlFor="email" className="text-white block mb-1">Adresse email</label>
                                <input
                                    name="emailUtilisateur"
                                    value={formData.emailUtilisateur}
                                    onChange={handleInputChange}
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="text-white block mb-1">Mot de passe</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="confirmMdp"
                                        value={formData.confirmMdp}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75" />
                                    <button type="button" onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 flex items-center pr-2">
                                        {showPassword ? <FiEye className="text-white" /> :
                                            <FiEyeOff className="text-white" />}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="text-white block mb-1">Confirmez le mot de
                                    passe</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="password"
                                        name="mdpUtilisateur"
                                        value={formData.mdpUtilisateur}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75" />
                                    <button type="button" onClick={toggleConfirmPasswordVisibility}
                                        className="absolute inset-y-0 right-0 flex items-center pr-2">
                                        {showConfirmPassword ? <FiEye className="text-white" /> :
                                            <FiEyeOff className="text-white" />}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                    {currentStep !== 4 && (
                        <form>
                            <button type="submit"
                                onClick={(e) => handleSubmit(e)}
                                className="bg-white w-full bg-opacity-25 hover:bg-opacity-50 text-white py-2 px-4 rounded-md focus:outline-none text-lg font-medium">
                                {currentStep === 3 ? "Finaliser l'inscription" : "Suivant"}
                            </button>
                        </form>
                    )}
                    <p className="mt-4 text-white text-center">Vous avez un compte ? <Link to="/login"
                        className="text-blue-300 hover:text-blue-400">Connectez-vous</Link>
                    </p>
                </div>
                <ErrorModal isOpen={error !== null} onClose={handleCloseErrorModal} titleMessage="Message d'erreur">
                    {error}
                </ErrorModal>
            </div>
            <Footer textColor="#eee" copyright="&copy; < Minds Merge /> - 2024" />
        </div>
    )
}

export default Inscription;
