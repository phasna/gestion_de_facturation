import { useState, useEffect } from 'react';

// Exemple de liste de clients (remplacez-le par vos données réelles)
const clientsList = [
    { id: 1, firstName: 'Jean', lastName: 'Dupont', email: 'jean.dupont@example.com', phone: '0123456789', address: '123 Rue de Paris', city: 'Paris', postalCode: '75001', country: 'France', siretNumber: '265438031', },
    { id: 2, firstName: 'Marie', lastName: 'Curie', email: 'marie.curie@example.com', phone: '0987654321', address: '456 Avenue des Champs-Élysées', city: 'Paris', postalCode: '75008', country: 'France', siretNumber: '265438031', },
    { id: 3, firstName: 'Albert', lastName: 'Einstein', email: 'albert.einstein@example.com', phone: '1122334455', address: '789 Boulevard Saint-Germain', city: 'Paris', postalCode: '75005', country: 'France', siretNumber: '265438031', },
];

const EditClientForm = ({ client = {}, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        firstName: client.firstName || '',
        lastName: client.lastName || '',
        email: client.email || '',
        phone: client.phone || '',
        address: client.address || '',
        city: client.city || '',
        postalCode: client.postalCode || '',
        siretNumber: client.siretNumber || '',
    });

    const [selectedClientId, setSelectedClientId] = useState(client.id || '');

    useEffect(() => {
        if (selectedClientId) {
            const selectedClient = clientsList.find(c => c.id === parseInt(selectedClientId));
            if (selectedClient) {
                setFormData({
                    firstName: selectedClient.firstName || '',
                    lastName: selectedClient.lastName || '',
                    email: selectedClient.email || '',
                    phone: selectedClient.phone || '',
                    address: selectedClient.address || '',
                    city: selectedClient.city || '',
                    postalCode: selectedClient.postalCode || '',
                    country: selectedClient.country || '',
                    siretNumber: selectedClient.siretNumber || '',
                });
            }
        }
    }, [selectedClientId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleClientChange = (e) => {
        setSelectedClientId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Appelle la fonction parent avec les données mises à jour
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-full h-screen mx-auto p-5">
            <h2 className="text-2xl font-bold mb-6 text-center">Modifier un client</h2>

            <div className="mb-4">
                <label htmlFor="clientSelect" className="block text-sm font-medium text-gray-700">Sélectionner un
                    client</label>
                <select
                    id="clientSelect"
                    name="clientSelect"
                    value={selectedClientId}
                    onChange={handleClientChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">Choisir un client</option>
                    {clientsList.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.firstName} {c.lastName}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="Siret" className="block text-sm font-medium text-gray-700">Numéro Siret</label>
                <input
                    type="tel"
                    id="siret"
                    name="siret"
                    value={formData.siretNumber}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>


            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Code Postal</label>
                <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Pays</label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="flex justify-between mt-6">
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Enregistrer
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Annuler
                </button>
            </div>
        </form>
    );
};

export default EditClientForm;
