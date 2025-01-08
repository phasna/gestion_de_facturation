import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Composant DevisRow
const DevisRow = ({ devis, onDelete, onValidate }) => {
    return (
        <motion.tr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 hover:bg-gray-100 transition duration-300"
        >
            <td className="py-4 px-6">{devis.client_nom}</td>
            <td className="py-4 px-6">{devis.client_prenom}</td>
            <td className="py-4 px-6 text-right">{devis.total} €</td>
            <td className="py-4 px-6 text-center">
                {devis.validé ? (
                    <span className="text-green-500 font-bold">Validé</span>
                ) : (
                    <span className="text-red-500 font-bold">Non validé</span>
                )}
            </td>
            <td className="py-4 px-6 text-center">
                <div className="flex justify-center items-center space-x-4">
                    <button
                        onClick={() => onValidate(devis.id)}
                        className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                    >
                        <FaCheckCircle className="inline mr-2" />
                        Valider
                    </button>
                    <button
                        onClick={() => onDelete(devis.id)}
                        className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                    >
                        <FaTrashAlt className="inline mr-2" />
                        Supprimer
                    </button>
                </div>
            </td>
        </motion.tr>
    );
};

DevisRow.propTypes = {
    devis: PropTypes.shape({
        id: PropTypes.number.isRequired,
        client_nom: PropTypes.string.isRequired,
        client_prenom: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        validé: PropTypes.bool.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onValidate: PropTypes.func.isRequired,
};

// Composant ListeDevis
const ListeDevis = () => {
    const [devis, setDevis] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Pour afficher les erreurs

    // Récupérer les devis depuis l'API
    const fetchDevis = async () => {
        try {
            const response = await axios.get('http://100.107.164.18:8000/api/devis/');
            console.log("Devis récupérés:", response.data); // Vérifiez les données récupérées
            setDevis(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des devis :', error);
            setErrorMessage('Impossible de récupérer la liste des devis.');
        }
    };

    // Supprimer un devis
    const deleteDevis = async (id) => {
        if (!id) {
            alert('ID du devis invalide');
            return;
        }

        try {
            const response = await axios.delete(`http://100.107.164.18:8000/api/devis/${id}/supprimer`);
            console.log("Réponse de l'API après suppression :", response);

            if (response.status === 200) {
                setDevis((prevDevis) => prevDevis.filter((d) => d.id !== id));
                alert('Le devis a été supprimé avec succès.');
            } else {
                alert('Impossible de supprimer le devis.');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du devis :', error.response || error);
            alert('Impossible de supprimer le devis.');
        }
    };


    // Valider un devis
    const validateDevis = async (id) => {
        try {
            await axios.post(`http://100.107.164.18:8000/api/devis/${id}/validate/`);
            alert('Le devis a été validé avec succès.');
            fetchDevis();
        } catch (error) {
            console.error('Erreur lors de la validation du devis :', error);
            alert('Impossible de valider le devis.');
        }
    };

    useEffect(() => {
        fetchDevis();
    }, []);

    return (
        <div className="p-6 min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-black">
            <h1 className="text-5xl text-center font-bold mb-4 text-white">Liste des Devis</h1>

            {/* Afficher un message d'erreur si la récupération échoue */}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            {/* Barre de recherche */}
            <input
                type="text"
                placeholder="Rechercher un devis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-1/3 mb-4 p-2 border border-gray-300 rounded-full"
            />

            {/* Table des devis */}
            <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="py-2 px-4 text-left">Nom</th>
                        <th className="py-2 px-4 text-left">Prénom</th>
                        <th className="py-2 px-4 text-right">Total</th>
                        <th className="py-2 px-4 text-center">Validé</th>
                        <th className="py-2 px-4 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {devis
                        .filter((d) =>
                            `${d.client_nom} ${d.client_prenom}`
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                        )
                        .map((d) => (
                            <DevisRow
                                key={d.id}
                                devis={d}
                                onDelete={deleteDevis}
                                onValidate={validateDevis}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListeDevis;
