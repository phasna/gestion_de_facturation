// Facturation.jsx
import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Fonction pour générer et télécharger le PDF
const generatePDF = (client, services) => {
    const doc = new jsPDF();
    doc.text('Facturation', 10, 10);

    // Informations de l'entreprise
    doc.text('Nom de l\'entreprise', 10, 20);
    doc.text('Adresse de l\'entreprise', 10, 30);
    doc.text('Téléphone: (123) 456-7890', 10, 40);
    doc.text('Email: contact@entreprise.com', 10, 50);
    // Ajoute un logo si nécessaire
    // doc.addImage('logo.png', 'PNG', 150, 10, 50, 20);

    // Informations du client
    doc.text('Client: ' + client.name, 10, 70);
    doc.text('Adresse: ' + client.address, 10, 80);
    doc.text('Téléphone: ' + client.phone, 10, 90);
    doc.text('Email: ' + client.email, 10, 100);

    // Table des prestations
    const tableColumn = ['Prestation', 'Description', 'Quantité', 'Prix Unitaire', 'Total'];
    const tableRows = services.map(service => [
        service.name,
        service.description,
        service.quantity,
        service.unitPrice.toFixed(2),
        (service.quantity * service.unitPrice).toFixed(2)
    ]);

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 110,
        theme: 'striped',
    });

    // Sous-total, taxe, et total final
    const subTotal = services.reduce((sum, service) => sum + (service.quantity * service.unitPrice), 0);
    const tax = subTotal * 0.20;
    const total = subTotal + tax;

    doc.text(`Sous-total: ${subTotal.toFixed(2)} €`, 10, doc.autoTable.previous.finalY + 10);
    doc.text(`Taxe (20%): ${tax.toFixed(2)} €`, 10, doc.autoTable.previous.finalY + 20);
    doc.text(`Total Final: ${total.toFixed(2)} €`, 10, doc.autoTable.previous.finalY + 30);

    doc.save(`facturation_${client.name}.pdf`);
};

// Composant de facturation
const Facturation = ({ client, services }) => (
    <div className="p-4 max-w-2xl mx-auto bg-white shadow-md rounded">
        <div className="text-center mb-4">
            <h1 className="text-3xl font-bold">Facturation</h1>
        </div>
        <div className="mb-6">
            <div className="flex justify-between mb-6">
                <div>
                    <h2 className="text-xl font-semibold">Entreprise</h2>
                    <p>Nom de l'entreprise</p>
                    <p>Adresse de l'entreprise</p>
                    <p>Téléphone: (123) 456-7890</p>
                    <p>Email: contact@entreprise.com</p>
                </div>
                <div>
                    <img src="logo.png" alt="Logo Entreprise" className="w-24 h-24" />
                </div>
            </div>
            <div>
                <h2 className="text-xl font-semibold">Client</h2>
                <p>Nom: {client.name}</p>
                <p>Adresse: {client.address}</p>
                <p>Téléphone: {client.phone}</p>
                <p>Email: {client.email}</p>
            </div>
        </div>
        <div className="mb-6">
            <h2 className="text-xl font-semibold">Détails des prestations</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                <tr>
                    <th className="border px-4 py-2">Prestation</th>
                    <th className="border px-4 py-2">Description</th>
                    <th className="border px-4 py-2">Quantité</th>
                    <th className="border px-4 py-2">Prix Unitaire</th>
                    <th className="border px-4 py-2">Total</th>
                </tr>
                </thead>
                <tbody>
                {services.map((service, index) => (
                    <tr key={index}>
                        <td className="border px-4 py-2">{service.name}</td>
                        <td className="border px-4 py-2">{service.description}</td>
                        <td className="border px-4 py-2">{service.quantity}</td>
                        <td className="border px-4 py-2">{service.unitPrice.toFixed(2)} €</td>
                        <td className="border px-4 py-2">{(service.quantity * service.unitPrice).toFixed(2)} €</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        <div className="text-right">
            <button
                onClick={() => generatePDF(client, services)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Télécharger PDF
            </button>
        </div>
    </div>
);

export default Facturation;
