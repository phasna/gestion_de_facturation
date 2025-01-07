import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa'; // Conserve les icônes
import { motion } from 'framer-motion'; // Conserve les animations

const UpdateUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { clientId } = location.state || {}; // ID client si navigation depuis Liste_clients.jsx
    const [clients, setClients] = useState([]); // Liste des clients pour le menu déroulant
    const [selectedClientId, setSelectedClientId] = useState(clientId || '');
    const [client, setClient] = useState(null); // Détails du client pour édition

    // Récupère tous les clients pour le menu déroulant
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://100.107.164.18:8000/api/clients/');
                setClients(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des clients :', error);
            }
        };
        fetchClients();
    }, []);

    // Récupère les détails d'un client spécifique si un ID est sélectionné
    useEffect(() => {
        if (selectedClientId) {
            const fetchClient = async () => {
                try {
                    const response = await axios.get(`http://100.107.164.18:8000/api/clients/${selectedClientId}/`);
                    setClient(response.data);
                } catch (error) {
                    console.error('Erreur lors de la récupération des données du client :', error);
                }
            };
            fetchClient();
        }
    }, [selectedClientId]);

    // Met à jour les informations du client
    const handleUpdate = async (updatedClient) => {
        try {
            await axios.put(
                `http://100.107.164.18:8000/api/clients/${selectedClientId}/update/`,
                updatedClient,
                {
                    headers: {
                        'X-CSRFToken': getCsrfToken(), // Facultatif si @csrf_exempt est utilisé
                    },
                }
            );
            alert('Client mis à jour avec succès !');
            navigate('/liste_clients'); // Retour à la liste après mise à jour
        } catch (error) {
            console.error('Erreur lors de la mise à jour :', error);
        }
    };

    // Supprime un client
    const handleDelete = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
            try {
                await axios.delete(`http://100.107.164.18:8000/api/clients/${selectedClientId}/delete/`, {
                    headers: {
                        'X-CSRFToken': getCsrfToken(), // Optionnel si CSRF activé
                    },
                });
                alert('Client supprimé avec succès');
                navigate('/liste_clients'); // Redirige après suppression
            } catch (error) {
                console.error('Erreur lors de la suppression du client :', error);
            }
        }
    };

    // Fonction utilitaire pour récupérer le CSRF token
    const getCsrfToken = () => {
        const csrfCookie = document.cookie
            .split('; ')
            .find((row) => row.startsWith('csrftoken='));
        return csrfCookie ? csrfCookie.split('=')[1] : '';
    };

    return (
        <motion.div
            className="container mx-auto p-10 min-h-screen bg-gradient-to-r from-blue-500 to-purple-600"
        >
            <motion.h1
                className="text-4xl font-bold text-center text-white"
            >
                Gestion des Clients
            </motion.h1>

            {!selectedClientId && (
                <div className="mb-5">
                    <label className="block mb-1 text-white">Sélectionnez un Client:</label>
                    <div className="relative w-full mb-5">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <select
                            value={selectedClientId}
                            onChange={(e) => setSelectedClientId(e.target.value)}
                            className="w-full border-2 bg-white text-gray-800 rounded-full pl-10 pr-4 py-2"
                        >
                            <option value="">-- Sélectionnez un client --</option>
                            {clients.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.nom} {c.prenom}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            {client && (
                <motion.form
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-10 bg-white rounded-lg shadow-lg"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdate(client);
                    }}
                >
                    <h2 className="text-xl font-bold mb-4">Modifier les Informations</h2>

                    <label className="block mb-1">Nom</label>
                    <input
                        type="text"
                        value={client.nom}
                        onChange={(e) => setClient({ ...client, nom: e.target.value })}
                        className="border p-2 w-full mb-2 rounded-lg"
                        required
                    />

                    <label className="block mb-1">Adresse</label>
                    <input
                        type="text"
                        value={client.adresse}
                        onChange={(e) => setClient({ ...client, adresse: e.target.value })}
                        className="border p-2 w-full mb-2 rounded-lg"
                        required
                    />

                    <label className="block mb-1">Téléphone</label>
                    <input
                        type="text"
                        value={client.tel_mobile}
                        onChange={(e) => setClient({ ...client, tel_mobile: e.target.value })}
                        className="border p-2 w-full mb-2 rounded-lg"
                        required
                    />

                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        value={client.email}
                        onChange={(e) => setClient({ ...client, email: e.target.value })}
                        className="border p-2 w-full mb-2 rounded-lg"
                        required
                    />

                    <label className="block mb-1">Ville</label>
                    <input
                        type="text"
                        value={client.ville}
                        onChange={(e) => setClient({ ...client, ville: e.target.value })}
                        className="border p-2 w-full mb-2 rounded-lg"
                        required
                    />

                    <label className="block mb-1">SIRET</label>
                    <input
                        type="text"
                        value={client.siret}
                        onChange={(e) => setClient({ ...client, siret: e.target.value })}
                        className="border p-2 w-full mb-2 rounded-lg"
                        required
                    />

                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mr-4">
                        Sauvegarder
                    </button>

                    <button
                        type="button"
                        className="bg-red-500 text-white py-2 px-4 rounded"
                        onClick={handleDelete}
                    >
                        Supprimer
                    </button>
                </motion.form>
            )}
        </motion.div>
    );
};

export default UpdateUser;
