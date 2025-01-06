import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSearch, FaPlusCircle, FaTimesCircle } from 'react-icons/fa';

const AddFacturation = () => {
    const [clients, setClients] = useState([]);
    const [prestations, setPrestations] = useState([]);
    const [facturePrestations, setFacturePrestations] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showNewPrestationForm, setShowNewPrestationForm] = useState(false);
    const [newPrestation, setNewPrestation] = useState({ nom: '', prix: '' });

    // Charger les clients et prestations au montage
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/clients-with-details/');
                setClients(response.data);
            } catch (error) {
                console.error('Erreur de chargement des clients :', error);
            }
        };

        const fetchPrestations = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/prestations/');
                setPrestations(response.data);
            } catch (error) {
                console.error('Erreur de chargement des prestations :', error);
            }
        };

        fetchClients();
        fetchPrestations();
    }, []);

    // Ajouter une facture
    const handleAddFacture = async () => {
        if (!selectedClient || facturePrestations.length === 0) {
            alert('Veuillez sélectionner un client et ajouter au moins une prestation.');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/factures/add/', {
                client: selectedClient,
                prestations: facturePrestations,
            });

            // Mettre à jour le client avec le nouveau statut
            const updatedClient = response.data.client;
            setClients((prevClients) =>
                prevClients.map((client) =>
                    client.id === updatedClient.id ? updatedClient : client
                )
            );

            alert('Facture créée avec succès');
            setFacturePrestations([]);
            setSelectedClient('');
        } catch (error) {
            console.error('Erreur lors de la création de la facture :', error.response?.data || error.message);
            alert('Erreur lors de la création de la facture.');
        }
    };

    // Ajouter une prestation à la facture
    const handleAddPrestationToFacture = (prestation) => {
        if (!prestation) return;
        setFacturePrestations([...facturePrestations, { id: prestation.id, quantite: 1 }]);
    };

    // Ajouter une nouvelle prestation
    const handleAddNewPrestation = async () => {
        if (!newPrestation.nom || !newPrestation.prix) {
            alert('Veuillez remplir tous les champs de la prestation.');
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/add-prestation/', newPrestation);
            setPrestations([...prestations, response.data]);
            setNewPrestation({ nom: '', prix: '' });
            setShowNewPrestationForm(false);
            alert('Prestation ajoutée avec succès');
        } catch (error) {
            console.error("Erreur lors de l'ajout de la prestation :", error);
        }
    };

    // Annuler et réinitialiser
    const handleCancel = () => {
        setFacturePrestations([]);
        setSelectedClient('');
        setNewPrestation({ nom: '', prix: '' });
        setShowNewPrestationForm(false);
    };

    // Filtrer les clients
    const filteredClients = clients.filter((client) =>
        `${client.nom} ${client.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div className="container mx-auto max-w-full p-10 bg-white min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-center mb-10 text-white"
            >
                Créer une Facture
            </motion.h2>

            <motion.form
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-8 bg-white p-10 rounded-lg shadow-lg"
            >
                {/* Recherche client */}
                <div className="relative w-1/3">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Rechercher un client..."
                        className="w-full border-2 bg-white text-gray-800 rounded-full pl-10 pr-4 py-2 focus:outline-none"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <FaSearch />
                    </div>
                </div>

                {/* Sélection client */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                    <select
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Sélectionner un client</option>
                        {filteredClients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.nom} {client.prenom}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sélection prestation */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prestations</label>
                    <select
                        onChange={(e) =>
                            handleAddPrestationToFacture(prestations.find((p) => p.id === parseInt(e.target.value)))
                        }
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Sélectionner une prestation</option>
                        {prestations.map((prestation) => (
                            <option key={prestation.id} value={prestation.id}>
                                {prestation.nom} - {prestation.prix} €
                            </option>
                        ))}
                    </select>
                </div>

                {/* Prestations ajoutées */}
                {facturePrestations.length > 0 && (
                    <div>
                        <h3 className="text-lg font-bold mb-4">Prestations ajoutées à la facture :</h3>
                        <ul>
                            {facturePrestations.map((p, index) => {
                                const prestation = prestations.find((prest) => prest.id === p.id);
                                return (
                                    <li key={index} className="mb-2">
                                        {prestation?.nom} - {prestation?.prix} € (Quantité: {p.quantite})
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {/* Ajouter une nouvelle prestation */}
                <div>
                    <button
                        type="button"
                        onClick={() => setShowNewPrestationForm(!showNewPrestationForm)}
                        className="flex items-center justify-center px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
                    >
                        <FaPlusCircle className="mr-2" />
                        Ajouter une prestation
                    </button>

                    {showNewPrestationForm && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la prestation</label>
                            <input
                                type="text"
                                value={newPrestation.nom}
                                onChange={(e) => setNewPrestation({ ...newPrestation, nom: e.target.value })}
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <label className="block text-sm font-medium text-gray-700 mt-4">Prix</label>
                            <input
                                type="number"
                                value={newPrestation.prix}
                                onChange={(e) => setNewPrestation({ ...newPrestation, prix: e.target.value })}
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <button
                                type="button"
                                onClick={handleAddNewPrestation}
                                className="mt-4 px-4 py-2 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600"
                            >
                                Enregistrer la prestation
                            </button>
                        </div>
                    )}
                </div>

                {/* Boutons */}
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={handleAddFacture}
                        className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600"
                    >
                        Enregistrer la facture
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600"
                    >
                        Annuler
                    </button>
                </div>
            </motion.form>
        </motion.div>
    );
};

export default AddFacturation;
