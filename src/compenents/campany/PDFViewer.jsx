import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PDFViewer from './PDFViewer'; // Assure-toi que le chemin est correct

const companyInfo = {
    name: "Entreprise Exemple",
    address: "123 Rue de la Facture, Ville, Pays",
    phone: "+123 456 789",
    email: "contact@entreprise.com"
};

// Exemple de données de prestations
const services = [
    { description: "Prestation A", quantity: 2, unitPrice: 50 },
    { description: "Prestation B", quantity: 1, unitPrice: 100 },
    { description: "Prestation C", quantity: 3, unitPrice: 20 }
];

const taxRate = 0.2; // 20%

const calculateTotals = (services, taxRate) => {
    const subtotal = services.reduce((total, service) => total + (service.quantity * service.unitPrice), 0);
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    return { subtotal, tax, total };
};

const Invoice = () => {
    const [showPdf, setShowPdf] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const clientId = queryParams.get('clientId');

    useEffect(() => {
        // Charger les données spécifiques au client ici
        console.log(`Client ID: ${clientId}`);
    }, [clientId]);

    const { subtotal, tax, total } = calculateTotals(services, taxRate);

    return (
        <div className="min-h-screen bg-white p-4">
            <h1 className="text-2xl mb-4">Facture</h1>

            <div className="mb-6">
                <h2 className="text-xl mb-2">Coordonnées de l'Entreprise</h2>
                <p>{companyInfo.name}</p>
                <p>{companyInfo.address}</p>
                <p>Téléphone: {companyInfo.phone}</p>
                <p>Email: {companyInfo.email}</p>
            </div>

            {/* Les informations du client pourraient être ajoutées ici */}

            <div className="mb-6">
                <h2 className="text-xl mb-2">Prestations</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Description</th>
                        <th className="border border-gray-300 p-2">Quantité</th>
                        <th className="border border-gray-300 p-2">Prix Unitaire</th>
                        <th className="border border-gray-300 p-2">Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {services.map((service, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-2">{service.description}</td>
                            <td className="border border-gray-300 p-2 text-center">{service.quantity}</td>
                            <td className="border border-gray-300 p-2 text-right">${service.unitPrice.toFixed(2)}</td>
                            <td className="border border-gray-300 p-2 text-right">${(service.quantity * service.unitPrice).toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="mb-6">
                <h2 className="text-xl mb-2">Résumé</h2>
                <div className="flex justify-between mb-2">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Tax ({(taxRate * 100).toFixed(0)}%):</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>

            <button
                className="text-white bg-black py-2 px-4 rounded hover:bg-gray-800"
                onClick={() => setShowPdf(true)}
            >
                Télécharger PDF
            </button>

            {showPdf && (
                <PDFViewer
                    fileUrl="/path/to/invoice.pdf" // Remplace par le chemin réel de ton fichier PDF
                    onClose={() => setShowPdf(false)}
                />
            )}

            <button
                className="mt-4 text-blue-500 hover:underline"
                onClick={() => navigate(-1)}
            >
                Retour
            </button>
        </div>
    );
};

export default Invoice;
