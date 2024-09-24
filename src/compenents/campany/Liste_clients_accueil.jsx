// ClientList.jsx
import { useState } from "react";
import { FaDownload, FaEye, FaEllipsisV, FaTrash, FaEdit, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../../src/assets/img/logo_1.png";
import { clients } from "../ClientData/ClientsData.jsx"; // Import des données des clients

const iconStyles = "text-gray-600 cursor-pointer hover:text-blue-500";

// Fonction pour générer un PDF
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

    return doc;
};

const ClientCard = ({ client, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showActions, setShowActions] = useState(false);

    const handleViewPdf = () => {
        const pdfDoc = generatePDF(client);
        pdfDoc.output("dataurlnewwindow");
    };

    const handleDownloadPdf = (e) => {
        e.stopPropagation();
        const pdfDoc = generatePDF(client);
        pdfDoc.save(`facturation_${client.id}.pdf`);
    };

    const handleToggleActions = (e) => {
        e.stopPropagation();
        setShowActions(!showActions);
    };

    const handleToggleOpen = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            setShowActions(false);
        }
    };

    return (
        <div className="mb-4">
            <motion.div
                className="bg-gray-200 px-5 py-2 rounded shadow cursor-pointer w-full"
                onClick={handleToggleOpen}
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
                            title="Visualiser"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleViewPdf();
                            }}
                        />
                        <FaDownload
                            className={iconStyles}
                            title="Télécharger"
                            onClick={handleDownloadPdf}
                        />
                        <div className="relative">
                            <FaEllipsisV
                                className={iconStyles}
                                title="Options"
                                onClick={handleToggleActions}
                            />
                            {showActions && (
                                <div className="absolute right-0 top-full mt-2 flex flex-col bg-white shadow-lg p-2 rounded z-10">
                                    <div
                                        className="flex items-center justify-between cursor-pointer hover:text-red-500"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(client.id);
                                        }}
                                    >
                                        <FaTrash className={`${iconStyles} text-red-500`} title="Supprimer" />
                                        <span className="ml-2">Supprimer</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-2 hover:text-blue-500">
                                        <FaEdit className={`${iconStyles} text-blue-500`} title="Modifier" />
                                        <span className="ml-2">Modifier</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-2 hover:text-green-500">
                                        <FaEnvelope className={`${iconStyles} text-green-500`} title="Envoyer" />
                                        <span className="ml-2">Envoyer</span>
                                    </div>
                                </div>
                            )}
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
    const [visibleClients, setVisibleClients] = useState(2);

    const [clientData, setClientData] = useState(clients); // Utilisez les données importées

    const handleDeleteClient = (clientId) => {
        const updatedClients = clientData.filter((client) => client.id !== clientId);
        setClientData(updatedClients);
    };

    const handleSeeMore = () => {
        setVisibleClients(visibleClients + 5);
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-semibold mb-4 text-center mt-10">Liste rescences des Clients</h1>
            {/*<div className="mb-8 flex justify-end items-center space-x-2 mr-5">*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        placeholder="Rechercher des clients..."*/}
            {/*        className="border border-gray-300 rounded px-3 py-2 placeholder-gray-500 text-gray-900"*/}
            {/*        onChange={(e) => setSearchTerm(e.target.value)}*/}
            {/*    />*/}
            {/*    <IoSearchOutline className="text-gray-500" />*/}
            {/*</div>*/}

            {clientData
                .filter(client => client.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .slice(0, visibleClients)
                .map(client => (
                    <ClientCard key={client.id} client={client} onDelete={handleDeleteClient} />
                ))}

            {visibleClients < clientData.length && (
                <div className="flex justify-center mt-4">
                    <button onClick={handleSeeMore} className="text-white bg-black hover:bg-opacity-80 py-3 px-7 w-1/5 rounded-xl">
                        Voir plus clients
                    </button>
                </div>
            )}
        </div>
    );
};

export default ClientList;
