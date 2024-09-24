import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clients as initialClients } from '../ClientData/ClientsData.jsx';
import { FaSearch } from 'react-icons/fa'; // Assurez-vous d'installer react-icons

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
            setName(client.name);
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
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-white">
            <h2 className="text-xl font-bold mb-2">Informations du Client</h2>
            <label className="block mb-1" htmlFor="name">Nom</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="border p-2 w-full mb-2" />
            <label className="block mb-1" htmlFor="address">Adresse</label>
            <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="border p-2 w-full mb-2" />
            <div className="flex flex-row w-full space-x-5">
                <div className="flex flex-col w-1/2">
                    <label className="block mb-1" htmlFor="phone">Téléphone</label>
                    <input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required className="border p-2 w-full mb-2" />
                </div>
                <div className="flex flex-col w-1/2">
                    <label className="block mb-1" htmlFor="email">Email</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border p-2 w-full mb-2" />
                </div>
            </div>
            <label className="block mb-1" htmlFor="detail">Détails</label>
            <input id="detail" type="text" value={detail} onChange={(e) => setDetail(e.target.value)} required className="border p-2 w-full mb-2" />
            <div className="flex flex-row w-full space-x-5">
                <div className="flex flex-col w-1/2">
                    <label className="block mb-1" htmlFor="entreprise">Entreprise</label>
                    <input id="entreprise" type="text" value={entreprise} onChange={(e) => setEntreprise(e.target.value)} required className="border p-2 w-full mb-2" />
                </div>
                <div className="flex flex-col w-1/2">
                    <label className="block mb-1" htmlFor="entrepriseAddress">Adresse de l'Entreprise</label>
                    <input id="entrepriseAddress" type="text" value={entrepriseAddress} onChange={(e) => setEntrepriseAddress(e.target.value)} required className="border p-2 w-full mb-2" />
                </div>
            </div>
            <label className="block mb-1" htmlFor="entreprisePhone">Téléphone de l'Entreprise</label>
            <input id="entreprisePhone" type="text" value={entreprisePhone} onChange={(e) => setEntreprisePhone(e.target.value)} required className="border p-2 w-full mb-2" />
            <label className="block mb-1" htmlFor="siret">SIRET</label>
            <input id="siret" type="text" value={siret} onChange={(e) => setSiret(e.target.value)} required className="border p-2 w-full mb-2" />
            <label className="block mb-1" htmlFor="city">Ville</label>
            <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} required className="border p-2 w-full mb-2" />
            <button type="submit" className="bg-black text-white py-3 px-12 rounded-xl mt-5">
                Sauvegarder
            </button>
        </form>
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
            client.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Gestion des Clients</h1>
            <div className="flex justify-between items-center mb-4">
                <label htmlFor="clientSelect" className="block mb-2">Sélectionnez un Client:</label>
                <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchTerm} // Ajout de la valeur
                        onChange={(e) => setSearchTerm(e.target.value)} // Mise à jour de l'état
                        className="border p-2 pl-10 pr-4 rounded w-full"
                    />
                    <FaSearch className="absolute left-2 top-2 text-gray-500" />
                    {searchTerm && (
                        <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-48 overflow-auto">
                            {filteredClients.map(client => (
                                <li
                                    key={client.id}
                                    onClick={() => {
                                        setSelectedClientId(client.id);
                                        setSearchTerm(client.name);
                                    }}
                                    className="cursor-pointer hover:bg-gray-200 p-2"
                                >
                                    {client.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <select
                id="clientSelect"
                value={selectedClientId}
                onChange={handleSelectChange}
                className="border p-2 w-full mb-4"
            >
                <option value="" disabled>Sélectionnez un nom</option>
                {filteredClients.map(client => ( // Utilisation de la liste filtrée
                    <option key={client.id} value={client.id}>
                        {client.name}
                    </option>
                ))}
                <option value="addClient">Ajouter un autre client</option>
            </select>
            {selectedClientId && <ClientForm client={clients.find(client => client.id === Number(selectedClientId))} />}
            {!selectedClientId && <ClientForm client={null} />}
        </div>
    );
};

export default App;
