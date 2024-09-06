import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AddFacturation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [prestations, setPrestations] = useState([{ service: '', price: '' }]);
    const [clients, setClients] = useState([]);  // Stocker les clients récupérés
    const [prestationsService, setPrestationsService] = useState([]);  // Stocker les prestations récupérées
    const [selectedClient, setSelectedClient] = useState('');
    const [selectedPrestation, setSelectedPrestation] = useState('');

    // Récupérer la liste des clients depuis l'API
    useEffect(() => {
        fetch('http://127.0.0.1:8000/factures/clients/')
            .then(response => response.json())
            .then(data => setClients(data))
            .catch(error => console.error('Erreur lors de la récupération des clients:', error));
    }, []);

    // Récupérer la liste des prestations depuis l'API
    useEffect(() => {
        fetch('http://127.0.0.1:8000/factures/prestations/')
            .then(response => response.json())
            .then(data => setPrestationsService(data))
            .catch(error => console.error('Erreur lors de la récupération des prestations:', error));
    }, []);

    // Fonction pour ajouter une nouvelle prestation
    const addPrestation = () => {
        setPrestations([...prestations, { service: '', price: '' }]);
    };

    // Fonction pour gérer les changements dans les champs
    const handlePrestationChange = (index, e) => {
        const { name, value } = e.target;
        const newPrestations = [...prestations];
        newPrestations[index][name] = value;
        setPrestations(newPrestations);
    };

    return (
        <motion.div
            onClick={() => setIsOpen(!isOpen)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-full h-screen mx-auto p-6"
        >
            <h2 className="text-2xl font-semibold mb-6">Crée une Facture</h2>

            <form className="space-y-6">
                {/* Sélection du client */}
                <div>
                    <label htmlFor="client" className="block text-sm font-medium text-gray-700">Client</label>
                    <select
                        id="client"
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Sélectionner un client</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.nom} {client.prenom} {/* Affiche le nom et le prénom */}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sélection de la prestation */}
                <div>
                    <label htmlFor="prestation" className="block text-sm font-medium text-gray-700">Type de Prestations</label>
                    <select
                        id="prestation"
                        value={selectedPrestation}
                        onChange={(e) => setSelectedPrestation(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Sélectionner une prestation</option>
                        {prestationsService.map((prestation) => (
                            <option key={prestation.id} value={prestation.id}>
                                {prestation.nom} {/* Affiche le nom de la prestation */}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Prestations */}
                {prestations.map((prestation, index) => (
                    <div key={index} className="space-y-4 mt-4">
                        <div>
                            <label htmlFor={`service-${index}`} className="block text-sm font-medium text-gray-700">Prestation</label>
                            <input
                                type="text"
                                id={`service-${index}`}
                                name="service"
                                value={prestation.service}
                                onChange={(e) => handlePrestationChange(index, e)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Prestation fournie"
                            />
                        </div>

                        <div>
                            <label htmlFor={`price-${index}`} className="block text-sm font-medium text-gray-700">Prix</label>
                            <input
                                type="number"
                                id={`price-${index}`}
                                name="price"
                                value={prestation.price}
                                onChange={(e) => handlePrestationChange(index, e)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Prix de la prestation"
                            />
                        </div>
                    </div>
                ))}

                {/* Bouton pour ajouter plus de prestations */}
                <div className="flex flex-col">
                    <button
                        type="button"
                        onClick={addPrestation}
                        className="w-1/5 mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Ajouter une prestation +
                    </button>

                    <button
                        type="submit"
                        className="w-1/4 mt-6 px-4 py-2 bg-black text-white font-semibold rounded-md shadow-sm hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Envoyer
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default AddFacturation;
