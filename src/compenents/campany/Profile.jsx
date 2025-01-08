import { motion } from 'framer-motion';
import {useState} from "react";

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
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
            className="max-w-full mx-auto p-10 bg-white min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl text-white font-bold mb-6 text-center">Profil de l'utilisateur</motion.h1>
            <motion.div
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
                className="space-y-4 bg-white p-10 rounded-lg shadow-lg ">
                {/* Nom */}
                <div className="flex flex-col">
                    <label className="text-gray-600">Nom :</label>
                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-md"
                        placeholder="Votre nom"
                        defaultValue="Doe"
                    />
                </div>

                {/* Prénom */}
                <div className="flex flex-col">
                    <label className="text-gray-600">Prénom :</label>
                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-md"
                        placeholder="Votre prénom"
                        defaultValue="John"
                    />
                </div>

                {/* Téléphone */}
                <div className="flex flex-col">
                    <label className="text-gray-600">Téléphone :</label>
                    <input
                        type="tel"
                        className="p-2 border border-gray-300 rounded-md"
                        placeholder="Votre numéro de téléphone"
                        defaultValue="01 23 45 67 89"
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label className="text-gray-600">Email :</label>
                    <input
                        type="email"
                        className="p-2 border border-gray-300 rounded-md"
                        placeholder="Votre adresse email"
                        defaultValue="john.doe@example.com"
                    />
                </div>

                <div>
                    <label htmlFor="image" className="mb-2">
                        Ajouter un logo
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full cursor-pointer text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {image && (
                        <p className="mt-2 text-sm text-gray-600">
                            Fichier sélectionné : <span className="font-medium">{image.name}</span>
                        </p>
                    )}
                </div>

                {/* Identifiant */}
                <div className="flex flex-col">
                    <label className="text-gray-600">Identifiant :</label>
                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-md"
                        placeholder="Votre identifiant"
                        defaultValue="john_doe"
                    />
                </div>

                {/* Rôle */}
                <div className="flex flex-col">
                    <label className="text-gray-600">Rôle :</label>
                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-md"
                        placeholder="Votre rôle"
                        defaultValue="Utilisateur"
                    />
                </div>

                {/* Mot de passe */}
                <div className="flex flex-col">
                    <label className="text-gray-600">Mot de passe :</label>
                    <input
                        type="password"
                        className="p-2 border border-gray-300 rounded-md"
                        placeholder="Votre mot de passe"
                    />
                </div>

                {/* Coordonnées */}
                <div className="flex flex-col">
                    <label className="text-gray-600">Adresse :</label>
                    <textarea
                        className="p-2 border border-gray-300 rounded-md"
                        placeholder="Votre adresse"
                        defaultValue="123 Rue Exemple, Paris, 75000, France"
                    />
                </div>

                {/* Boutons */}
                <div className="flex justify-between mt-6">
                    <button className="bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-70">
                        Enregistrer
                    </button>
                    <button className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-400">
                        Annuler
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Profile;
