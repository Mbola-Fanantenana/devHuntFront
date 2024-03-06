import avatar from '../assets/Image/avatar.png';
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="bg-[#119877] bg-opacity-60 backdrop-blur-md rounded p-2 m-2 shadow-lg px-12 max-h-screen w-[15%] flex flex-col justify-center items-center">
            <div className='flex flex-col justify-center items-center space-y-2'>
                <div className="rounded-full overflow-hidden w-32 h-32">
                    <img className="w-full h-full object-cover" src={avatar} alt="Photo de profil" />
                </div>
                <p className='font-medium'>RATOVONANAHARY</p>
                <p>Andoniaina</p>
            </div>
            <hr className="border border-white w-[150px]" />
            <h2 className="text-[#323232]">Sidebar</h2>
            <div className='space-y-2 flex flex-col'>
                <Link to={'/page-content'} className="text-[#323232] bg-white px-4 py-2 rounded w-full text-center">Content</Link>
                <Link to={'/responsable'} className="text-[#323232] bg-white px-4 py-2 rounded w-full text-center">Responsable</Link>
                <Link to={'/information'} className="text-[#323232] bg-white px-4 py-2 rounded w-full text-center">Information</Link>
                <Link to={'/entraide'} className="text-[#323232] bg-white px-4 py-2 rounded w-full text-center">Entraide</Link>
            </div>
        </div>
    );
};

export default Sidebar;
