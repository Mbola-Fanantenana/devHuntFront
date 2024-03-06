const Navbar = () => {
    return (
        <div className="p-4 m-2 flex justify-between items-center bg-[#119877] bg-opacity-60 backdrop-blur-md shadow-lg rounded">
            <h2 className="text-white text-lg flex items-center mb-4">Navbar</h2>
            <ul className="flex">
                <li className="text-white mx-4">Accueil</li>
                <li className="text-white mx-4">À propos</li>
                <li className="text-white mx-4">Contact</li>
            </ul>
        </div>
    )
}

export default Navbar