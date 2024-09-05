import React, { useState } from 'react';
import { FaDownload, FaEllipsisV, FaEye, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ClientCard = ({ client }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            className="bg-gray-200 p-4 rounded shadow flex flex-col items-start justify-between cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center mb-3">
                <FaUser className="text-blue-500 mr-5" />
                {client.name}
            </div>
            <motion.div
                className="flex flex-col space-y-3"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex space-x-7 mb-3">
                    <FaEye className="text-gray-600 cursor-pointer hover:text-blue-500" title="Voir" />
                    <button className="text-sm border-2 rounded-full border-black px-5 py-1 hover:bg-black hover:text-white">Envoyer</button>
                    <FaDownload className="text-gray-600 cursor-pointer hover:text-green-500" title="Télécharger" />
                    <FaEllipsisV className="text-gray-600 cursor-pointer hover:text-gray-900" title="Options" />
                </div>
                <div className="p-4 bg-gray-100 rounded mt-2">
                    <p>Détails supplémentaires pour {client.name}. Cette section est affichée lorsque la carte est ouverte.</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

const clients = [
    { id: 1, name: 'Alice Smith' },
    { id: 2, name: 'Bob Johnson' },
    { id: 3, name: 'Charlie Brown' },
];

const clients1 = [
    { id: 1, name: 'Jean Christophe' },
    { id: 2, name: 'Jennie Fana' },
    { id: 3, name: 'Pierre Brown' },
];

const ListeClients = () => {
    return (
        <div>
            <h1 className="text-5xl mb-4 text-black my-10 text-center">Liste des Clients</h1>

            <motion.div>
                <motion.h3
                    className="text-xl my-5"
                    onClick={() => setIsOpen(!isOpen)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}>22 Août 2024</motion.h3>
                <div className="space-y-5">
                    {clients.map((client) => (
                        <ClientCard key={client.id} client={client} />
                    ))}
                </div>
            </motion.div>

            <div>
                <motion.h3
                    className="text-xl my-5"
                    onClick={() => setIsOpen(!isOpen)}
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.5}}>31 Mai 2024
                </motion.h3>
                <div className="space-y-5">
                    {clients1.map((client) => (
                        <ClientCard key={client.id} client={client}/>
                    ))}
                </div>
            </div>

            <div className="flex justify-center items-center mt-5">
                <button
                    className="text-white border-2 rounded-full border-white py-4 px-5 bg-black hover:bg-opacity-50 hover:text-black text-center w-2/6">
                    Afficher plus
                </button>
            </div>
        </div>
    );
};

export default ListeClients;
