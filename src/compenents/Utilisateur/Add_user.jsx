import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Add_user = () => {
    const [isOpen, setIsOpen] = useState(false);

    // États pour capturer les champs du formulaire
    const [name, setName] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [zip, setZip] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');
    const [poste, setPoste] = useState('');

    const [postes, setPostes] = useState([]);  // Stocker les postes récupérés depuis la base de données
    const [roles, setRoles] = useState([]);  // Stocker les rôles si nécessaires

    // Récupérer la liste des postes disponibles depuis l'API
    useEffect(() => {
        fetch('http://127.0.0.1:8000/factures/postes/')  // URL de l'API pour récupérer les postes
            .then(response => response.json())
            .then(data => setPostes(data))  // Mettre à jour les postes
            .catch(error => console.error('Erreur lors de la récupération des postes:', error));
    }, []);

    // Récupérer la liste des rôles disponibles depuis l'API
    useEffect(() => {
        fetch('http://127.0.0.1:8000/factures/roles/')  // URL de l'API pour récupérer les rôles (si nécessaire)
            .then(response => response.json())
            .then(data => setRoles(data))  // Mettre à jour les rôles
            .catch(error => console.error('Erreur lors de la récupération des rôles:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Préparer les données à envoyer au backend
        const newUser = {
            name,
            prenom,
            email,
            phone,
            zip,
            city,
            address,
            role,
            poste
        };

        fetch('http://127.0.0.1:8000/factures/users/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setName('');
                setPrenom('');
                setEmail('');
                setPhone('');
                setZip('');
                setCity('');
                setAddress('');
                setRole('');
                setPoste('');
                console.log('Utilisateur ajouté avec succès:', data);
            } else {
                console.error('Erreur lors de l\'ajout de l\'utilisateur:', data.error);
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
            <h2 className="text-2xl font-semibold mb-6">Ajouter nouveau utilisateur</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-row space-x-3 ">
                    <div className="w-full">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Nom de l'utilisateur"
                            required
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prénom</label>
                        <input
                            type="text"
                            id="prenom"
                            name="prenom"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Prénom de l'utilisateur"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Email de l'utilisateur"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Téléphone de l'utilisateur"
                    />
                </div>

                {/* Adresse de facturation */}
                <div className="flex flex-row space-x-3">
                    <div className="w-full">
                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Code Postal</label>
                        <input
                            type="text"
                            id="zip"
                            name="zip"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Code postal de l'utilisateur"
                            required
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Ville de l'utilisateur"
                            required
                        />
                    </div>
                </div>

                <div >
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Adresse de l'utilisateur"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="client" className="block text-sm font-medium text-gray-700">Rôle de l'utilisateur</label>
                    <select
                        id="client"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Sélectionner un rôle</option>
                        {roles.map((role, index) => (
                            <option key={index} value={role.nom_role}>
                                {role.nom_role}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="poste" className="block text-sm font-medium text-gray-700">Poste occupé</label>
                    <select
                        id="poste"
                        value={poste}
                        onChange={(e) => setPoste(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Sélectionner un poste</option>
                        {postes.map((poste, index) => (
                            <option key={index} value={poste.nom_poste}>
                                {poste.nom_poste}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
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

export default Add_user;
