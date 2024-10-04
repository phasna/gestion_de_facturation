import { useState } from 'react';
import { motion } from 'framer-motion';
import { clients } from '../ClientData/ClientsData.jsx';
import prestationsData from '../Prestation/Prestation.jsx';
import { FaSearch, FaPlusCircle, FaTimesCircle } from 'react-icons/fa';
import { IoIosSave } from "react-icons/io";

const AddFacturation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [prestations, setPrestations] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [selectedAppareil, setSelectedAppareil] = useState('');
    const [showPrestations, setShowPrestations] = useState(false);
    const [displayCount, setDisplayCount] = useState(2);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');

    const addPrestation = () => {
        setPrestations([...prestations, { service: '', price: '' }]);
        setShowPrestations(true);
    };

    const handlePrestationChange = (index, e) => {
        const { name, value } = e.target;
        const newPrestations = [...prestations];
        newPrestations[index][name] = value;
        setPrestations(newPrestations);
    };

    const handlePrestationSelect = (e) => {
        const selectedOption = prestationsData.find(prestation => prestation.type === e.target.value);
        setSelectedAppareil(selectedOption ? selectedOption.type : '');
        setSelectedPrice(selectedOption ? selectedOption.prix : '');
    };

    const handleCancel = () => {
        setPrestations([]);
        setSelectedClient('');
        setSelectedAppareil('');
        setShowPrestations(false);
        setSearchTerm('');
        setSelectedPrice('');
    };

    const filteredClients = clients.filter(client =>
        client.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleClientSelect = (clientName) => {
        setSelectedClient(clientName);
        setSearchTerm(clientName);
        setIsOpen(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto max-w-full p-8 bg-white min-h-screen bg-gradient-to-r from-blue-500 to-purple-600"
        >
            <h2 className="text-4xl font-bold text-center mb-10 text-white">Créer une Facture</h2>

            <form className="space-y-8 bg-white p-10 rounded-lg shadow-lg ">
                {/* Barre de recherche avec icône */}
                <div className="relative w-1/3">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setIsOpen(e.target.value.length > 0);
                        }}
                        placeholder="Rechercher un client..."
                        className="w-full border-2 bg-white text-gray-800 rounded-full pl-10 pr-4 py-2 focus:outline-none "
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <FaSearch />
                    </div>

                    {isOpen && filteredClients.length > 0 && (
                        <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-60 overflow-auto w-full">
                            {filteredClients.map((client) => (
                                <li
                                    key={client.id}
                                    onClick={() => handleClientSelect(client.firstName)}
                                    className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                                >
                                    {client.firstName}
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
                        {filteredClients.map((client) => (
                            <option key={client.id} value={client.firstName}>{client.firstName}</option>
                        ))}
                    </select>
                </div>

                {/* Sélection de la prestation */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type de Prestations</label>
                    <select
                        value={selectedAppareil}
                        onChange={handlePrestationSelect}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Sélectionner une prestation</option>
                        {prestationsData.map((prestation) => (
                            <option key={prestation.id} value={prestation.type}>{prestation.type}</option>
                        ))}
                    </select>
                </div>

                {/* Affichage du prix de la prestation */}
                {selectedPrice && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Prix</label>
                        <input
                            type="text"
                            value={selectedPrice}
                            readOnly
                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                )}

                {/* Section des prestations supplémentaires */}
                {showPrestations && prestations.map((prestation, index) => (
                    <div key={index} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Prestation</label>
                            <input
                                type="text"
                                name="service"
                                value={prestation.service}
                                onChange={(e) => handlePrestationChange(index, e)}
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Nom de la prestation"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Prix</label>
                            <input
                                type="number"
                                name="price"
                                value={prestation.price}
                                onChange={(e) => handlePrestationChange(index, e)}
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Prix de la prestation"
                            />
                        </div>
                    </div>
                ))}

                {/* Boutons */}
                <div className="flex justify-between items-center">
                    <div className={"flex flex-col space-y-4"}>
                    <button
                        type="button"
                        onClick={addPrestation}
                        className="flex items-center justify-center px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
                    >
                        <FaPlusCircle className="mr-2"/>
                        Ajouter une prestation
                    </button>
                    <button
                        type="button"
                        onClick={addPrestation}
                        className="flex items-center justify-center px-4 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
                    >
                        <IoIosSave className="mr-2"/>
                        Enregistrer
                    </button>
                    </div>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex items-center justify-center px-4 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
                    >
                        <FaTimesCircle className="mr-2"/>
                        Annuler
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default AddFacturation;
