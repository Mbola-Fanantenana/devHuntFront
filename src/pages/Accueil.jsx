import { useState } from "react";
import FormModal from "../components/FormModal";
import Chatbot from "../components/Chatbot";

const Accueil = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleModalAction = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <button className="bg-emerald-500 py-2 px-4 rounded" onClick={handleOpenModal}>Ouvrir le modal</button>

      <FormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAction={handleModalAction}
        actionLabel="Confirmer"
        titleMessage="Titre du modal"
      >
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="text-black block mb-1">Nom d&#39;utilisateur</label>
            <input
              className="w-full px-4 py-2 rounded-md bg-white bg-opacity-50 focus:outline-none focus:bg-opacity-75"
              name="pseudoUtilisateur"
              id="email"
              type="text"
            />
          </div>
        </form>
      </FormModal>
    </div>
  )
}

export default Accueil;
