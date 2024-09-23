import { useState } from "react";
import { FaDownload, FaEllipsisV, FaEye, FaTrash, FaEdit, FaEnvelope } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../../src/assets/img/logo_1.png";
import user_01 from "../../assets/img/user_1.png";
import user_02 from "../../assets/img/user_2.png";
import user_03 from "../../assets/img/user_3.png";

import { Link } from "react-router-dom";

const iconStyles = "text-gray-600 cursor-pointer hover:text-blue-500";

const actionStyles = "absolute right-0 top-full mt-2 hidden group-hover:flex flex-col bg-white shadow-lg p-2 rounded";

const generatePDF = (client) => {
    const doc = new jsPDF();
    doc.setFontSize(13);
    doc.addImage(logo, "PNG", 10, 0, 50, 50);

    doc.text("Information Entreprise:", 15, 50);
    doc.text(`Nom: ${client.entreprise}`, 15, 60);
    doc.text(`Adresse: ${client.entreprise_address}`, 15, 65);
    doc.text(`Téléphone: ${client.entreprise_phone}`, 15, 70);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, 75);

    doc.text("Information Client:", 150, 75);
    doc.text(`Nom: ${client.name}`, 150, 85);
    doc.text(`Adresse: ${client.address}`, 150, 90);
    doc.text(`Téléphone: ${client.phone}`, 150, 95);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 100);

    const tableColumn = ["Numéro_facture", "Prestation", "Quantité", "Prix", "TVA"];
    const tableRows = [
        ["0001", "Développement Web", "1", "100", "20"],
        ["0002", "Design", "2", "200", "40"],
        ["0003", "Back-end", "2", "200", "40"],
    ];

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 125,
        theme: "striped",
    });

    const totalHT = tableRows.reduce((acc, row) => acc + parseFloat(row[3] || 0), 0);
    const totalTVA = tableRows.reduce((acc, row) => acc + parseFloat(row[4] || 0), 0);
    const totalTTC = totalHT + totalTVA;

    const totalsColumn = ["Total HT", "Total TVA", "Total TTC"];
    const totalsRows = [[`${totalHT.toFixed(2)} €`, `${totalTVA.toFixed(2)} €`, `${totalTTC.toFixed(2)} €`]];

    doc.autoTable({
        head: [totalsColumn],
        body: totalsRows,
        startY: doc.autoTable.previous.finalY + 10,
        theme: "striped",
    });

    doc.save(`facturation_${client.id}.pdf`);
};

