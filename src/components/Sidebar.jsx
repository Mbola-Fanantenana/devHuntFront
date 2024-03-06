import avatar from '../assets/Image/avatar.png';

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
            <hr className="border-t border-black" />
            <h2 className="text-[#323232]">Sidebar</h2>
            <div className='w-full'>
                <ul className="space-y-4">
                    <li className="text-[#323232] bg-white px-4">Option 1</li>
                    <li className="text-[#323232] bg-white w-full">Option 2</li>
                    <li className="text-[#323232] bg-white w-full">Option 3</li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
