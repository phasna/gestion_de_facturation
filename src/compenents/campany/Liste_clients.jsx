import React, { useState } from 'react';
import { FaDownload, FaEye, FaEllipsisV } from 'react-icons/fa';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { clients } from "../ClientData/ClientsData.jsx"; // Import des données des clients

const ClientRow = ({ client, onView, onDownload, onDelete, onEdit, onSend }) => {
    const [showActions, setShowActions] = useState(false);

    const toggleActions = () => {
        setShowActions(!showActions);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'payé':
                return 'bg-green-100 text-green-700';
            case 'en attente':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <motion.tr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white shadow-md rounded-lg hover:shadow-lg transition duration-300"
        >
            <td className="py-4 px-6">
                <img src={client.img} alt={client.firstName} className="w-10 h-10 rounded-full border-2 border-gray-200" />
            </td>
            <td className="py-4 px-6 text-gray-800">{client.firstName}</td>
            <td className="py-4 px-6 text-gray-800">{client.lastName}</td>
            <td className="py-4 px-6">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(client.status)}`}>
                    {client.status}
                </span>
            </td>
            <td className="py-4 px-6 text-gray-800">{client.price} €</td>
            <td className="py-4 px-6 text-center">
                <div className="flex justify-center space-x-4">
                    <FaEye
                        className="text-blue-500 cursor-pointer hover:text-blue-700 transition duration-200"
                        title="Visualiser"
                        onClick={() => onView(client)}
                    />
                    <FaDownload
                        className="text-green-500 cursor-pointer hover:text-green-700 transition duration-200"
                        title="Télécharger"
                        onClick={() => onDownload(client)} // Gère le téléchargement
                    />
                    <div className="relative">
                        <FaEllipsisV
                            className="text-gray-500 cursor-pointer hover:text-gray-700 transition duration-200"
                            title="Options"
                            onClick={toggleActions}
                        />
                        {showActions && (
                            <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg z-10 p-2">
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

const ClientList = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredClients = clients.filter((client) =>
        client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const generatePDFContent = (client) => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Nom de l'Entreprise", 10, 10);
        doc.setFontSize(12);
        doc.text("Adresse de l'Entreprise", 10, 20);
        doc.text("Téléphone: 123-456-7890", 10, 30);
        doc.text("Email: contact@entreprise.com", 10, 40);
        doc.text("-------------------------------", 10, 50);

        doc.setFontSize(16);
        doc.text("Détails du Client", 10, 60);
        doc.setFontSize(12);
        doc.text(`Nom: ${client.firstName}`, 10, 70);
        doc.text(`Prénom: ${client.lastName}`, 10, 80);
        doc.text(`Statut de Facture: ${client.status}`, 10, 90);
        doc.text(`Prix: ${client.price} €`, 10, 100);
        doc.text("-------------------------------", 10, 110);

        const services = [
            { name: "Prestation 1", quantity: 2, priceHT: 50, priceTTC: 60 },
            { name: "Prestation 2", quantity: 1, priceHT: 30, priceTTC: 36 },
        ];

        doc.autoTable({
            head: [['Prestation', 'Quantité', 'Prix HT (€)', 'Prix TTC (€)']],
            body: services.map(service => [service.name, service.quantity, service.priceHT, service.priceTTC]),
            startY: 120,
            theme: 'grid',
        });

        const totalHT = services.reduce((acc, service) => acc + service.priceHT * service.quantity, 0);
        const totalTTC = services.reduce((acc, service) => acc + service.priceTTC * service.quantity, 0);

        doc.text(`Total HT: ${totalHT} €`, 10, doc.autoTable.previous.finalY + 10);
        doc.text(`Total TTC: ${totalTTC} €`, 10, doc.autoTable.previous.finalY + 20);

        return doc;
    };

    const handleView = (client) => {
        const doc = generatePDFContent(client);
        window.open(doc.output('bloburl'), '_blank'); // Visualiser le PDF
    };

    const handleDownload = (client) => {
        const doc = generatePDFContent(client);
        doc.save(`facture_${client.firstName}_${client.lastName}.pdf`); // Télécharger le PDF
    };

    const handleDelete = (client) => {
        alert(`Client ${client.firstName} ${client.lastName} supprimé`);
    };

    const handleEdit = (client) => {
        alert(`Modifier le client : ${client.firstName} ${client.lastName}`);
    };

    const handleSend = (client) => {
        alert(`Envoyer une facture à ${client.firstName} ${client.lastName}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800"> {/* Couleur de fond de la page */}
            <header className="bg-blue-600 py-6 shadow-lg">
                <h1 className="text-center text-4xl font-bold text-white">Gestion des Clients</h1>
            </header>
            <div className="max-w-4xl mx-auto p-6">
                <input
                    type="text"
                    placeholder="Rechercher un client..."
                    className="p-3 my-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prénom</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {filteredClients.map((client) => (
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
        </div>
    );
};

export default ClientList;
