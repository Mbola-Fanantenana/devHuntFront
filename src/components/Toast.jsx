/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const Toast = ({ message }) => {
    const [showToast, setShowToast] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowToast(false);
        }, 4000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            {showToast && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 backdrop-filter backdrop-blur-lg"></div>
                    <div className="absolute bg-[#007a55] bg-opacity-80 p-6 rounded z-50 backdrop-filter backdrop-blur-lg border border-emerald-800">
                        <div>{message}</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Toast