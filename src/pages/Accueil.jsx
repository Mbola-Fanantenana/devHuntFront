/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import image1 from '../assets/Image/1.jpg'
import image2 from '../assets/Image/2.jpg'
import image3 from '../assets/Image/3.jpg'
import image4 from '../assets/Image/4.jpg'
import image5 from '../assets/Image/5.jpg'

const Accueil = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [image1, image2, image3, image4, image5];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  return (
    <>
      <div className="flex px-4 space-x-4">
        <div className="w-[70%] bg-white bg-opacity-25 backdrop-blur-md shadow-lg rounded-lg">
          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <img
                className="w-full h-auto transition-opacity duration-500"
                src={images[currentSlide]}
                alt={`Slide ${currentSlide + 1}`}
              />
            </div>
            <button
              className="absolute top-1/2 left-4 w-auto bg-white bg-opacity-50 rounded-full transform -translate-y-1/2 focus:outline-none"
              onClick={prevSlide}
            >
              <svg width="40px" height="40px" className="p-2 flex justify-center items-center" viewBox="-5.5 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" xmlns: sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>chevron-left</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch: type="MSPage"> <g id="Icon-Set-Filled" sketch: type="MSLayerGroup" transform="translate(-423.000000, -1196.000000)" fill="#fff"> <path d="M428.115,1209 L437.371,1200.6 C438.202,1199.77 438.202,1198.43 437.371,1197.6 C436.541,1196.76 435.194,1196.76 434.363,1197.6 L423.596,1207.36 C423.146,1207.81 422.948,1208.41 422.985,1209 C422.948,1209.59 423.146,1210.19 423.596,1210.64 L434.363,1220.4 C435.194,1221.24 436.541,1221.24 437.371,1220.4 C438.202,1219.57 438.202,1218.23 437.371,1217.4 L428.115,1209" id="chevron-left" sketch: type="MSShapeGroup"> </path> </g> </g> </g></svg>
            </button>
            <button
              className="absolute top-1/2 right-4 bg-white w-auto bg-opacity-50 rounded-full transform -translate-y-1/2 focus:outline-none"
              onClick={nextSlide}
            >
              <svg width="40px" height="40px" className="p-2 justify-center items-center" viewBox="-5.5 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" xmlns: sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>chevron-left</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch: type="MSPage"> <g id="Icon-Set-Filled" sketch: type="MSLayerGroup" transform="translate(-423.000000, -1196.000000)" fill="#fff"> <path d="M428.115,1209 L437.371,1200.6 C438.202,1199.77 438.202,1198.43 437.371,1197.6 C436.541,1196.76 435.194,1196.76 434.363,1197.6 L423.596,1207.36 C423.146,1207.81 422.948,1208.41 422.985,1209 C422.948,1209.59 423.146,1210.19 423.596,1210.64 L434.363,1220.4 C435.194,1221.24 436.541,1221.24 437.371,1220.4 C438.202,1219.57 438.202,1218.23 437.371,1217.4 L428.115,1209" id="chevron-left" sketch: type="MSShapeGroup"> </path> </g> </g> </g></svg>
            </button>
          </div>
        </div>
        <div className="p-4 w-[30%] bg-white bg-opacity-25 backdrop-blur-md shadow-lg rounded-lg">
          <h1 className="font-medium text-lg">À propos de l&#39;ENI</h1>
          <hr className="w-[55%] border-[#323232]" />
          <p className="text-justify">« L’ENI était l’unique école d’informatique en Afrique au début des années 1980. Depuis, nous associons la formation théorique en salle aux stages obligatoires en entreprise à chaque niveau d’étude du parcours »</p>
          <p className="text-end">~ Thomas Mahatody ~</p>
          <h1 className="font-medium text-lg">Parcours</h1>
          <hr className="w-[30%] border-[#323232]" />
          <ul>
            <li>- Génie logiciel et Base de Données</li>
            <li>- Administration des Systèmes et des Réseaux</li>
            <li>- Informatique Générale</li>
            <li>- Intelligence Artificielle</li>
            <li>- Objet Connecté et Cybersécurité</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Accueil;
