import { Link } from 'react-router-dom'
import Chatbot from './components/Chatbot'
import Toast from './components/Toast';
import { useState } from 'react';
import ConfirmModal from './components/ConfirmModal';

function App() {
  const [confirm, setConfirm] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseConfirmModal = () => {
    setConfirm(null);
  };
  
  const handleOpenConfirmModal = () => {
    setConfirm("Voulez-vous vraiment effectuer cette action ?");
    console.log("Action confirmée !");
  }

  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <Chatbot />
        <Link to={'/login'} className='px-4 py-2 text-white rounded bg-gradient-to-tl from-purple-700 to-blue-800'>Se connecter</Link>
      </div>
      <button onClick={handleShowToast}>Afficher le toast</button>
      <button onClick={handleOpenConfirmModal}>Confirm modal</button>
      {showToast && (
        <Toast message="Ceci est un message de toast" />
      )}
      <ConfirmModal isOpen={confirm !== null} onClose={handleCloseConfirmModal} titleMessage="Message d'erreur">
        {confirm}
      </ConfirmModal>
    </>
  )
}

export default App
