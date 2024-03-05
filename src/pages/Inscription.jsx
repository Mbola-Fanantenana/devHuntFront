import {useState} from "react";
import {Link} from "react-router-dom";
import {FiEye, FiEyeOff} from 'react-icons/fi';
import Lottie from 'lottie-react';
import LoginAnimation from '../assets/Lotties/login-animation.json';
import Footer from "../components/Footer";
import axios from "axios";
import config from '../../config.json';

const Inscription = () => {
    const [showPassword, setShowPassword] = useState(false);
    const initialFormState = ({
        emailUtilisateur: '',
        pseudoUtilisateur: '',
        mdpUtilisateur: '',
        confirmMdp : ''
    })
    const [formData, setFormData] = useState(initialFormState);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if( formData.mdpUtilisateur === formData.confirmMdp) {
            const objet = formData;
            delete objet.confirmMdp;

            axios.post(`${config.API_HOST}/api/signup`, JSON.stringify(objet), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    setFormData(initialFormState);
                })
                .catch((error) => {
                    console.error('Erreur lors de la requête : ', error);
                });
        } else {
            console.log("Eto ilay erreur rehefa tsy mitovy ilay mot de passe");
        }
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }


    return (
        <div className="bg-gradient-to-r from-purple-700 to-blue-800 min-h-screen flex flex-col">
            <div className="flex-grow flex justify-center items-center space-x-8">
                <div className='relative md:w-[40%] sm:w-[40%]'>
                    <p className="absolute flex items-center xl:text-4xl sm:block xs:block mt-10 text-white text-opacity-50 backdrop-blur-lg">Découvrez
                        la technologie differemment.</p>
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
                    className="md:bg-white md:bg-opacity-20 sm:bg-transparent backdrop-blur-lg rounded-lg p-8 max-w-md relative w-full md:w-auto">
                    <h2 className="text-3xl font-bold text-white mb-4">Inscrivez-vous</h2>
                    <hr className="border-t border-white border-opacity-50 mb-2"/>
                    <form>
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
                                    className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75"/>
                                <button type="button" onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    {showPassword ? <FiEyeOff className="text-white"/> :
                                        <FiEye className="text-white"/>}
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="text-white block mb-1">Confirmez le mot de
                                passe</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="mdpUtilisateur"
                                    value={formData.mdpUtilisateur}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75"/>
                                <button type="button" onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    {showPassword ? <FiEyeOff className="text-white"/> :
                                        <FiEye className="text-white"/>}
                                </button>
                            </div>
                        </div>
                        <button type="submit"
                                onClick={(e) => handleSubmit(e)}
                                className="bg-white w-full bg-opacity-25 hover:bg-opacity-50 text-white py-2 px-4 rounded-md focus:outline-none text-lg font-medium">S&#39;inscrire
                        </button>
                    </form>
                    <p className="mt-4 text-white">Vous avez un compte ? <Link to="/login"
                                                                               className="text-blue-300 hover:text-blue-400">Connectez-vous</Link>
                    </p>
                </div>
            </div>
            <Footer textColor="#eee" copyright="&copy; < Minds Merge /> - 2024"/>
        </div>
    )
}

export default Inscription