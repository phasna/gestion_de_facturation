// ListeClients.jsx
import React, { useState } from 'react';
import { FaDownload, FaEllipsisV, FaEye, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Facturation from '../Facturation/facturation.jsx';

// Styles communs pour les icônes
const iconStyles = "text-gray-600 cursor-pointer hover:text-blue-500";

// Fonction pour générer et télécharger le PDF
const generatePDF = (client, services) => {
    const doc = new jsPDF();
    doc.text('Facturation', 10, 10);
    doc.text(`Client: ${client.name}`, 10, 20);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 30);

    const tableColumn = ['Prestation', 'Prix'];
    const tableRows = [
        // Remplacez par les données réelles pour ce client
        ['Prestation 1', '100'],
        ['Prestation 2', '200']
    ];

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        theme: 'striped',
    });

    // Télécharge le PDF sous le nom 'facturation_clientid.pdf'
    doc.save(`facturation_${client.id}.pdf`);
};

// Composant de carte de client
const ClientCard = ({ client }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleViewPdf = () => {
        const doc = new jsPDF();
        doc.text('Facturation', 10, 10);
        doc.text(`Client: ${client.name}`, 10, 20);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 30);

        const tableColumn = ['Prestation', 'Prix'];
        const tableRows = [
            // Remplacez par les données réelles pour ce client
            ['Prestation 1', '100'],
            ['Prestation 2', '200']
        ];

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 40,
            theme: 'striped',
        });

        // Visualiser le PDF dans une nouvelle fenêtre
        doc.output('dataurlnewwindow');
    };

    return (
        <motion.div
            className="bg-gray-200 p-4 rounded shadow cursor-pointer w-full"
            onClick={() => setIsOpen(!isOpen)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center mb-3">
                <FaUser className="text-blue-500 mr-5" /> {client.name}
            </div>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex space-x-7 mb-3">
                    <FaEye
                        className={iconStyles}
                        title="Voir"
                        onClick={(e) => {
                            e.stopPropagation(); // Empêche la propagation du clic pour éviter l'ouverture/fermeture de la carte
                            handleViewPdf();
                        }}
                    />
                    <button className="text-sm border-2 rounded-full border-black px-5 py-1 hover:bg-black hover:text-white">Envoyer</button>
                    <FaDownload
                        className={iconStyles}
                        title="Télécharger"
                        onClick={(e) => {
                            e.stopPropagation(); // Empêche la propagation du clic pour éviter l'ouverture/fermeture de la carte
                            generatePDF(client, []);
                        }}
                    />
                    <FaEllipsisV className={iconStyles} title="Options" />
                </div>
                {isOpen && <div className="p-4 bg-gray-100 rounded mt-2">Détails supplémentaires pour {client.name}.</div>}
            </motion.div>
        </motion.div>
    );
};

// Données des clients triées par date
const clientData = [
    { date: "22 Août 2024", clients: [
            { id: 1, name: 'Alice Smith', address: '123 Rue Exemple', phone: '0123456789', email: 'alice@example.com' },
            { id: 2, name: 'Bob Johnson', address: '456 Rue Exemple', phone: '0987654321', email: 'bob@example.com' },
            { id: 3, name: 'Charlie Brown', address: '789 Rue Exemple', phone: '1234567890', email: 'charlie@example.com' }
        ]},
    { date: "31 Mai 2024", clients: [
            { id: 4, name: 'Jean Christophe', address: '101 Rue Exemple', phone: '1122334455', email: 'jean@example.com' },
            { id: 5, name: 'Jennie Fana', address: '202 Rue Exemple', phone: '5566778899', email: 'jennie@example.com' },
            { id: 6, name: 'Pierre Brown', address: '303 Rue Exemple', phone: '6677889900', email: 'pierre@example.com' }
        ]},
    { date: "15 Septembre 2024", clients: [
            { id: 7, name: 'Emily Davis', address: '404 Rue Exemple', phone: '7788990011', email: 'emily@example.com' },
            { id: 8, name: 'Michael Wilson', address: '505 Rue Exemple', phone: '8899001122', email: 'michael@example.com' },
            { id: 9, name: 'Sarah Brown', address: '606 Rue Exemple', phone: '9900112233', email: 'sarah@example.com' }
        ]},
    { date: "01 Octobre 2024", clients: [
            { id: 10, name: 'Daniel Lee', address: '707 Rue Exemple', phone: '1011121314', email: 'daniel@example.com' },
            { id: 11, name: 'Olivia Smith', address: '808 Rue Exemple', phone: '2122232425', email: 'olivia@example.com' },
            { id: 12, name: 'David Garcia', address: '909 Rue Exemple', phone: '3233343536', email: 'david@example.com' }
        ]}
];

// Composant principal pour afficher les listes de clients
const ListeClients = () => (
    <div className="min-h-screen bg-white p-4">
        <h1 className="text-5xl mb-4 my-10 text-center">Liste des Clients</h1>
        <div className="w-full flex flex-col items-center">
            {clientData.map(({ date, clients }) => (
                <div key={date} className="w-full max-w-screen-lg px-4 mb-6">
                    <motion.h3
                        className="text-xl my-5 border-b pb-2 border-gray-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >{date}</motion.h3>
                    <div className="space-y-5">
                        {clients.map((client) => <ClientCard key={client.id} client={client} />)}
                    </div>
                </div>
            ))}
            <div className="flex justify-center items-center mt-5 w-full">
                <button className="text-white border-2 rounded-full border-white py-4 px-5 bg-black hover:bg-opacity-50 hover:text-black w-2/6">
                    Afficher plus
                </button>
            </div>
        </div>
    </div>
);

export default ListeClients;
