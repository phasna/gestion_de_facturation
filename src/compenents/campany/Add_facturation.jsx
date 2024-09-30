import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AddFacturation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [prestations, setPrestations] = useState([{ service: '', price: '' }]);
    const [clients, setClients] = useState([]);  // Stocker les clients récupérés
    const [prestationsService, setPrestationsService] = useState([]);  // Stocker les prestations récupérées
    const [selectedClient, setSelectedClient] = useState(''); // Stocker le client sélectionné
    const [selectedPrestation, setSelectedPrestation] = useState(''); // Stocker la prestation sélectionnée
    const [prixPrestation, setPrixPrestation] = useState(''); // Stocker le prix de la prestation sélectionnée

    // Récupérer la liste des clients depuis l'API
    useEffect(() => {
        fetch('http://127.0.0.1:8000/factures/clients/')
            .then(response => {
                console.log('Réponse reçue:', response);  // Ajoutez ceci pour voir la réponse
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
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

    // Fonction pour gérer la sélection d'une prestation et mettre à jour le prix
    const handlePrestationChange = (e) => {
        const prestationId = e.target.value;
        setSelectedPrestation(prestationId);

        // Trouver la prestation sélectionnée dans la liste des prestations
        const prestation = prestationsService.find(p => p.id === parseInt(prestationId));

        if (prestation) {
            setPrixPrestation(prestation.prix);  // Mettre à jour le prix en fonction de la prestation sélectionnée
        }
    };

    // Fonction pour ajouter une nouvelle prestation personnalisée
    const addPrestation = () => {
        setPrestations([...prestations, { service: '', price: '' }]);
    };

    // Fonction pour soumettre la facture au backend
    const handleSubmit = (e) => {
        e.preventDefault();

        // Préparer les données à envoyer au backend
        const newFacture = {
            client: selectedClient,  // L'ID du client sélectionné
            prestations: prestations.map(p => ({
                service: p.service,
                price: p.price,
            }))  // La liste des prestations ajoutées
        };

        // Envoyer les données au backend
        fetch('http://127.0.0.1:8000/factures/add-facture/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFacture),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Réinitialiser le formulaire ou rediriger vers une autre page
                console.log('Facture créée avec succès:', data);
                setPrestations([{ service: '', price: '' }]);  // Réinitialiser les prestations
                setSelectedClient('');  // Réinitialiser le client
                setSelectedPrestation('');  // Réinitialiser la prestation
            } else {
                console.error('Erreur lors de la création de la facture:', data.error);
            }
        })
        .catch(error => console.error('Erreur lors de la requête POST:', error));
    };

    return (
        <motion.div
            onClick={() => setIsOpen(!isOpen)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-full h-screen mx-auto p-6"
        >
            <h2 className="text-2xl font-semibold mb-6">Créer une Facture</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
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
                                {client.nom} {client.prenom}
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
                        onChange={handlePrestationChange}  // Appeler la fonction pour gérer le changement de prestation
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Sélectionner une prestation</option>
                        {prestationsService.map((prestation) => (
                            <option key={prestation.id} value={prestation.id}>
                                {prestation.nom}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Affichage du prix correspondant */}
                <div>
                    <label htmlFor="prix" className="block text-sm font-medium text-gray-700">Prix</label>
                    <input
                        type="text"
                        id="prix"
                        name="prix"
                        value={prixPrestation || ''}  // Afficher le prix sélectionné
                        readOnly
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Prestations supplémentaires */}
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
