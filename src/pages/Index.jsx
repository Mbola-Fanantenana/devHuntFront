import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { Outlet } from 'react-router-dom'

const Index = () => {
    return (
        <div className="flex relative min-h-screen bg-[#ccc]">
            <div className="flex flex-row">
                <Sidebar />
                <div className="w-full h-full">
                    <Navbar />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Index
