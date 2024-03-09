import { useEffect } from "react";
import img from '../assets/Image/40eme.jpg'
import basket from '../assets/Image/anniv.jpg'
import prof from '../assets/Image/glo.jpg'
import ecole from '../assets/Image/ecole.jpg'

const Responsable = () => {
  const features = [
    { name: "Administration", description: "Mr MAHATODY Thomas, Professeur - Directeur de L'Ecole Nationale d'Informatique" },
    {
      name: "Mention",
      description:
        "Mr DIMBISOA William Germain, Maître de Conférences, Responsable Mention IA - Mr RABETAFIKA Louis Haja, Maître de Conférences , Responsable Mention",
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
        "Mr Guillante Gesazafy, Enseignant chercheur, Responsable parcours IG - Mr RALAIVAO Christian, Enseignant chercheur Responsable parcours GB - Mr Siaka Responsable parcours SR",
    },
  ];

  useEffect(() => {
    document.title = 'ENI Novice | Responsable'
  })

  return (
    <div className="flex-1 h-[520px] overflow-auto no-scrollbar m-2 bg-white bg-opacity-25 rounded-lg shadow-lg backdrop-blur-md">
      <div className="grid w-full max-w-2xl grid-cols-1 px-4 mx-auto gap-x-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div className="w-full">
          <h2 className="text-3xl font-bold tracking-tight text-[#007a55] sm:text-4xl">
            Services existants à l&#39;ENI
          </h2>

          <dl className="grid grid-cols-1 mt-8 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="p-4 pt-4 bg-white border-t border-gray-200 rounded shadow">
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
            src={basket}
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            className="bg-gray-100 rounded-lg w-[300px] h-[300px]"
          />
          <img
            src={img}
            alt="Side of walnut card tray with card groove and recessed card area."
            className="bg-gray-100 rounded-lg w-[300px] h-[300px]"
          />
          <img
            src={ecole}
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="bg-gray-100 rounded-lg w-[300px] h-[300px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Responsable;
