import { Link } from "react-router-dom"

const Authentification = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-700 to-blue-800">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 max-w-md">
                <h2 className="text-3xl font-bold text-white mb-4">Connectez-vous</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-white block mb-1">Adresse email</label>
                        <input type="email" id="email" className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="text-white block mb-1">Mot de passe</label>
                        <input type="password" id="password" className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75" />
                    </div>
                    <button type="submit" className="bg-white w-full bg-opacity-25 hover:bg-opacity-50 text-white py-2 px-4 rounded-md focus:outline-none">Se connecter</button>
                </form>
                <p className="mt-4 text-white">Vous n&#39;avez pas de compte ? <Link to="/register" className="text-blue-300 hover:text-blue-400">Inscrivez-vous</Link></p>
            </div>
        </div>
    )
}

export default Authentification