/* eslint-disable react/prop-types */
const Footer = ({ backgroundColor, textColor, className, copyright }) => {
    const footerStyle = {
        backgroundColor: backgroundColor,
        color: textColor
    };

    return (
        <footer className={`py-4 ${className}`} style={footerStyle}>
            <div className="container mx-auto px-4">
                <div className="flex justify-center items-center">
                    <p className="text-center">{copyright}</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer