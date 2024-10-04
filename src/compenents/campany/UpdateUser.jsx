import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clients as initialClients } from '../ClientData/ClientsData.jsx';
import { FaSearch } from 'react-icons/fa'; // Assurez-vous d'installer react-icons
import { motion } from 'framer-motion'; // Import de Framer Motion

// Formulaire pour afficher et modifier les informations d'un client
const ClientForm = ({ client }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [detail, setDetail] = useState('');
    const [entreprise, setEntreprise] = useState('');
    const [entrepriseAddress, setEntrepriseAddress] = useState('');
    const [entreprisePhone, setEntreprisePhone] = useState('');
    const [siret, setSiret] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        if (client) {
            setName(client.firstName);
            setAddress(client.address);
            setPhone(client.phone);
            setEmail(client.email);
            setDetail(client.detail);
            setEntreprise(client.entreprise);
            setEntrepriseAddress(client.entreprise_address);
            setEntreprisePhone(client.entreprise_phone);
            setSiret(client.siret);
            setCity(client.city);
        } else {
            setName('');
            setAddress('');
            setPhone('');
            setEmail('');
            setDetail('');
            setEntreprise('');
            setEntrepriseAddress('');
            setEntreprisePhone('');
            setSiret('');
            setCity('');
        }
    }, [client]);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Client mis à jour: ${name}, ${phone}, ${email}, ${detail}, ${entreprise}, ${entrepriseAddress}, ${entreprisePhone}, ${siret}, ${city}`);
        // Ici, vous pouvez ajouter la logique pour sauvegarder les données mises à jour.
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.5}}
            className="mb-4 p-4  bg-white rounded-lg p-10 ">
            <motion.h2
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
                className="text-xl font-bold mb-2">Informations du Client</motion.h2>

            <label className="block mb-1" htmlFor="name">Nom</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="border p-2 w-full mb-2 rounded-lg" />

            <label className="block mb-1" htmlFor="address">Adresse</label>
            <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="border p-2 w-full mb-2 rounded-lg" />

            <div className="flex flex-row w-full space-x-5">
                <div className="flex flex-col w-1/2">
                    <label className="block mb-1" htmlFor="phone">Téléphone</label>
                    <input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required className="border p-2 w-full mb-2 rounded-lg" />
                </div>
                <div className="flex flex-col w-1/2">
                    <label className="block mb-1" htmlFor="email">Email</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border p-2 w-full mb-2 rounded-lg" />
                </div>
            </div>
            <label className="block mb-1" htmlFor="detail">Détails</label>
            <input id="detail" type="text" value={detail} onChange={(e) => setDetail(e.target.value)} required className="border p-2 w-full mb-2 rounded-lg" />
            <div className="flex flex-row w-full space-x-5">
                <div className="flex flex-col w-1/2">
                    <label className="block mb-1" htmlFor="entreprise">Entreprise</label>
                    <input id="entreprise" type="text" value={entreprise} onChange={(e) => setEntreprise(e.target.value)} required className="border p-2 w-full mb-2 rounded-lg" />
                </div>
                <div className="flex flex-col w-1/2">
                    <label className="block mb-1" htmlFor="entrepriseAddress">Adresse de l'Entreprise</label>
                    <input id="entrepriseAddress" type="text" value={entrepriseAddress} onChange={(e) => setEntrepriseAddress(e.target.value)} required className="border p-2 w-full mb-2 rounded-lg" />
                </div>
            </div>

            <div className={"flex flex-row w-full space-x-5"}>
                <div className={"flex flex-col w-1/2"}>
            <label className="block mb-1" htmlFor="entreprisePhone">Téléphone de l'Entreprise</label>
            <input id="entreprisePhone" type="text" value={entreprisePhone} onChange={(e) => setEntreprisePhone(e.target.value)} required className="border p-2 w-full mb-2 rounded-lg" />
                </div>

                <div className={"flex flex-col w-1/2"}>
                    <label className="block mb-1" htmlFor="siret">SIRET</label>
            <input id="siret" type="text" value={siret} onChange={(e) => setSiret(e.target.value)} required className="border p-2 w-full mb-2 rounded-lg" />
            </div>
            </div>
            <label className="block mb-1" htmlFor="city">Ville</label>
            <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} required className="border p-2 w-full mb-2 rounded-lg" />
            <button type="submit"
                    className="w-1/5 mt-6 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Sauvegarder
            </button>
        </motion.form>
    );
};

// Composant principal de l'application
const App = () => {
    const [clients] = useState(initialClients);
    const [selectedClientId, setSelectedClientId] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // État pour la recherche
    const [filteredClients, setFilteredClients] = useState([]); // État pour les clients filtrés
    const navigate = useNavigate();

    useEffect(() => {
        setFilteredClients(clients.filter(client =>
            client.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    }, [searchTerm, clients]);

    const handleSelectChange = (e) => {
        const value = e.target.value;
        if (value === "addClient") {
            navigate("/add_client");
        } else {
            setSelectedClientId(value);
        }
    };

    return (
        <motion.div
            className="container mx-auto p-10 min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <motion.h1
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
                className="text-4xl font-bold text-center text-white">Gestion des Clients</motion.h1>
            <motion.div
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
                className="flex justify-between items-center">
                <label htmlFor="clientSelect" className="block text-white">Sélectionnez un Client:</label>
                <div className="relative w-1/3 mb-5">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Mise à jour de l'état
                        placeholder="Rechercher un client..."
                        className="w-full border-2 bg-white text-gray-800 rounded-full pl-10 pr-4 py-2 focus:outline-none "
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <FaSearch/>
                    </div>
                    {searchTerm && (
                        <motion.ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-48 overflow-auto">
                            {filteredClients.map(client => (
                                <li
                                    key={client.id}
                                    onClick={() => {
                                        setSelectedClientId(client.id);
                                        setSearchTerm(client.firstName);
                                    }}
                                    className="cursor-pointer hover:bg-gray-200 p-2"
                                >
                                    {client.firstName}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </div>
            </motion.div>
            <motion.select
                id="clientSelect"
                value={selectedClientId}
                onChange={handleSelectChange}
                className="border p-2 w-full mb-4 rounded-lg"
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
            >
                <option value="" disabled>Sélectionnez un nom</option>
                {filteredClients.map(client => ( // Utilisation de la liste filtrée
                    <option key={client.id} value={client.id}>
                        {client.firstName}
                    </option>
                ))}
                <option value="addClient">Ajouter un autre client</option>
            </motion.select>
            {selectedClientId && <ClientForm client={clients.find(client => client.id === Number(selectedClientId))} />}
            {!selectedClientId && <ClientForm client={null} />}
        </motion.div>
    );
};

export default App;
