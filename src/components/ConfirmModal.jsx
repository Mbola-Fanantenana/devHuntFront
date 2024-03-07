/* eslint-disable react/prop-types */
const ConfirmModal = ({ isOpen, onClose, onConfirm, titleMessage, children }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 backdrop-filter backdrop-blur-lg"></div>
                <div className="absolute bg-white bg-opacity-80 p-6 rounded z-50 backdrop-filter backdrop-blur-lg border border-[#007a55]">
                    <h1 className="text-2xl font-bold mb-4">{titleMessage}</h1>
                    <hr className="border-t border-gray-300 mb-4" />
                    <div>{children}</div>
                    <div className="flex justify-end mt-4">
                        <button
                            className="text-gray-500 hover:text-gray-700 mr-4"
                            onClick={onClose}
                        >
                            Annuler
                        </button>
                        <button
                            className="text-white bg-[#007a55] hover:bg-emerald-600 px-4 py-2 rounded"
                            onClick={onConfirm}
                        >
                            Confirmer
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmModal;
