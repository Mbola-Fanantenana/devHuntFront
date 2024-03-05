import { useState } from "react";
import { Link } from "react-router-dom"
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Footer from "../components/Footer";

const Authentification = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="bg-gradient-to-r from-purple-700 to-blue-800 min-h-screen flex flex-col">
                <div className="flex-grow flex justify-center items-center">
                    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 max-w-md relative">
                        <h2 className="text-3xl font-bold text-white mb-4">Connectez-vous</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="email" className="text-white block mb-1">Adresse email</label>
                                <input type="email" id="email" className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="text-white block mb-1">Mot de passe</label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} id="password" className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75" />
                                    <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center pr-2">
                                        {showPassword ? <FiEyeOff className="text-white" /> : <FiEye className="text-white" />}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="bg-white w-full bg-opacity-25 hover:bg-opacity-50 text-white py-2 px-4 rounded-md focus:outline-none">Se connecter</button>
                        </form>
                        <p className="mt-4 text-white">Vous n&#39;avez pas de compte ? <Link to="/register" className="text-blue-300 hover:text-blue-400">Inscrivez-vous</Link></p>
                    </div>
                </div>
                <Footer textColor="#eee" className="sticky bottom-0" copyright="&copy; Minds Merge - 2024" />
            </div>
        </>
    )
}

export default Authentification