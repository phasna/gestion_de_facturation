import React, { useState, useEffect } from 'react';
import { FaDownload, FaEllipsisV, FaEye, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ClientCard = ({ client }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            className="bg-gray-200 p-4 rounded shadow flex flex-col items-start justify-between cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center mb-3">
                <FaUser className="text-blue-500 mr-5" />
                {client.nom} {client.prenom} {/* Afficher nom et prénom */}
            </div>
            <motion.div
                className="flex flex-col space-y-3"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex space-x-7 mb-3">
                    <FaEye className="text-gray-600 cursor-pointer hover:text-blue-500" title="Voir" />
                    <button className="text-sm border-2 rounded-full border-black px-5 py-1 hover:bg-black hover:text-white">Envoyer</button>
                    <FaDownload className="text-gray-600 cursor-pointer hover:text-green-500" title="Télécharger" />
                    <FaEllipsisV className="text-gray-600 cursor-pointer hover:text-gray-900" title="Options" />
                </div>
                <div className="p-4 bg-gray-100 rounded mt-2">
                    <p>Détails supplémentaires pour {client.nom}. Cette section est affichée lorsque la carte est ouverte.</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ListeClients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/factures/clients/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des clients');
                }
                return response.json();
            })
            .then(data => {
                console.log("Données reçues :", data);
                setClients(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    console.log("Clients dans le state :", clients);  // Ajoute ceci pour vérifier que les clients sont stockés dans le state

    if (loading) {
        return <div>Chargement des clients...</div>;
    }

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return (
        <div>
            <h1 className="text-5xl mb-4 text-black my-10 text-center">Liste des Clients</h1>
            <div className="space-y-5">
                {clients.map((client) => (
                    <ClientCard key={client.id} client={client} />
                ))}
            </div>
        </div>
    );
};


export default ListeClients;
