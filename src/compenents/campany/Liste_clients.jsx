import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { FaDownload, FaEye, FaEllipsisV, FaSearch, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importer le module autotable
import logo from '../../assets/img/logo_1.png'; // Assurez-vous que le chemin est correct
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'; // Import pour la validation des props

const ClientRow = ({ client, onView, onDownload, onDelete, onEdit, onSend }) => {
    const [showActions, setShowActions] = useState(false);

    const toggleActions = () => setShowActions(!showActions);

    return (
        <motion.tr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 hover:bg-gray-100 transition duration-300"
        >
            <td className="py-4 px-6">
                <img src={client.img} alt={client.nom} className="w-16 h-16 rounded-full" />
            </td>
            <td className="py-4 px-6">{client.nom}</td>
            <td className="py-4 px-6">{client.prenom}</td>
            <td className="py-4 px-6">{client.status || 'N/A'}</td>
            <td className="py-4 px-6">{client.price || '—'} €</td>
            <td className="py-4 px-6 text-center">
                <div className="flex justify-center items-center space-x-2">
                    <FaEye
                        className="text-blue-500 cursor-pointer"
                        title="Visualiser"
                        onClick={() => onView(client)}
                    />
                    <FaDownload
                        className="text-green-500 cursor-pointer"
                        title="Télécharger"
                        onClick={() => onDownload(client)}
                    />
                    <div className="relative">
                        <FaEllipsisV
                            className="text-gray-500 cursor-pointer"
                            title="Options"
                            onClick={toggleActions}
                        />
                        {showActions && (
                            <div className="absolute right-0 bg-white shadow-lg rounded-lg z-10 p-2">
                                <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => onDelete(client)}
                                >
                                    Supprimer
                                </button>
                                <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => onEdit(client)}
                                >
                                    Modifier
                                </button>
                                <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => onSend(client)}
                                >
                                    Envoyer
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </td>
        </motion.tr>
    );
};

ClientRow.propTypes = {
    client: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nom: PropTypes.string.isRequired,
        prenom: PropTypes.string.isRequired,
        img: PropTypes.string,
        status: PropTypes.string,
        price: PropTypes.number,
    }).isRequired,
    onView: PropTypes.func.isRequired,
    onDownload: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onSend: PropTypes.func.isRequired,
};

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/clients/');
                setClients(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des clients :', error);
            }
        };
        fetchClients();
    }, []);

    const filteredClients = clients.filter(client =>
        client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.prenom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleView = client => alert(`Visualiser le client : ${client.nom}`);
    const handleDownload = client => alert(`Téléchargement du PDF pour : ${client.nom}`);
    const handleDelete = client => alert(`Supprimer le client : ${client.nom}`);
    const handleEdit = client => alert(`Modifier le client : ${client.nom}`);
    const handleSend = client => alert(`Envoyer une facture à : ${client.nom}`);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <header className="bg-blue-700 py-6">
                <motion.h1 initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center text-4xl font-bold">
                    Gestion des Clients
                </motion.h1>
            </header>
            <motion.main initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="container mx-auto p-10">
                <div className="mb-8 flex justify-between items-center">
                    <div className="relative w-1/2">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Rechercher des clients..."
                            className="w-full bg-white text-gray-800 rounded-full pl-10 pr-4 py-2 focus:outline-none shadow-md"
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Link to="/add_client">
                        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md flex items-center">
                            <FaPlus className="mr-2" /> Ajouter un client
                        </button>
                    </Link>
                </div>
                <div className="bg-white shadow-lg rounded-lg overflow-auto max-h-[70vh]">
                    <table className="min-w-full text-gray-800">
                        <thead>
                            <tr className="sticky top-0 bg-gray-200">
                                <th className="py-4 px-6 text-left">Image</th>
                                <th className="py-4 px-6 text-left">Nom</th>
                                <th className="py-4 px-6 text-left">Prénom</th>
                                <th className="py-4 px-6 text-left">Statut</th>
                                <th className="py-4 px-6 text-left">Prix</th>
                                <th className="py-4 px-6 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.map(client => (
                                <ClientRow
                                    key={client.id}
                                    client={client}
                                    onView={handleView}
                                    onDownload={handleDownload}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                    onSend={handleSend}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.main>
        </div>
    );
};

export default ClientList;
