import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Footer from "../components/Footer";
import axios from "axios";
import config from '../../config.json';
import Lottie from 'lottie-react';
import LoginAnimation from '../assets/Lotties/login-animation.json';
import ErrorModal from "../components/ErrorModal";
import Toast from "../components/Toast";

const Authentification = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        pseudoUtilisateur: '',
        mdpUtilisateur: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleShowToast = () => {
        setShowToast(true);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.pseudoUtilisateur || !formData.mdpUtilisateur) {
            setError("Les champs ne doivent pas être vides !");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${config.API_HOST}/api/login`, JSON.stringify(formData), {
                headers: { 'Content-Type': 'application/json', },
            });
            localStorage.setItem('userSession', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.user);
            setFormData({
                pseudoUtilisateur: '',
                mdpUtilisateur: ''
            });
            handleShowToast()
            setTimeout(() => (
                navigate('/accueil')
            ), 5000);

        } catch (error) {
            setError("Le nom d'utilisateur ou le mot de passe est incorrecte !");
            setFormData(prevState => ({
                ...prevState,
                mdpUtilisateur: ''
            }));
        } finally {
            setLoading(false);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleCloseErrorModal = () => {
        setError(null);
    }

    return (
        <div className="bg-[#ddd] min-h-screen flex flex-col">
            <div className="flex-grow flex justify-center items-center">
                <div className='relative md:w-[40%] sm:w-[40%]'>
                    <p className="absolute flex items-center xl:text-4xl sm:block xs:block mt-10 text-[#323232] text-opacity-80 backdrop-blur-lg">Découvrez la technologie différemment.</p>
                    <div className={`relative xl:w-[100%] lg:w-[100%] md:w-[100%] sm:block xs:block`}>
                        <Lottie
                            animationData={LoginAnimation}
                            loop={true}
                            autoplay={true}
                            className="w-full h-auto"
                        />
                    </div>
                    <p className="absolute flex items-center xl:text-4xl sm:block -mt-20 text-[#323232] text-opacity-80 backdrop-blur-lg">Au-delà de votre imagination.</p>
                </div>
                <div className="md:bg-white md:bg-opacity-80 sm:bg-transparent backdrop-blur-lg rounded p-8 max-w-md relative w-full md:w-auto border border-gray-200">
                    <h2 className="text-3xl font-bold text-[#323232] mb-4">Connectez-vous</h2>
                    <hr className="border-t border-[#323232] border-opacity-50 mb-2" />
                    <form>
                        <div className="mb-4">
                            <label htmlFor="email" className="text-[#323232] block mb-1">Nom d&#39;utilisateur</label>
                            <input
                                className="w-full px-4 py-2 rounded bg-slate-300 bg-opacity-50 focus:outline-none focus:bg-opacity-80"
                                name="pseudoUtilisateur"
                                id="email"
                                type="text"
                                value={formData.pseudoUtilisateur}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="text-[#323232] block mb-1">Mot de passe</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-4 py-2 rounded bg-slate-300 bg-opacity-50 focus:outline-none focus:bg-opacity-80"
                                    name="mdpUtilisateur"
                                    id="password"
                                    value={formData.mdpUtilisateur}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex items-center pr-2"
                                >
                                    {showPassword ? <FiEye className="text-[#323232]" /> : <FiEyeOff className="text-[#323232]" />}
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={(e) => handleSubmit(e)}
                            type="submit"
                            className="bg-[#007a55] w-full bg-opacity-60 hover:bg-opacity-80 text-white py-2 px-4 rounded focus:outline-none text-lg font-medium"
                            disabled={loading}
                        >
                            {loading ? 'Chargement...' : 'Se connecter'}
                        </button>
                    </form>
                    <p className="mt-4 text-[#323232]">Vous n&#39;avez pas de compte ? <Link to="/sign-up" className="text-[#007a55] hover:text-emerald-700">Inscrivez-vous</Link></p>
                </div>
                <ErrorModal isOpen={error !== null} onClose={handleCloseErrorModal} titleMessage="Message d'erreur">
                    {error}
                </ErrorModal>
                {showToast && (
                    <Toast message="Connecter avec succès !" />
                )}
            </div>
            <Footer textColor="#323232" copyright="&copy; < Minds Merge /> - 2024" />
        </div >
    );
}

export default Authentification;
