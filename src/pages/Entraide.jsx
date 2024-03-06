import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";

const Entraide = () => {
  const [entraide, setEntraide] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);

  const initialeState = {
    logoEntraide: "",
    chefEntraide: "",
    detailEntraide: "",
    lienEntraide: "",
  };

  const [formData, setFormData] = useState(initialeState);

  useEffect(() => {
    axios
      .get(`${config.API_HOST}/api/entraides`)
      .then((response) => {
        setEntraide(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;

  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   };

  //   const handleSubmit = () => {
  //     axios
  //       .post(`${config.API_HOST}/api/createEntraide`, JSON.stringify(formData), {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       .then((response) => {
  //         setFormData(initialeState);
  //         setDataChanged(!dataChanged);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };

  //   const handleDelete = (idEntraide) => {
  //     axios.delete()
  //   }

  const people = [
    {
      name: "Leslie Alexander",
      role: "Co-Founder / CEO",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Leslie Alexander",
      role: "Co-Founder / CEO",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Leslie Alexander",
      role: "Co-Founder / CEO",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Leslie Alexander",
      role: "Co-Founder / CEO",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Leslie Alexander",
      role: "Co-Founder / CEO",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Leslie Alexander",
      role: "Co-Founder / CEO",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  return (
    <div>
      <div className="flex-1 p-4 m-2 bg-white bg-opacity-25 backdrop-blur-md shadow-lg rounded-lg">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-[#007a55] sm:text-4xl">
            Meet our leadership
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae
            elementum enim vitae ullamcorper suspendisse.
          </p>
        </div>
      </div>
      <div
        role="list"
        className="grid grid-cols-3 gap-3 bg-white bg-opacity-25 backdrop-blur-md shadow-lg rounded-lg p-4 m-2"
      >
        {people.map((person) => (
          <div key={person.name}>
            <div className="flex items-center gap-x-6 bg-white bg-opacity-25 backdrop-blur-md shadow-lg rounded-lg p-4 m-2">
              <img
                className="w-16 h-16 rounded-full"
                src={person.imageUrl}
                alt=""
              />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-[#50C878]">
                  {person.name}
                </h3>
                <p className="text-sm font-semibold leading-6 text-gray-500">
                  {person.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Entraide;
