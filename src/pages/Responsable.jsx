import React from "react";

const Responsable = () => {
  const features = [
    { name: "Administration", description: "Professeur MAHATODY Thomas" },
    {
      name: "Mention",
      description:
        "Dr DIMBISOA William Germain - Maitre de Conférence RABETAFIKA Louis Haja",
    },
    { name: "Scolarité", description: '' },
    {
      name: "Sécutité",
      description: "Mr Christophe",
    },
    { name: "Bibliothèque", description: "Mm Olga" },
    {
      name: "Parcours",
      description:
        "Mr Guillante Gesazafy - Mr RALAIVAO Christian - Mr Siaka",
    },
  ];

  return (
    <div className="flex-1 p-4 m-2 bg-white bg-opacity-25 rounded-lg shadow-lg backdrop-blur-md">
      <div className="grid w-full items-center max-w-2xl grid-cols-1 px-4 py-24 mx-auto gap-x-8 gap-y-16 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div className="w-full">
          <h2 className="text-3xl font-bold tracking-tight text-[#007a55] sm:text-4xl">
            Services existants à l&#39;ENI
          </h2>
          <p className="mt-4 text-gray-500">
            The walnut wood card tray is precision milled to perfectly fit a
            stack of Focus cards. The powder coated steel divider separates
            active cards from new ones, or can be used to archive important task
            lists.
          </p>

          <dl className="grid grid-cols-1 mt-16 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="pt-4 border-t border-gray-200">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            className="bg-gray-100 rounded-lg"
          />
          <img
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            className="bg-gray-100 rounded-lg"
          />
          <img
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
            alt="Side of walnut card tray with card groove and recessed card area."
            className="bg-gray-100 rounded-lg"
          />
          <img
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="bg-gray-100 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Responsable;
