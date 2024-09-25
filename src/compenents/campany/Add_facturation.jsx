import { useState } from 'react';
import { motion } from 'framer-motion';
import { clients } from '../ClientData/ClientsData.jsx';
import { FaSearch } from 'react-icons/fa';

const AddFacturation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [prestations, setPrestations] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [selectedAppareil, setSelectedAppareil] = useState('');
    const [showPrestations, setShowPrestations] = useState(false);
    const [displayCount, setDisplayCount] = useState(2);
    const [searchTerm, setSearchTerm] = useState('');

    // Fonction pour ajouter une nouvelle prestation
    const addPrestation = () => {
        setPrestations([...prestations, { service: '', price: '' }]);
        setShowPrestations(true);
    };

    // Fonction pour gérer les changements dans les champs
    const handlePrestationChange = (index, e) => {
        const { name, value } = e.target;
        const newPrestations = [...prestations];
        newPrestations[index][name] = value;
        setPrestations(newPrestations);
    };

    // Fonction pour annuler les modifications et réinitialiser les champs
    const handleCancel = () => {
        setPrestations([]);
        setSelectedClient('');
        setSelectedAppareil('');
        setShowPrestations(false);
        setSearchTerm('');
    };

    // Filtrer les clients en fonction du terme de recherche
    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fonction pour sélectionner un client
    const handleClientSelect = (clientName) => {
        setSelectedClient(clientName);
        setSearchTerm(clientName); // Mettre à jour le terme de recherche pour la barre
        setIsOpen(false); // Fermer le dropdown après la sélection
    };

    return (
        <motion.div
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.5}}
            className="max-w-full h-screen mx-auto p-6 flex flex-col"
        >
            <h2 className="text-3xl font-semibold text-center my-10">Crée une facture</h2>

            <div className="flex justify-between items-center mb-6 absolute right-5">
                <div className="relative w-full">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setIsOpen(e.target.value.length > 0); // Ouvrir le dropdown si du texte est saisi
                        }}
                        placeholder="Rechercher un client... "
                        className="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <div className="absolute right-2 top-8 transform -translate-y-1/2">
                        <FaSearch className="text-gray-400"/>
                    </div>

                    {isOpen && filteredClients.length > 0 && (
                        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-auto w-full">
                            {filteredClients.map((client) => (
                                <li
                                    key={client.id}
                                    onClick={() => handleClientSelect(client.name)}
                                    className="px-3 py-2 cursor-pointer hover:bg-indigo-100"
                                >
                                    {client.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <form className="space-y-6">
                <div>
                    <label htmlFor="client" className="block text-sm font-medium text-gray-700">Client</label>
                    <select
                        id="client-select"
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)}
                        className="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Sélectionner un client</option>
                        {filteredClients.map((client) => (
                            <option key={client.id} value={client.name}>{client.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="appareil" className="block text-sm font-medium text-gray-700">Type de
                        Prestations</label>
                    <select
                        id="appareil"
                        value={selectedAppareil}
                        onChange={(e) => setSelectedAppareil(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Sélectionner une prestation</option>
                        {/* Ajoutez vos services ici */}
                    </select>
                </div>

                {/* Affichage des prestations seulement si showPrestations est vrai */}
                {showPrestations && (
                    <div>
                        {prestations.slice(0, displayCount).map((prestation, index) => (
                            <div key={index} className="space-y-4 mt-4">
                                <div>
                                    <label htmlFor={`service-${index}`}
                                           className="block text-sm font-medium text-gray-700">Prestation</label>
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
                                    <label htmlFor={`price-${index}`}
                                           className="block text-sm font-medium text-gray-700">Prix</label>
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
                    </div>
                )}

                {/* Boutons pour ajouter et annuler les prestations */}
                <div className="flex flex-col">
                    <div className="flex flex-row space-x-4">
                        <button
                            type="button"
                            onClick={addPrestation}
                            className="w-1/5 mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Ajouter une prestation +
                        </button>

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="w-1/5 mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Annuler
                        </button>
                    </div>

                    <div className={"flex flex-row"}>

                        <button
                            type="submit"
                            className="w-1/4 mt-6 px-4 py-2 bg-black text-white font-semibold rounded-md shadow-sm hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Envoyer
                        </button>

                    </div>
                </div>
            </form>
        </motion.div>
    );
};

export default AddFacturation;