const ClientCard = ({ client }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleViewPdf = () => {
        generatePDF(client);
    };

    return (
        <div>
            <motion.div
                className="bg-gray-200 px-5 py-2 rounded shadow cursor-pointer w-full"
                onClick={() => setIsOpen(!isOpen)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center mb-3">
                    <img src={client.img} alt={client.name} className="w-20 h-20" /> {client.name}
                </div>
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex space-x-7 mb-3 justify-end">
                        <FaEye
                            className={iconStyles}
                            title="Voir"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleViewPdf();
                            }}
                        />
                        <FaDownload
                            className={iconStyles}
                            title="Télécharger"
                            onClick={(e) => {
                                e.stopPropagation();
                                generatePDF(client);
                            }}
                        />
                        <div className="relative group">
                            <FaEllipsisV className={iconStyles} title="Options" />
                            <div className={`${actionStyles}`}>
                                <div className="flex items-center justify-between">
                                    <FaTrash className={`${iconStyles} text-red-500`} title="Supprimer" />
                                    <span className="ml-2">Supprimer</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <FaEdit className={`${iconStyles} text-blue-500`} title="Modifier" />
                                    <span className="ml-2">Modifier</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <FaEnvelope className={`${iconStyles} text-green-500`} title="Envoyer" />
                                    <span className="ml-2">Envoyer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isOpen && (
                        <div className="p-4 bg-gray-100 rounded mt-2">
                            {client.name}, {client.detail}.
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
};

const ClientList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleClients, setVisibleClients] = useState(3);

    const clientData = [
        {
            date: "22 Août 2024",
            clients: [
                { id: 1, name: "Alice Smith", address: "123 Rue Exemple", phone: "0123456789", img: user_01, email: "alice@example.com", detail: "Demande de devis.", entreprise: "dpdev", entreprise_address: "1 allée des chemin", entreprise_phone: "0654324561" },
                { id: 2, name: "Aun Phasna", address: "456 Rue Exemple", phone: "0987654321", img: user_02, email: "bob@example.com", detail: "Demande de devis.", entreprise: "dpdev", entreprise_address: "1 allée des chemin", entreprise_phone: "0654324561" },
                { id: 3, name: "Saleh", address: "456 Rue Exemple", phone: "0987654321", img: user_03, email: "bob@example.com", detail: "Demande de devis.", entreprise: "dpdev", entreprise_address: "1 allée des chemin", entreprise_phone: "0654324561" },
                { id: 4, name: "Ziad", address: "456 Rue Exemple", phone: "0987654321", img: user_01, email: "bob@example.com", detail: "Demande de devis.", entreprise: "dpdev", entreprise_address: "1 allée des chemin", entreprise_phone: "0654324561" },
                { id: 5, name: "Christine Jean", address: "456 Rue Exemple", phone: "0987654321", img: user_02, email: "bob@example.com", detail: "Demande de devis.", entreprise: "dpdev", entreprise_address: "1 allée des chemin", entreprise_phone: "0654324561" },
                { id: 6, name: "Davith Cruz", address: "456 Rue Exemple", phone: "0987654321", img: user_03, email: "bob@example.com", detail: "Demande de devis.", entreprise: "dpdev", entreprise_address: "1 allée des chemin", entreprise_phone: "0654324561" },
                { id: 7, name: "Ophélie Cruz", address: "456 Rue Exemple", phone: "0987654321", img: user_02, email: "bob@example.com", detail: "Demande de devis.", entreprise: "dpdev", entreprise_address: "1 allée des chemin", entreprise_phone: "0654324561" },
                { id: 8, name: "Remon Cruz", address: "101 Rue Exemple", phone: "1122334455", img: user_01, email: "jean@example.com", detail: "Demande de devis.", entreprise: "dpdev", entreprise_address: "1 allée des chemin", entreprise_phone: "0654324561" },
                { id: 9, name: "Stéfanie Juphie", address: "202 Rue Exemple", phone: "5566778899", img: user_02, email: "sophie@example.com", detail: "Demande de devis.", entreprise: "dpdev", entreprise_address: "1 allée des chemin", entreprise_phone: "0654324561" },
                { id: 10, name: "Laurent Nizere", address: "303 Rue Exemple", phone: "6677889900", img: user_03, email: "laurent@example.com", detail: "Demande de devis.", entreprise: "dpdev", entreprise_address: "1 allée des chemin", entreprise_phone: "0654324561" },
                { id: 10, name: "Laurent Nizere", address: "303 Rue Exemple", phone: "6677889900", img: user_03, email: "laurent@example.com", detail: "Demande de devis.", entreprise: "dpdev", entreprise_address: "1 allée des chemin", entreprise_phone: "0654324561" },

            ],
        },

    ];

    const filteredClients = clientData
        .flatMap(group => group.clients)
        .filter(client =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.phone.includes(searchTerm)
        );

    const loadMoreClients = () => {
        setVisibleClients((prev) => prev + 5);
    };

    return (
        <div className="p-4">
            <div className="flex items-center space-x-2 mb-4">
                <IoSearchOutline className="text-xl" />
                <input
                    type="text"
                    placeholder="Rechercher un client"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded"
                />
            </div>
            <h2 className="text-center text-2xl font-bold mb-4">Liste des Clients</h2>
            {clientData.map((group, index) => (
                <div key={index}>
                    <h3 className="text-lg font-semibold mb-2">{group.date}</h3>
                    {filteredClients.length > 0 ? (
                        <div className="grid gap-4">
                            {filteredClients.slice(0, visibleClients).map((client) => (
                                <ClientCard key={client.id} client={client} />
                            ))}
                        </div>
                    ) : (
                        <p>Aucun client trouvé.</p>
                    )}
                    {filteredClients.length > visibleClients && (
                        <Link to="/liste_clients">
                        <div className="flex justify-center mt-4">
                            <button className="text-white bg-black hover:bg-opacity-80 py-3 px-7 w-1/5 rounded-xl">
                                Voir plus clients
                            </button>
                        </div>
                        </Link>

                    )}
                </div>
            ))}
        </div>
    );
};

export default ClientList;
