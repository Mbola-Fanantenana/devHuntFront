import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profil = ({ userId }) => {
  const [user, setUser] = useState({
    nomUtilisateur: '',
    prenomUtilisateur: '',
    adresseUtilisateur: '',
    telUtilisateur: '',
    niveauUtilisateur: '',
    matriculeUtilisateur: '',
    pseudoUtilisateur: '',
    emailUtilisateur: '',
    imgUtilisateur: '',
    mdpUtilisateur: '',
  });

  useEffect(() => {
    // Charger les informations de l'utilisateur à partir de l'API
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données utilisateur', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = async () => {
    try {
      // Effectuer la mise à jour à partir de l'API
      await axios.put(`/api/updateUser/${userId}`, user);
      // Mettre à jour l'état local ou rediriger vers la page du profil
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 overflow-hidden bg-white rounded-md shadow-md profil-container">
      <h2 className="mb-4 text-2xl font-bold">Mon Profil</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-600">Nom :</label>
          <input
            type="text"
            name="nomUtilisateur"
            value={user.nomUtilisateur}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Prénom :</label>
          <input
            type="text"
            name="prenomUtilisateur"
            value={user.prenomUtilisateur}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Adresse :</label>
          <input
            type="text"
            name="adresseUtilisateur"
            value={user.adresseUtilisateur}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Téléphone :</label>
          <input
            type="text"
            name="telUtilisateur"
            value={user.telUtilisateur}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Niveau :</label>
          <input
            type="text"
            name="niveauUtilisateur"
            value={user.niveauUtilisateur}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Matricule :</label>
          <input
            type="text"
            name="matriculeUtilisateur"
            value={user.matriculeUtilisateur}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Pseudo :</label>
          <input
            type="text"
            name="pseudoUtilisateur"
            value={user.pseudoUtilisateur}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Email :</label>
          <input
            type="text"
            name="emailUtilisateur"
            value={user.emailUtilisateur}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Ajoutez d'autres champs ici avec le même format */}
        
        <button
          type="button"
          onClick={handleUpdateUser}
          className="px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default Profil;
