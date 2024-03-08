import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import config from '../../config.json';
import Lottie from 'lottie-react';
import LoginAnimation from '../assets/Lotties/login-animation.json';
import * as faceapi from 'face-api.js';
import ErrorModal from "../components/ErrorModal";
import Toast from "../components/Toast";

const FaceAuthentification = () => {
    //Variable d'etats
    const [tempAccount, setTempAccount] = useState();
    const [localUserStream, setLocalUserStream] = useState(null);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [faceApiLoaded, setFaceApiLoaded] = useState(false);
    const [loginResult, setLoginResult] = useState("PENDING");
    //const [imageError, setImageError] = useState(false);
    const [counter, setCounter] = useState(5);
    const [labeledFaceDescriptors, setLabeledFaceDescriptors] = useState({});
    const videoRef = useRef();
    const canvasRef = useRef();
    const faceApiIntervalRef = useRef();
    const videoWidth = 440;
    const videoHeight = 360;
    const [token, setToken] = useState();
    const [error, setError] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const [showToast, setShowToast] = useState(false);
    // a utiliser pour recuperer le token
    const initialFormState = ({
        pseudoUtilisateur: ''
    })
    const [formData, setFormData] = useState(initialFormState);

    //maka video
    const getLocalUserVideo = async () => {
        navigator.mediaDevices
            .getUserMedia({ audio: false, video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
                setLocalUserStream(stream);
            })
            .catch((err) => {
                console.error("error:", err);
            });
    };
    useEffect(() => {
        setTempAccount(location?.state?.account);
    }, []);
    // function scanFace
    const scanFace = async () => {
        faceapi.matchDimensions(canvasRef.current, videoRef.current);
        const faceApiInterval = setInterval(async () => {
            const detections = await faceapi
                .detectAllFaces(videoRef.current)
                .withFaceLandmarks()
                .withFaceDescriptors();
            const resizedDetections = faceapi.resizeResults(detections, {
                width: videoWidth,
                height: videoHeight,
            });

            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

            const results = resizedDetections.map((d) =>
                faceMatcher.findBestMatch(d.descriptor)
            );

            if (!canvasRef.current) {
                return;
            }

            canvasRef.current
                .getContext("2d")
                .clearRect(0, 0, videoWidth, videoHeight);
            faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
            // faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);

            if (results.length > 0 && tempAccount.pseudoUtilisateur === results[0].label) {
                setLoginResult("SUCCESS");
            } else {
                setLoginResult("FAILED");
            }

            if (!faceApiLoaded) {
                setFaceApiLoaded(true);
            }
        }, 1000 / 15);
        faceApiIntervalRef.current = faceApiInterval;
    };
    //function charge le models de detection
    const loadModels = async () => {
        const uri = "/models";
        await faceapi.nets.ssdMobilenetv1.loadFromUri(uri);
        await faceapi.nets.faceLandmark68Net.loadFromUri(uri);
        await faceapi.nets.faceRecognitionNet.loadFromUri(uri);
    };

    const handleShowToast = () => {
        setShowToast(true);
    };
    // Navigation et obtention du token (code a modiflier)
    const navigate = useNavigate();
    useEffect(() => {
        if (loginResult === "SUCCESS") {
            const counterInterval = setInterval(() => {
                setCounter((counter) => counter - 1);
            }, 1000);

            if (counter === 0) {
                videoRef.current.pause();
                videoRef.current.srcObject = null;
                localUserStream.getTracks().forEach((track) => {
                    track.stop();
                });
                clearInterval(counterInterval);
                clearInterval(faceApiIntervalRef.current);
                localStorage.setItem("token", JSON.stringify(token))
                localStorage.setItem(
                    "userSession",
                    JSON.stringify(tempAccount)
                );
                setFormData(initialFormState);
                handleShowToast()
                setTimeout(() => (
                    navigate('/accueil')
                ), 5000);

            }

            return () => clearInterval(counterInterval);
        }
        else if (loginResult === "FAILED") {
            console.log("Erreur lors de la connexion");
        }
        setCounter(3);
    }, [loginResult, counter]);
    useEffect(() => {
        if (tempAccount) {
            console.log(tempAccount);
            loadModels()
                .then(async () => {
                    const labeledFaceDescriptors = await loadLabeledImages();
                    setLabeledFaceDescriptors(labeledFaceDescriptors);
                    setModelsLoaded(true)
                })
        }
    }, [tempAccount]);

    async function loadLabeledImages() {
        if (!tempAccount) {
            return null;
        }
        const descriptions = [];
        let img;
        try {
            const response = await axios.get(`${config.API_HOST}/api/getImage/${tempAccount.imgUtilisateur}`, {
                responseType: 'arraybuffer',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            });

            // Créez un objet Blob à partir du tableau d'octets
            const blob = new Blob([response.data]);
            // const imageURL = URL.createObjectURL(blob);
            //setImageURL(imageURL);
            // Utilisez la fonction bufferToImage avec le Blob créé
            img = await faceapi.bufferToImage(blob);

        } catch (error) {
            console.error("Erreur lors du chargement de l'image :", error);
            setError("Impossible de charger votre photo ! Veuillez vous connecter avec votre mot de passe");
            return;
        }


        const detections = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (detections) {
            descriptions.push(detections.descriptor);
        }
        const label = String(tempAccount.pseudoUtilisateur)
        return new faceapi.LabeledFaceDescriptors(label, descriptions);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    //axios maka anle data user
    const valid = async () => {
        if (!formData.pseudoUtilisateur) {
            setError("Les champs ne doivent pas être vides !");
            return;
        }
        console.log(formData.pseudoUtilisateur)
        try {
            const response = await axios.post(`${config.API_HOST}/api/faceAuth`, JSON.stringify(formData),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                },
            );
            console.log(response.data.user)
            setTempAccount(response.data.user);
            setToken(response.data.token);
        } catch (error) {
            setError("Le nom d'utilisateur est incorrecte !");
        }
    };
    const handleCloseErrorModal = () => {
        setError(null);
    }

    useEffect(() => {
        if (localStorage.getItem('token') !== null && localStorage.getItem('userSession') !== null) {
            navigate('/accueil');
        }
    }, [])

    useEffect(() => {
        document.title = 'ENI Novice | Authentification'
    })

    return (
        <div className="flex flex-col min-h-screen bg-[#ddd]">
            <div className="flex items-center justify-center flex-grow">
                <div className='relative md:w-[40%] sm:w-[40%]'>
                    <p className="absolute flex items-center mt-10 text-[#323232] text- xl:text-4xl sm:block xs:block backdrop-blur-lg">Découvrez la technologie differemment.</p>
                    <div className={`relative xl:w-[100%] lg:w-[100%] md:w-[100%] sm:block xs:block`}>
                        <Lottie
                            animationData={LoginAnimation}
                            loop={true}
                            autoplay={true}
                            className="w-full h-auto"
                        />
                    </div>
                    <p className="absolute flex items-center -mt-20 text-[#323232] xl:text-4xl sm:block backdrop-blur-lg">Au delà de votre imagination.</p>
                </div>
                <div className="space-y-3">
                    <div className="relative w-full max-w-md p-8 border border-gray-200 rounded md:bg-white md:bg-opacity-80 sm:bg-white backdrop-blur-lg md:w-auto">
                        <h2 className="text-3xl font-bold text-[#323232] mb-4">Connectez-vous</h2>
                        <hr className="border-t border-[#323232] border-opacity-50 mb-2" />
                        <form>
                            <div className="mb-4">
                                <label htmlFor="email" className="text-[#323232] block mb-1">Nom d&#39;utilisateur</label>
                                <input
                                    className="w-full px-4 py-2 bg-opacity-50 rounded bg-slate-300 focus:outline-none focus:bg-opacity-80"
                                    name="pseudoUtilisateur"
                                    id="email"
                                    type="text"
                                    value={formData.pseudoUtilisateur}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button
                                onClick={valid}
                                type="button"
                                className="bg-[#007a55] w-full bg-opacity-60 hover:bg-opacity-80 text-white py-2 px-4 rounded focus:outline-none text-lg font-medium"
                            >Suivant</button>
                            <div className="w-full mb-4">
                                <div className="relative flex flex-col items-center">

                                    <video
                                        muted
                                        autoPlay
                                        ref={videoRef}
                                        height={videoHeight}
                                        width={videoWidth}
                                        onPlay={scanFace}
                                        style={{
                                            objectFit: "fill",
                                            height: "360px",
                                            borderRadius: "10px",
                                            display: localUserStream ? "block" : "none",
                                        }}
                                    />
                                    <canvas
                                        ref={canvasRef}
                                        style={{
                                            position: "absolute",
                                            width: videoWidth, height: videoHeight,
                                            display: localUserStream ? "block" : "none",
                                        }}
                                    />
                                </div>
                            </div>
                            {localUserStream && loginResult === "SUCCESS" && (
                                <h2 className="text-sm font-extrabold tracking-tight text-center text-gray-900">
                                    <span className="block mt-2 text-indigo-600">
                                        Votre visage a bien été reconnu !
                                    </span>
                                    <span className="block mt-2 text-indigo-600">
                                        Rester pendant {counter} quelques secondes
                                    </span>
                                </h2>
                            )}
                            {!localUserStream && (
                                <>
                                    {modelsLoaded && tempAccount ? (
                                        <>
                                            <button
                                                onClick={getLocalUserVideo}
                                                type="button"
                                                className="flex justify-center items-center w-full py-2.5 px-5 mr-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg border border-gray-200"
                                            >
                                                Scanner
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            {/* <button
                                            disabled
                                            type="button"
                                            className="cursor-not-allowed flex justify-center items-center w-full py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 inline-flex items-center"
                                        >
                                            <svg
                                                aria-hidden="true"
                                                role="status"
                                                className="inline w-4 h-4 mr-2 text-gray-200 animate-spin"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="#1C64F2"
                                                />
                                            </svg>
                                            Veuillez patienter pendant le chargement des modèles...
                                        </button> */}
                                        </>
                                    )}
                                </>
                            )}
                        </form>
                        <p className="mt-4 text-[#323232]">Vous n&#39;avez pas de compte ? <Link to="/sign-up" className="text-[#007a55] hover:text-emerald-700">Inscrivez-vous</Link></p>
                    </div>
                    <div className="w-full py-2 flex justify-center">
                        <Link
                            className="bg-[#007a55] bg-opacity-60 hover:bg-opacity-80 text-white py-2 px-4 rounded focus:outline-none text-lg font-medium" to={'/login'}
                        >
                            Authentification
                        </Link>
                    </div>
                </div>
                <ErrorModal isOpen={error !== null} onClose={handleCloseErrorModal} titleMessage="Message d'erreur">
                    {error}
                </ErrorModal>
                {showToast && (
                    <Toast message="Vous êtes bien connecté(e) !" />
                )}
            </div>
            <Footer textColor="#323232" copyright="&copy; < Minds Merge /> - 2024" />
        </div >
    );
}

export default FaceAuthentification;
