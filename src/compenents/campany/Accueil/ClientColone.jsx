import { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { FaBox, FaTrashAlt, FaEuroSign } from 'react-icons/fa'; // Import des icônes
import axios from 'axios';

const ClientColonne = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/historique-clients/');
                setClients(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement des clients récents :', error);
            }
        };

        fetchClients();
    }, []);

    // Tableau de couleurs à appliquer
    const colors = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200'];

   return (
    <div className="p-10 w-full rounded-b-lg">
        <h1 className="text-3xl font-bold text-white mb-6">Historique des Clients Récents</h1>

        {/* Grille de cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client, index) => (
                <div
                    key={index} // Utiliser un index comme clé unique pour chaque client
                    className={`${colors[index % colors.length]} bg-opacity-60 backdrop-blur-lg p-6 rounded-lg shadow-lg`}
                >
                    {/* En-tête avec le nom du client */}
                    <div className="flex items-center mb-4">
                        <CgProfile className="text-black text-2xl mr-3" />
                        <h2 className="text-xl font-bold text-gray-800">
                            {client.client_nom} {client.client_prenom}
                        </h2>
                    </div>

                    {/* Total de la facture */}
                    <p className="text-gray-600 flex items-center mb-4">
                        <span className="font-semibold">Total Facture : </span> {client.total}€
                    </p>

                    {/* Liste des prestations */}
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Prestations :</h3>
                        {client.prestations && client.prestations.length > 0 ? (
                            <ul className="list-disc pl-5 text-gray-600">
                                {client.prestations.map((prestation, idx) => (
                                    <li key={idx}>
                                        <span className="font-semibold">{prestation.service}</span> - {prestation.prix}€
                                        ({prestation.quantite}x)
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">Aucune prestation enregistrée.</p>
                        )}
                    </div>

                    {/* Bouton de suppression */}
                    <div className="flex justify-end items-center">
                        <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                            <FaTrashAlt className="mr-2" />
                            Supprimer
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

};

export default ClientColonne;
