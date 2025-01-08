import { useState } from 'react';
import { motion } from 'framer-motion';

const AddFacturation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [prestations, setPrestations] = useState([{ service: '', price: '' }]);
    const [clients] = useState(['User', 'Admin', 'Super Admin']); // Liste des clients
    const [prestationsService] = useState(['Crée un site', 'Développer un application', 'Reprendre anciaent site']); // Liste des prestationsService
    const [selectedClient, setSelectedClient] = useState('');
    const [selected_une_poste, setSelectedAppareil] = useState('');
    const [image, setImage] = useState(null); // État pour gérer l'image

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };


    return (
        <motion.div
            onClick={() => setIsOpen(!isOpen)}
            className="max-w-full h-screen mx-auto p-10 min-h-screen bg-gradient-to-r from-blue-500 to-purple-600"
        >
            <motion.h2
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-semibold mb-6 text-center lg:mb-10 lg:mt-10 text-white">Ajouter nouveau utilisateur</motion.h2>

            <motion.form
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
                className="space-y-6 bg-white p-10 rounded-lg shadow-lg ">

                <div className={"flex flex-row space-x-3 "}>
                    <div className={"w-full"}>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Nom du utilisateur"
                            required
                        />
                    </div>

                    <div className={"w-full"}>
                        <label htmlFor="Prénom" className="block text-sm font-medium text-gray-700">Prénom</label>
                        <input
                            type="Prénom"
                            id="Prénom"
                            name="Prénom"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Prénom du utilisateur"
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
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Email du utilisateur"
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
                        placeholder="Téléphone du utilisateur"
                    />
                </div>

                {/* Adresse de facturation */}
                <div className={"flex flex-row space-x-3"}>
                    <div className={"w-full"}>
                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Code Postal</label>
                        <input
                            type="text"
                            id="zip"
                            name="zip"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Code postal du utilisateur"
                            required
                        />
                    </div>

                    <div className={"w-full"}>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Ville du utilisateur"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Adresse du utilisateur"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Ajouter une image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {image && (
                        <p className="mt-2 text-sm text-gray-600">
                            Fichier sélectionné : <span className="font-medium">{image.name}</span>
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="client" className="block text-sm font-medium text-gray-700">Role du
                        utilisateur</label>
                    <select
                        id="client"
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Sélectionner un rôle</option>
                        {clients.map((client, index) => (
                            <option key={index} value={client}>{client}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="appareil" className="block text-sm font-medium text-gray-700">poste occupé</label>
                    <select
                        id="poste"
                        value={selected_une_poste}
                        onChange={(e) => setSelectedAppareil(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Sélectionner un poste</option>
                        {prestationsService.map((prestationsService, index) => (
                            <option key={index} value={prestationsService}>{prestationsService}</option>
                        ))}
                    </select>
                </div>


                <div className={"flex flex-col"}>

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

export default AddFacturation;
