import avatar from '../assets/Image/avatar.jpg';
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="bg-[#119877] bg-opacity-60 backdrop-blur-md rounded p-2 m-2 shadow-lg px-12 max-h-screen w-[15%] flex flex-col justify-center items-center">
            <div className='flex flex-col items-center justify-center space-y-2'>
                <div className="w-32 h-32 overflow-hidden border-2 rounded-full">
                    <img className="object-cover w-full h-full" src={avatar} alt="Photo de profil" />
                </div>
            </div>
            <hr className="border border-white w-[150px] mb-8 mt-8" />
            <div className='flex flex-col space-y-2'>
                <Link to={'/responsable'} className={`text-[#323232] px-4 py-2 rounded w-full text-center ${location.pathname === '/responsable' ? 'bg-green-500' : 'bg-white'}`}>Responsable</Link>
                <Link to={'/information'} className={`text-[#323232] px-4 py-2 rounded w-full text-center ${location.pathname === '/information' ? 'bg-green-500' : 'bg-white'}`}>Information</Link>
                <Link to={'/entraide'} className={`text-[#323232] px-4 py-2 rounded w-full text-center ${location.pathname === '/entraide' ? 'bg-green-500 pr-4' : 'bg-white'}`}>Entraide</Link>
                <Link to={'/forum'} className={`text-[#323232] px-4 py-2 rounded w-full text-center ${location.pathname === '/forum' ? 'bg-green-500 pr-4' : 'bg-white'}`}>Forum</Link>
            </div>
        </div>
    );
};

export default Sidebar;
