/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const Toast = ({ message }) => {
    const [showToast, setShowToast] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowToast(false);
        }, 5000); // Fermer le toast après 5 secondes

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            {showToast && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 backdrop-filter backdrop-blur-lg"></div>
                    <div className="absolute bg-emerald-400 bg-opacity-50 p-6 rounded z-50 backdrop-filter backdrop-blur-lg border border-emerald-800">
                        <div>{message}</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Toast