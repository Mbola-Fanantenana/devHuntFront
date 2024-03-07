/* eslint-disable react/prop-types */
const FormModal = ({ isOpen, onClose, onAction, actionLabel, titleMessage, children }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 backdrop-filter bg-gray-400 bg-opacity-50 backdrop-blur-lg"></div>
                <div className="absolute bg-white w-[50%] bg-opacity-50 p-6 rounded z-50 backdrop-filter backdrop-blur-lg border border-gray-200">
                    <h1 className="text-2xl font-bold mb-4">{titleMessage}</h1>
                    <hr className="border-t border-gray-300 mb-4" />
                    <div>{children}</div>
                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            className="bg-gray-500 hover:text-gray-700 text-white rounded-md px-4 py-2"
                            onClick={onClose}
                        >
                            Annuler
                        </button>
                        <button
                            className="text-white bg-[#007a55] rounded-md px-4 py-2 hover:bg-emerald-600"
                            onClick={onAction}
                        >
                            {actionLabel}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormModal;
