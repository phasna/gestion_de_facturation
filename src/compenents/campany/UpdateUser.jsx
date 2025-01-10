import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

const UpdateUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { clientId } = location.state || {};
    const [clients, setClients] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState(clientId || '');
    const [client, setClient] = useState({}); // Initialise un objet vide
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [image, setImage] = useState(null); // État pour gérer l'image

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    useEffect(() => {
        const fetchClients = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://100.107.164.18:8000/api/clients/');
                setClients(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des clients :', error);
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, []);

    useEffect(() => {
        if (selectedClientId) {
            const fetchClient = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`http://100.107.164.18:8000/api/clients/${selectedClientId}/`);
                    setClient(response.data);
                } catch (error) {
                    console.error('Erreur lors de la récupération du client :', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchClient();
        }
    }, [selectedClientId]);

    const handleUpdate = async (updatedClient) => {
        try {
            setLoading(true);
            await axios.put(`http://100.107.164.18:8000/api/clients/${selectedClientId}/update/`, updatedClient);
            setFeedback('Client mis à jour avec succès !');
            navigate('/liste_clients');
        } catch (error) {
            console.error('Erreur lors de la mise à jour :', error);
            setFeedback('Échec de la mise à jour. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
            try {
                setLoading(true);
                await axios.delete(`http://100.107.164.18:8000/api/clients/${selectedClientId}/delete/`);
                setFeedback('Client supprimé avec succès.');
                navigate('/liste_clients');
            } catch (error) {
                console.error('Erreur lors de la suppression :', error);
                setFeedback('Échec de la suppression. Veuillez réessayer.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <motion.div className="container mx-auto p-10 min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <motion.h1 className="text-4xl font-bold text-center text-white mb-8">
                Gestion des Clients
            </motion.h1>

            {loading && <div className="text-center text-white">Chargement...</div>}

            {feedback && <div className="text-center text-white mb-4">{feedback}</div>}

            <div className="mb-5">
                <label className="block mb-1 text-white">Sélectionnez un Client :</label>
                <div className="relative w-full">
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

            <motion.form
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                className="p-10 bg-white rounded-lg shadow-lg"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate(client);
                }}
            >
                <h2 className="text-xl font-bold mb-4">Modifier les Informations</h2>
                <div className="grid grid-cols-1 gap-4 my-5">
                    {[
                        {label: 'Nom', key: 'nom'},
                        {label: 'Adresse', key: 'adresse'},
                        {label: 'Téléphone', key: 'tel_mobile'},
                        {label: 'Email', key: 'email'},
                        {label: 'Ville', key: 'ville'},
                        {label: 'SIRET', key: 'siret'},
                    ].map(({label, key}) => (
                        <div key={key}>
                            <label className="block mb-1">{label}</label>
                            <input
                                type="text"
                                value={client[key] || ''}
                                onChange={(e) => setClient({...client, [key]: e.target.value})}
                                className="border p-2 w-full rounded-lg"
                                required
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <label htmlFor="image" className="my-5">
                        Ajouter un profile
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full cursor-pointer text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {image && (
                        <p className="mt-2 text-sm text-gray-600">
                            Fichier sélectionné : <span className="font-medium">{image.name}</span>
                        </p>
                    )}
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded mr-4 transition-transform transform hover:scale-105"
                    >
                        Sauvegarder
                    </button>
                    <button
                        type="button"
                        className="bg-red-500 text-white py-2 px-4 rounded transition-transform transform hover:scale-105"
                        onClick={handleDelete}
                    >
                        Supprimer
                    </button>
                </div>
            </motion.form>
        </motion.div>
    );
};

export default UpdateUser;
