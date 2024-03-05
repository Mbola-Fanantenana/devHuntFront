import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Footer from "../components/Footer";
import axios from "axios";
import config from '../../config.json'


const Authentification = () => {
    const [showPassword, setShowPassword] = useState(false);
    const initialFormState = ({
        pseudoUtilisateur: '',
        mdpUtilisateur: ''
    })
    const [formData, setFormData] = useState(initialFormState);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            const response = axios.post(`${config.API_HOST}/api/login`, JSON.stringify(formData), {
                headers: { 'Content-Type': 'application/json', },
            });
            localStorage.setItem('userSession', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.user);
            setFormData(initialFormState);
            // window.location.href = "/redirection_vers_la_page";

        } catch (error) {
            console.log("Eto ilay erreur login");

            setFormData(prevState => ({
                ...prevState,
                mdpUtilisateur: ''
            }));
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    return (
        <div className="bg-gradient-to-r from-purple-700 to-blue-800 min-h-screen flex flex-col">
            <div className="flex-grow flex justify-center items-center">
                <div className="md:bg-white md:bg-opacity-20 sm:bg-transparent backdrop-blur-lg rounded-lg p-8 max-w-md relative w-full md:w-auto">
                    <h2 className="text-3xl font-bold text-white mb-4">Connectez-vous</h2>
                    <hr className="border-t border-white border-opacity-50 mb-2" />
                    <form>
                        <div className="mb-4">
                            <label htmlFor="email" className="text-white block mb-1">Adresse email</label>
                            <input
                                className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75"
                                name="pseudoUtilisateur"
                                id="email"
                                type="text"
                                value={formData.pseudoUtilisateur}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="text-white block mb-1">Mot de passe</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75"
                                    name="mdpUtilisateur"
                                    id="password"
                                    value={formData.mdpUtilisateur}
                                    onChange={handleInputChange}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex items-center pr-2"
                                >
                                    {showPassword ? <FiEyeOff className="text-white" /> : <FiEye className="text-white" />}
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={(e) => handleSubmit(e)}
                            type="submit"
                            className="bg-white w-full bg-opacity-25 hover:bg-opacity-50 text-white py-2 px-4 rounded-md focus:outline-none text-lg font-medium"
                        >Se connecter</button>
                    </form>
                    <p className="mt-4 text-white">Vous n&#39;avez pas de compte ? <Link to="/sign-up" className="text-blue-300 hover:text-blue-400">Inscrivez-vous</Link></p>
                </div>
            </div>
            <Footer textColor="#eee" copyright="&copy; < Minds Merge /> - 2024" />
        </div>
    );
}

export default Authentification;
