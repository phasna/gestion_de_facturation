import { motion } from 'framer-motion';
import {useState} from "react";

const FacturationForm = () => {
    const [isOpen, setIsOpen] = useState(false);



    return (
        <motion.div
            onClick={() => setIsOpen(!isOpen)}
            className="max-w-full h-screen mx-auto p-10 min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">

            <motion.h2
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
                className="text-4xl text-white font-semibold mb-6 text-center">Crée nouveau client</motion.h2>

            <motion.form
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
                className="space-y-6 bg-white p-10 rounded-lg shadow-lg ">
                {/* Coordonnées */}
                <div className={"flex flex-row space-x-3 "}>
                    <div className={"w-full"}>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Nom du client"
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
                            placeholder="Prénom du client"
                            required
                        />
                    </div>
                </div>

                <div className={"w-full"}>
                    <label htmlFor="Siret_du_client" className="block text-sm font-medium text-gray-700">Siret du client</label>
                    <input
                        type="Siret "
                        id="Siret "
                        name="Siret du client"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Siret du client "
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
)
    ;
};

export default FacturationForm;
