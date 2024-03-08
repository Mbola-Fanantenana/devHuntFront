/* eslint-disable react/prop-types */
const CommentModal = ({ isOpen, onClose, titleMessage, children }) => {
    if (!isOpen) return null;
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 backdrop-filter backdrop-blur-lg"></div>
                <div className="absolute bg-white bg-opacity-80 p-6 rounded z-50 backdrop-filter backdrop-blur-lg border w-[50%]">
                    <h1 className="text-2xl font-bold mb-4">{titleMessage}</h1>
                    <hr className="border-t border-gray-300 mb-4" />
                    <div>{children}</div>
                    <div className="flex justify-end">
                        <button
                            className="bg-gray-500 px-4 py-2 rounded text-white"
                            onClick={onClose}
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommentModal