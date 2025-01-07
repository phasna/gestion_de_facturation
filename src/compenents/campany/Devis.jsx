import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTimesCircle } from 'react-icons/fa';
import { IoIosSave } from "react-icons/io";
import axios from 'axios';

const Devis = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [clients, setClients] = useState([]);
    const [prestations, setPrestations] = useState([]);
    const [devisPrestations, setDevisPrestations] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [selectedPrestation, setSelectedPrestation] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [devisList, setDevisList] = useState([]);

    // Charger les données des clients, prestations, et devis
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clientsRes, prestationsRes, devisRes] = await Promise.all([
                    axios.get('http://100.107.164.18:8000/api/clients/'),
                    axios.get('http://100.107.164.18:8000/api/prestations/'),
                    axios.get('http://100.107.164.18:8000/api/devis/')
                ]);
                setClients(clientsRes.data);
                setPrestations(prestationsRes.data);
                setDevisList(devisRes.data);
            } catch (error) {
                console.error('Erreur lors du chargement des données :', error);
                alert('Erreur lors du chargement des données, veuillez vérifier votre serveur.');
            }
        };

        fetchData();
    }, []);

    // Ajouter une prestation au devis
    const handleAddPrestationToDevis = () => {
        if (!selectedPrestation) return;

        const prestation = prestations.find(p => p.nom === selectedPrestation);
        if (prestation) {
            setDevisPrestations([
                ...devisPrestations,
                { id: prestation.id, nom: prestation.nom, prix: prestation.prix, quantite: 1 }
            ]);
            setSelectedPrestation('');
        }
    };

    // Supprimer une prestation
    const handleRemovePrestation = (index) => {
        setDevisPrestations(devisPrestations.filter((_, i) => i !== index));
    };

    // Enregistrer un devis
    const handleSaveDevis = async () => {
        if (!selectedClient || devisPrestations.length === 0) {
            alert('Veuillez sélectionner un client et ajouter au moins une prestation.');
            return;
        }

        try {
            const payload = {
                client: selectedClient,
                prestations: devisPrestations,
            };
            const response = await axios.post('http://100.107.164.18:8000/api/devis/add/', payload);
            alert('Devis enregistré avec succès !');
            setSelectedClient('');
            setDevisPrestations([]);
            setDevisList([...devisList, response.data]); // Ajout du nouveau devis
        } catch (error) {
            console.error('Erreur lors de la création du devis :', error.response?.data || error.message);
            alert('Erreur lors de l\'enregistrement du devis : ' + (error.response?.data?.error || error.message));
        }
    };

    // Valider un devis
    const handleValidateDevis = async (devisId) => {
        try {
            await axios.post(`http://100.107.164.18:8000/api/devis/${devisId}/validate/`);
            const updatedDevisList = devisList.map(devis =>
                devis.id === devisId ? { ...devis, validé: true } : devis
            );
            setDevisList(updatedDevisList);
            alert('Le devis a été validé avec succès et converti en facture.');
        } catch (error) {
            console.error('Erreur lors de la validation du devis :', error);
            alert('Une erreur est survenue lors de la validation du devis.');
        }
    };

    // Filtrer les clients par le terme de recherche
    const filteredClients = clients.filter(client =>
        client.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div
            className="container mx-auto max-w-full p-10 bg-white min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <motion.h2
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
                className="text-4xl font-bold text-center mb-10 text-white"
            >
                Créer un Devis
            </motion.h2>

            {/* Formulaire de création de devis */}
            <motion.form
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
                className="space-y-8 bg-white p-10 rounded-lg shadow-lg"
            >
                <div className="relative w-1/3">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setIsOpen(e.target.value.length > 0);
                        }}
                        placeholder="Rechercher un client..."
                        className="w-full border-2 bg-white text-gray-800 rounded-full pl-10 pr-4 py-2 focus:outline-none"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <FaSearch/>
                    </div>

                    {isOpen && filteredClients.length > 0 && (
                        <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-60 overflow-auto w-full">
                            {filteredClients.map(client => (
                                <li
                                    key={client.id}
                                    onClick={() => {
                                        setSelectedClient(client.id);
                                        setSearchTerm(`${client.nom} ${client.prenom}`);
                                        setIsOpen(false);
                                    }}
                                    className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                                >
                                    {client.nom} {client.prenom}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Sélection du client */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                    <select
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Sélectionner un client</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>
                                {client.nom} {client.prenom}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sélection des prestations */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prestations</label>
                    <select
                        value={selectedPrestation}
                        onChange={(e) => setSelectedPrestation(e.target.value)}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Sélectionner une prestation</option>
                        {prestations.map(prestation => (
                            <option key={prestation.id} value={prestation.nom}>
                                {prestation.nom} - {prestation.prix}€
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="button"
                    onClick={handleAddPrestationToDevis}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
                >
                    Ajouter prestation au devis
                </button>

                {/* Liste des prestations ajoutées */}
                {devisPrestations.length > 0 && (
                    <div>
                        <h3 className="text-xl font-bold mb-4">Prestations Ajoutées :</h3>
                        {devisPrestations.map((item, index) => (
                            <div key={index} className="flex justify-between items-center border-b py-2">
                                <span>{item.nom} - {item.prix}€</span>
                                <FaTimesCircle onClick={() => handleRemovePrestation(index)}
                                               className="cursor-pointer text-red-500"/>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex justify-end items-center">
                    <button
                        type="button"
                        onClick={handleSaveDevis}
                        className="flex items-center justify-center px-4 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
                    >
                        <IoIosSave className="mr-2"/>
                        Enregistrer le devis
                    </button>
                </div>
            </motion.form>

            {/* Liste des devis */}
            <div className="mt-10">
                <h3 className="text-xl font-bold text-white">Liste des Devis</h3>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    {devisList.map((devis, index) => (
                        <div
                            key={devis.id || index} // Utilisez 'id' comme clé principale et un 'index' comme sauvegarde
                            className="flex justify-between items-center border-b py-2"
                        >
                <span>
                    {devis.client_nom || devis.client_prenom || 'Nom inconnu'} - Total: {devis.total}€
                </span>
                            {!devis.validé && (
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
                                    onClick={() => handleValidateDevis(devis.id)}
                                >
                                    Valider
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </motion.div>
    );
};

export default Devis;
