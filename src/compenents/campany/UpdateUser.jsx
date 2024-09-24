import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Ajoutez useNavigate
import { clients as initialClients } from '../ClientData/ClientsData.jsx';

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
            <button type="submit" className="bg-green-500 text-white py-1 px-3 rounded">
                Sauvegarder
            </button>
        </form>
    );
};

// Composant principal de l'application
const App = () => {
    const [clients] = useState(initialClients);
    const [selectedClientId, setSelectedClientId] = useState(""); // Valeur initiale vide
    const selectedClient = clients.find(client => client.id === Number(selectedClientId));
    const navigate = useNavigate(); // Utilisez useNavigate pour la redirection

    const handleSelectChange = (e) => {
        const value = e.target.value;
        if (value === "addClient") {
            navigate("/add_client"); // Redirige vers la page d'ajout de client
        } else {
            setSelectedClientId(value);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Gestion des Clients</h1>
            <div className="mb-4">
                <label htmlFor="clientSelect" className="block mb-2">Sélectionnez un Client:</label>
                <select
                    id="clientSelect"
                    value={selectedClientId}
                    onChange={handleSelectChange}
                    className="border p-2 w-full"
                >
                    <option value="" disabled>Sélectionnez un nom</option>
                    {clients.map(client => (
                        <option key={client.id} value={client.id}>
                            {client.name}
                        </option>
                    ))}
                    <option value="addClient">Ajouter un autre client</option>
                </select>
            </div>
            {selectedClient && <ClientForm client={selectedClient} />}
            {!selectedClient && <ClientForm client={null} />}
        </div>
    );
};

export default App;
