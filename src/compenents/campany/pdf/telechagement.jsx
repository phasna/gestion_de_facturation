// pdfUtils.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../../src/assets/img/logo_1.png';

// Fonction pour générer et télécharger le PDF
export const generatePDF = (client) => {
    const doc = new jsPDF();
    doc.setFontSize(13);

    doc.addImage(logo, 'PNG', 10, 0, 50, 50);

    doc.text('Information Entreprise:', 15, 50);
    doc.text(`Nom: ${client.entreprise}`, 15, 60);
    doc.text(`Adresse: ${client.entreprise_address}`, 15, 65);
    doc.text(`Téléphone: ${client.entreprise_phone}`, 15, 70);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, 75);

    doc.text('Information Client:', 150, 75);
    doc.text(`Nom: ${client.name}`, 150, 85);
    doc.text(`Adresse: ${client.address}`, 150, 90);
    doc.text(`Téléphone: ${client.phone}`, 150, 95);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 100);

    doc.text("Vous avez 15 jours pour régler la facture. En cas de retard, des frais supplémentaires de 15% du montant initial de la facture seront appliqués.", 150, 700);

    const tableColumn = ['Numéro_facture', 'Prestation', 'Quantité', 'Prix', 'TVA'];
    const tableRows = [
        ['0001', 'Développement Web', '1', '100', '20'],
        ['0002', 'Design', '2', '200', '40'],
        // Ajouter d'autres lignes si nécessaire
    ];

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 125,
        theme: 'striped',
    });

    const totalHT = tableRows.reduce((acc, row) => acc + parseFloat(row[3] || 0), 0);
    const totalTVA = tableRows.reduce((acc, row) => acc + parseFloat(row[4] || 0), 0);
    const totalTTC = totalHT + totalTVA;

    const totalsColumn = ['Total HT', 'Total TVA', 'Total TTC'];
    const totalsRows = [
        [`${totalHT.toFixed(2)} €`],
        [`${totalTVA.toFixed(2)} €`],
        [`${totalTTC.toFixed(2)} €`]
    ];

    doc.autoTable({
        head: [[ ...totalsColumn]],
        body: [[ ...totalsRows.flat()]],
        startY: doc.autoTable.previous.finalY + 10,
        theme: 'striped',
        margin: { top: 20 },
    });

    doc.setFontSize(8);

    const text = "Vous avez 15 jours pour régler la facture. En cas de retard, des frais supplémentaires de 15% du montant initial de la facture seront appliqués.";
    const pageWidth = doc.internal.pageSize.width;
    const margin = 10;
    const paddingX = 20;
    const lineWidth = pageWidth - 1 * paddingX;
    const yPosition = doc.internal.pageSize.height - margin;

    const lines = doc.splitTextToSize(text, lineWidth);

    lines.forEach((line, index) => {
        const textWidth = doc.getTextWidth(line);
        const xPosition = (pageWidth - textWidth) / 2;
        const yOffset = index * 10;
        doc.text(line, xPosition, yPosition + yOffset);
    });

    doc.save(`facturation_${client.id}.pdf`);
};

// Fonction pour visualiser le PDF dans une nouvelle fenêtre
export const viewPDF = (client) => {
    const doc = new jsPDF();
    doc.setFontSize(13);

    doc.addImage(logo, 'PNG', 10, 0, 50, 50);

    doc.text('Information Entreprise:', 15, 50);
    doc.text(`Nom: ${client.entreprise}`, 15, 60);
    doc.text(`Adresse: ${client.entreprise_address}`, 15, 65);
    doc.text(`Téléphone: ${client.entreprise_phone}`, 15, 70);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, 75);

    doc.text('Information Client:', 150, 75);
    doc.text(`Nom: ${client.name}`, 150, 85);
    doc.text(`Adresse: ${client.address}`, 150, 90);
    doc.text(`Téléphone: ${client.phone}`, 150, 95);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 100);

    doc.text("Vous avez 15 jours pour régler la facture. En cas de retard, des frais supplémentaires de 15% du montant initial de la facture seront appliqués.", 150, 700);

    const tableColumn = ['Numéro_facture', 'Prestation', 'Quantité', 'Prix', 'TVA'];
    const tableRows = [
        ['0001', 'Développement Web', '1', '100', '20'],
        ['0002', 'Design', '2', '200', '20'],
        // Ajouter d'autres lignes si nécessaire
    ];

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 125,
        theme: 'striped',
    });

    const totalHT = tableRows.reduce((acc, row) => acc + parseFloat(row[3] || 0), 0);
    const totalTVA = tableRows.reduce((acc, row) => acc + parseFloat(row[4] || 0), 0);
    const totalTTC = totalHT + totalTVA;

    const totalsColumn = ['Total HT', 'Total TVA', 'Total TTC'];
    const totalsRows = [
        [`${totalHT.toFixed(2)} €`],
        [`${totalTVA.toFixed(2)} €`],
        [`${totalTTC.toFixed(2)} €`]
    ];

    doc.autoTable({
        head: [[ ...totalsColumn]],
        body: [[ ...totalsRows.flat()]],
        startY: doc.autoTable.previous.finalY + 10,
        theme: 'striped',
        margin: { top: 20 },
    });

    doc.setFontSize(8);

    const text = "Vous avez 15 jours pour régler la facture. En cas de retard, des frais supplémentaires de 15% du montant initial de la facture seront appliqués.";
    const pageWidth = doc.internal.pageSize.width;
    const margin = 10;
    const paddingX = 20;
    const lineWidth = pageWidth - 1 * paddingX;
    const yPosition = doc.internal.pageSize.height - margin;

    const lines = doc.splitTextToSize(text, lineWidth);

    lines.forEach((line, index) => {
        const textWidth = doc.getTextWidth(line);
        const xPosition = (pageWidth - textWidth) / 2;
        const yOffset = index * 10;
        doc.text(line, xPosition, yPosition + yOffset);
    });

    doc.output('dataurlnewwindow');
};
