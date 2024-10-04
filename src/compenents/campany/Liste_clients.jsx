import React, { useState } from 'react';
import { FaDownload, FaEye, FaEllipsisV, FaSearch, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importer le module autotable
import { clients } from "../ClientData/ClientsData.jsx"; // Import des données des clients
import logo from '../../assets/img/logo_1.png'; // Assurez-vous que le chemin est correct
import { Link } from "react-router-dom";

// Composant pour chaque ligne de client
const ClientRow = ({ client, onView, onDownload, onDelete, onEdit, onSend }) => {
    const [showActions, setShowActions] = useState(false);

    const toggleActions = () => {
        setShowActions(!showActions);
    };

    const handleDownload = (client) => {
        const doc = new jsPDF();

        // Ajout du logo
        doc.addImage(logo, 'PNG', 10, 0, 50, 50); // Position et taille du logo

        // Informations de l'entreprise
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("Entreprise : Dpdev", 10, 50);
        doc.text("Adresse : 12 allée des peupliers, 69001 Lyon", 10, 60);
        doc.text("Téléphone : 06 44 76 82 34", 10, 70);
        doc.text("Email : contact@entreprise.com", 10, 80);

        // Détails du client
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Détails du Client", 140, 50);
        doc.setFont("helvetica", "normal");
        doc.text(`Nom : ${client.firstName}`, 140, 60);
        doc.text(`Prénom : ${client.lastName}`, 140, 70);
        doc.text(`Adresse : ${client.address}`, 140, 80);
        doc.text(`Téléphone : ${client.phone}`, 140, 90);
        doc.text(`Email : ${client.email}`, 140, 100);

        // Détails des prestations
        const services = [
            { name: "Développement Web", description: "Création et maintenance de sites web", quantity: 2, priceHT: 600 },
            { name: "Consultation", description: "Consultation en développement", quantity: 1, priceHT: 3600 },
            { name: "Consultation", description: "Consultation en développement", quantity: 1, priceHT: 3600 },
            { name: "Consultation", description: "Consultation en développement", quantity: 1, priceHT: 3600 },
        ];

        // Création du tableau
        doc.autoTable({
            head: [['Prestation', 'Description', 'Quantité', 'Prix Unitaire HT (€)', 'Total HT (€)']],
            body: services.map(service => [
                service.name,
                service.description,
                service.quantity,
                service.priceHT.toFixed(2),
                (service.priceHT * service.quantity).toFixed(2)
            ]),
            startY: 110,
            theme: 'striped',
            styles: {
                fontSize: 10,
                cellPadding: 2,
                overflow: 'linebreak',
                columnWidth: 'auto',
            },
            headStyles: {
                fillColor: [22, 160, 133], // Couleur d'arrière-plan de l'en-tête
                textColor: [255, 255, 255], // Couleur du texte de l'en-tête
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245], // Couleur des lignes paires
            }
        });

        // Calcul des totaux
        const totalHT = services.reduce((acc, service) => acc + (service.priceHT * service.quantity), 0);
        const totalTTC = totalHT * 1.2; // Exemple d'une TVA de 20%

        // Affichage des totaux
        const finalY = doc.autoTable.previous.finalY; // Position du bas du tableau
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`Total HT : ${totalHT.toFixed(2)} €`, 10, finalY + 10);
        doc.text(`Total TTC : ${totalTTC.toFixed(2)} €`, 10, finalY + 20);

        // Ligne de séparation
        doc.line(10, finalY + 25, 200, finalY + 25);

        // Message de remerciement
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("Merci pour votre confiance!", 10, finalY + 30);

        // Télécharger le fichier
        doc.save(`facture_${client.firstName}_${client.lastName}.pdf`);
    };




    const getStatusClass = (status) => {
        switch (status) {
            case 'payé':
                return 'bg-green-100 text-green-700';
            case 'en attente':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700'; // Couleur par défaut
        }
    };

    return (
        <motion.tr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 hover:bg-gray-100 transition duration-300"
        >
            <td className="py-0 px-6">
                <img src={client.img} alt={client.firstName} className="w-20 h-20 rounded-full" />
            </td>
            <td className="py-4 px-6">{client.firstName}</td>
            <td className="py-4 px-6">{client.lastName}</td>
            <td className="py-4 px-6">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(client.status)}`}>
                    {client.status}
                </span>
            </td>
            <td className="py-4 px-6">{client.price} €</td>
            <td className="py-4 px-6 text-center">
                <div className="flex justify-center space-x-3">
                    <FaEye
                        className="text-blue-500 cursor-pointer"
                        title="Visualiser"
                        onClick={() => onView(client)}
                    />
                    <FaDownload
                        className="text-green-500 cursor-pointer"
                        title="Télécharger"
                        onClick={() => handleDownload(client)}
                    />

                    <div className="relative">
                        <FaEllipsisV
                            className="text-gray-500 cursor-pointer"
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

// Composant principal pour la liste des clients
const ClientList = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredClients = clients.filter((client) =>
        client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleView = (client) => {
        const doc = new jsPDF();

        // Ajout du logo
        doc.addImage(logo, 'PNG', 10, 0, 50, 50); // Position et taille du logo

        // Informations de l'entreprise
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("Entreprise : Dpdev", 10, 50);
        doc.text("Adresse : 12 allée des peupliers, 69001 Lyon", 10, 60);
        doc.text("Téléphone : 06 44 76 82 34", 10, 70);
        doc.text("Email : contact@entreprise.com", 10, 80);

        // Détails du client
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Détails du Client", 140, 50);
        doc.setFont("helvetica", "normal");
        doc.text(`Nom : ${client.firstName}`, 140, 60);
        doc.text(`Prénom : ${client.lastName}`, 140, 70);
        doc.text(`Adresse : ${client.address}`, 140, 80);
        doc.text(`Téléphone : ${client.phone}`, 140, 90);
        doc.text(`Email : ${client.email}`, 140, 100);

        // Détails des prestations
        const services = [
            { name: "Développement Web", description: "Création et maintenance de sites web", quantity: 2, priceHT: 600 },
            { name: "Consultation", description: "Consultation en développement", quantity: 1, priceHT: 3600 },
            { name: "Consultation", description: "Consultation en développement", quantity: 1, priceHT: 3600 },
            { name: "Consultation", description: "Consultation en développement", quantity: 1, priceHT: 3600 },
        ];

        // Création du tableau
        doc.autoTable({
            head: [['Prestation', 'Description', 'Quantité', 'Prix Unitaire HT (€)', 'Total HT (€)']],
            body: services.map(service => [
                service.name,
                service.description,
                service.quantity,
                service.priceHT.toFixed(2),
                (service.priceHT * service.quantity).toFixed(2)
            ]),
            startY: 110,
            theme: 'striped',
            styles: {
                fontSize: 10,
                cellPadding: 2,
                overflow: 'linebreak',
                columnWidth: 'auto',
            },
            headStyles: {
                fillColor: [22, 160, 133], // Couleur d'arrière-plan de l'en-tête
                textColor: [255, 255, 255], // Couleur du texte de l'en-tête
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245], // Couleur des lignes paires
            }
        });

        // Calcul des totaux
        const totalHT = services.reduce((acc, service) => acc + (service.priceHT * service.quantity), 0);
        const totalTTC = totalHT * 1.2; // Exemple d'une TVA de 20%

        // Affichage des totaux
        const finalY = doc.autoTable.previous.finalY; // Position du bas du tableau
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`Total HT : ${totalHT.toFixed(2)} €`, 10, finalY + 10);
        doc.text(`Total TTC : ${totalTTC.toFixed(2)} €`, 10, finalY + 20);

        // Ligne de séparation
        doc.line(10, finalY + 25, 200, finalY + 25);

        // Message de remerciement
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("Merci pour votre confiance!", 10, finalY + 30);

        window.open(doc.output('bloburl'), '_blank');
    };

    const handleDownload = (client) => {
        const doc = new jsPDF();
        alert(`Téléchargement de la facture pour ${client.firstName} ${client.lastName}`);
        doc.save(`facture_${client.firstName}_${client.lastName}.pdf`);
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
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <header className="bg-blue-700 py-6">
                <motion.h1
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.5}}
                    className="text-center text-4xl font-bold">Gestion des Clients</motion.h1>
            </header>

            <motion.main
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
                className="container mx-auto p-10">
                <div className="mb-8 flex justify-between items-center">
                    <div className="relative w-1/2">
                        <FaSearch className="absolute left-3 top-3 text-gray-400"/>
                        <input
                            type="text"
                            placeholder="Rechercher des clients..."
                            className="w-full bg-white text-gray-800 rounded-full pl-10 pr-4 py-2 focus:outline-none shadow-md"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Link to={"/add_client"}>
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md flex items-center">
                            <FaPlus className="mr-2"/> Ajouter un client
                        </button>
                    </Link>
                </div>

                <div className="bg-white shadow-lg rounded-lg overflow-auto max-h-[70vh]">
                    <table className="min-w-full text-gray-800">
                        <thead className="">
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

            </motion.main>
        </div>
    );
};

export default ClientList;
