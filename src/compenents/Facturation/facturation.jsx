import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Fonction pour générer et télécharger le PDF
const generatePDF = (client, services) => {
    const doc = new jsPDF();

    // Ajouter le logo de l'entreprise
    const logo = 'path/to/your/logo.png'; // Chemin vers votre logo
    doc.addImage(logo, 'PNG', 10, 10, 30, 30); // Position et taille du logo

    // Ajouter le titre de la facture
    doc.setFontSize(22);
    doc.text('Facture', 10, 50);

    // Ajouter les informations du client
    doc.setFontSize(12);
    doc.text(`Client: ${client.name}`, 10, 70);
    doc.text(`Adresse: ${client.address}`, 10, 80);
    doc.text(`Téléphone: ${client.phone}`, 10, 90);
    doc.text(`Email: ${client.email}`, 10, 100);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 110);

    // Ajouter une ligne de séparation
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1);
    doc.line(10, 115, 200, 115);

    // Ajouter le tableau des prestations
    const tableColumn = ['Prestation', 'Prix'];
    const tableRows = services.map(service => [service.name, service.price]);

    doc.autoTable({
        startY: 120,
        head: [tableColumn],
        body: tableRows,
        theme: 'striped',
        styles: {
            fontSize: 12,
            cellPadding: 5,
            valign: 'middle'
        },
        headStyles: {
            fillColor: [22, 160, 133] // Couleur d'arrière-plan des en-têtes
        },
        alternateRowStyles: {
            fillColor: [240, 240, 240] // Couleur d'arrière-plan des lignes alternées
        }
    });

    // Ajouter un sous-total, taxe et total
    const subtotal = services.reduce((sum, service) => sum + parseFloat(service.price), 0);
    const taxRate = 0.20; // Taxe à 20%
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    doc.setFontSize(12);
    doc.text(`Sous-total: ${subtotal.toFixed(2)} €`, 10, doc.autoTable.previous.finalY + 10);
    doc.text(`Taxe (20%): ${tax.toFixed(2)} €`, 10, doc.autoTable.previous.finalY + 20);
    doc.text(`Total: ${total.toFixed(2)} €`, 10, doc.autoTable.previous.finalY + 30);

    // Ajouter une note finale
    doc.setFontSize(10);
    doc.text('Merci pour votre achat!', 10, doc.autoTable.previous.finalY + 50);

    // Télécharge le PDF sous le nom 'facturation_clientid.pdf'
    doc.save(`facturation_${client.id}.pdf`);
};

// Exemple d'utilisation de la fonction
const exampleClient = {
    id: 1,
    name: 'Alice Smith',
    address: '123 Rue Exemple',
    phone: '0123456789',
    email: 'alice@example.com'
};

const exampleServices = [
    { name: 'Prestation 1', price: '100' },
    { name: 'Prestation 2', price: '200' }
];

// Composant pour afficher le bouton de génération du PDF
const Facturation = () => (
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Générer une Facture</h1>
        <button
            onClick={() => generatePDF(exampleClient, exampleServices)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Télécharger la Facture
        </button>
    </div>
);

export default Facturation;
