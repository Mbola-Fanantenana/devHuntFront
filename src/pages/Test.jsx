import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

const Test = () => {
    return (
        <div className="flex relative min-h-screen bg-[#ddd]">
            <Sidebar />
            <div className="w-full">
                <Navbar />
                <div className="flex-1 p-4 m-2 bg-white bg-opacity-25 backdrop-blur-md shadow-lg rounded-lg">
                    <h1 className="text-black text-3xl mb-8">Contenu principal</h1>
                    <p className="text-black">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at
                        nisi non elit ullamcorper venenatis. Pellentesque habitant morbi
                        tristique senectus et netus et malesuada fames ac turpis egestas.
                        Donec rutrum arcu quis justo mollis, et fermentum enim
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Test
