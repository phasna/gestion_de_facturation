import { useState } from 'react';

const FacturationForm = () => {
    const [prestations, setPrestations] = useState([{ service: '', price: '' }]);

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
        <div className="max-w-full mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Formulaire de Facturation</h2>

            <form className="space-y-6">
                {/* Coordonnées */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Votre nom"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Votre email"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Votre téléphone"
                    />
                </div>

                {/* Adresse de facturation */}
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Votre adresse"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Votre ville"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Code Postal</label>
                    <input
                        type="text"
                        id="zip"
                        name="zip"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Votre code postal"
                        required
                    />
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
                <button
                    type="button"
                    onClick={addPrestation}
                    className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Ajouter une prestation +
                </button>

                <button
                    type="submit"
                    className="w-full mt-6 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Soumettre
                </button>
            </form>
        </div>
    );
};

export default FacturationForm;
