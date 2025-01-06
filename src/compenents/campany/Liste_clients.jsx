import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDownload, FaEye, FaEllipsisV, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Composant ClientRow
const ClientRow = ({ client, onView, onDownload, onDelete, onEdit, onPayDirect }) => {
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
                <img src={client.img || '/default-avatar.png'} alt={client.nom} className="w-16 h-16 rounded-full" />
            </td>
            <td className="py-4 px-6">{client.nom}</td>
            <td className="py-4 px-6">{client.prenom}</td>
            <td className="py-4 px-6">
                <span
                    className={`px-2 py-1 rounded-full ${
                        client.status === 'Payé'
                            ? 'bg-green-200 text-green-600'
                            : client.status === 'Non payé'
                            ? 'bg-orange-200 text-orange-600'
                            : 'bg-red-200 text-red-600'
                    }`}
                >
                    {client.status || 'Aucun devis ou prestation'}
                </span>
            </td>
            <td className="py-4 px-6">{client.price ? `${client.price} €` : '—'}</td>
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
                                    onClick={() => onPayDirect(client)}
                                >
                                    Marquer comme Payé
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
    onPayDirect: PropTypes.func.isRequired,
};

// Composant ClientList
const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      const fetchClients = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/clients-with-details/');
            const updatedClients = response.data.map(client => ({
                ...client,
                price: Number(client.price) || 0,  // Convertir le prix en nombre
            }));
            setClients(updatedClients);
        } catch (error) {
            console.error('Erreur lors de la récupération des clients :', error);
            alert('Impossible de récupérer la liste des clients.');
        }
        };
        fetchClients();
    }, []);

    const filteredClients = clients.filter(client =>
        client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.prenom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (client) => {
        if (window.confirm(`Voulez-vous vraiment supprimer ${client.nom} ?`)) {
            try {
                const response = await axios.delete(`http://127.0.0.1:8000/api/clients/${client.id}/`);
                if (response.status === 204) {
                    alert('Client supprimé avec succès');
                    setClients(clients.filter((c) => c.id !== client.id));
                }
            } catch (error) {
                console.error('Erreur lors de la suppression du client :', error);
                alert('Échec de la suppression.');
            }
        }
    };

    const handleEdit = client => {
        // Naviguer vers la page de modification
        console.log(`Naviguer vers la modification du client ${client.id}`);
    };

    const handleView = async (client) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/factures/${client.factureId}/`);
            console.log(response.data);
        } catch (error) {
            console.error('Erreur lors de la visualisation de la facture :', error);
            alert('Impossible de visualiser la facture.');
        }
    };

    const handleDownload = async (client) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/factures/${client.factureId}/download/`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `facture_${client.factureId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Erreur lors du téléchargement de la facture:', error);
            alert('Impossible de télécharger la facture.');
        }
    };

    const handlePayDirect = async (client) => {
        try {
            await axios.post('http://127.0.0.1:8000/api/pay-direct/', { clientId: client.id });
            alert('Prestation marquée comme payée.');
            // Rafraîchir la liste des clients
            const response = await axios.get('http://127.0.0.1:8000/api/clients-with-details/');
            setClients(response.data);
        } catch (error) {
            console.error('Erreur lors de la validation directe :', error);
            alert('Impossible de marquer comme payé.');
        }
    };

    const handleValidateDevis = async (devisId) => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/devis/${devisId}/validate/`);
            alert('Devis validé avec succès.');
            // Rafraîchir la liste des clients
            const response = await axios.get('http://127.0.0.1:8000/api/clients-with-details/');
            setClients(response.data);
        } catch (error) {
            console.error('Erreur lors de la validation du devis :', error);
            alert('Impossible de valider le devis.');
        }
    };



    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <header className="bg-blue-700 py-6">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-4xl font-bold"
                >
                    Gestion des Clients
                </motion.h1>
            </header>
            <motion.main
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto p-10"
            >
                {/* Barre de recherche */}
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
                </div>
                {/* Tableau des clients */}
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
                                    onPayDirect={handlePayDirect}
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
