import { motion } from 'framer-motion';
import { useState } from "react";
import axios from 'axios';

const FacturationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        prenom: '',
        siret: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://100.107.164.18:8000/api/add-client/', {
                nom: formData.name,
                prenom: formData.prenom,
                email: formData.email,
                siret: formData.siret,
                tel_mobile: formData.phone,
                ville: formData.city,
                adresse: formData.address,
                code_postal: formData.zip
            });

            alert('Client ajouté avec succès !');
            console.log(response.data);

            // Réinitialiser le formulaire
            setFormData({
                name: '',
                prenom: '',
                siret: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                zip: ''
            });

        } catch (error) {
            console.error(error);
            alert('Erreur lors de l\'ajout du client.');
        }
    };

    return (
        <motion.div
            onClick={() => {}}
            className="max-w-full h-screen mx-auto p-10 min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">

            <motion.h2
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl text-white font-semibold mb-6 text-center">
                Crée nouveau client
            </motion.h2>

            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 bg-white p-10 rounded-lg shadow-lg">

                {/* Coordonnées */}
                <div className={"flex flex-row space-x-3"}>
                    <div className={"w-full"}>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Nom du client"
                            required
                        />
                    </div>

                    <div className={"w-full"}>
                        <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prénom</label>
                        <input
                            type="text"
                            id="prenom"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Prénom du client"
                            required
                        />
                    </div>
                </div>

                <div className={"w-full"}>
                    <label htmlFor="siret" className="block text-sm font-medium text-gray-700">Siret du client</label>
                    <input
                        type="text"
                        id="siret"
                        name="siret"
                        value={formData.siret}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Siret du client"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Email du client"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Téléphone du client"
                    />
                </div>

                {/* Adresse de facturation */}
                <div className={"flex flex-row space-x-3"}>
                    <div className={"w-full"}>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Adresse du client"
                            required
                        />
                    </div>

                    <div className={"w-full"}>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Ville du client"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Code Postal</label>
                    <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Code postal du client"
                        required
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-1/5 mt-6 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Envoyer
                    </button>
                </div>
            </motion.form>
        </motion.div>
    );
};

export default FacturationForm;
