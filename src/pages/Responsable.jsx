import React from "react";
import img from '../assets/Image/novice.jpg'
import reception from '../assets/Image/reception.jpg'
import prof from '../assets/Image/prof.jpg'
import rentree from '../assets/Image/rentree.jpg'

const Responsable = () => {
  const features = [
    { name: "Administration", description: "Professeur MAHATODY Thomas - Directeur de L'Ecole Nationale d'Informatique" },
    {
      name: "Mention",
      description:
        "Dr DIMBISOA William Germain, Responsable Mention IA - Maitre de Conférence RABETAFIKA Louis Haja, Responsable Mention",
    },
    { name: "Scolarité", description: 'Md RABEMANANJARA Laura' },
    {
      name: "Sécutité",
      description: "Mr Christophe",
    },
    { name: "Bibliothèque", description: "Mm Olga" },
    {
      name: "Responsable Parcours",
      description:
        "Mr Guillante Gesazafy, Responsable parcours IG - Mr RALAIVAO Christian Responsable parcours GB - Mr Siaka Responsable parcours SR",
    },
  ];

  return (
    <div className="flex-1 p-4 m-2 bg-white bg-opacity-25 rounded-lg shadow-lg backdrop-blur-md">
      <div className="grid w-full max-w-2xl grid-cols-1 px-4 mx-auto gap-x-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div className="w-full">
          <h2 className="text-3xl font-bold tracking-tight text-[#007a55] sm:text-4xl">
            Services existants à l&#39;ENI
          </h2>

          <dl className="grid grid-cols-1 mt-16 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="pt-4 border-t border-gray-200">
                <dt className="font-semibold text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            src={prof}
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            className="bg-gray-100 rounded-lg w-[300px] h-[300px]"
          />
          <img
            src={reception}
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            className="bg-gray-100 rounded-lg w-[300px] h-[300px]"
          />
          <img
            src={img}
            alt="Side of walnut card tray with card groove and recessed card area."
            className="bg-gray-100 rounded-lg w-[300px] h-[300px]"
          />
          <img
            src={rentree}
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="bg-gray-100 rounded-lg w-[300px] h-[300px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Responsable;
