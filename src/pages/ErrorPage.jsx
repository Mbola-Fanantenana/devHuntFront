import Lottie from 'lottie-react';
import E404 from '../assets/Lotties/404.json';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='bg-[#ddd]'>
      <div className='flex flex-col h-screen space-y-8 justify-center items-center'>
        <div className='bg-[#119877] bg-opacity-80 rounded shadow-md shadow-black p-8'>
          <Lottie
            animationData={E404}
            loop={true}
            autoplay={true}
            style={{ width: 500, height: 300 }}
            className="mx-auto my-auto"
          />
          <p className='uppercase text-center text-[#ccc] text-3xl py-4 tracking-wider'>Page non trouvée.</p>
        </div>
        <p className='text-xl'>Cliquez <Link to={'/accueil'} className='text-emerald-600'>ici pour revenir en arrière</Link>.</p>
      </div>
    </div>
  )
}

export default ErrorPage