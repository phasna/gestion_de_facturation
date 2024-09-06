import { motion } from 'framer-motion';
import {useState} from "react";

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            onClick={() => setIsOpen(!isOpen)}
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.5}}
            className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Profil de l'utilisateur</h1>
            <div className="space-y-4">
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
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600">
                        Enregistrer
                    </button>
                    <button className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-400">
                        Annuler
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
