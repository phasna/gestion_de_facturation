import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

const Dashboard = () => {
    // Données pour le graphique à barres (Chiffre d'affaires)
    const barData = {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
        datasets: [
            {
                label: 'Chiffre d\'affaires (€)',
                data: [12000, 15000, 11000, 17000, 18000, 16000],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Données pour le graphique en camembert (Répartition des ventes)
    const pieData = {
        labels: ['Service A', 'Service B', 'Service C'],
        datasets: [
            {
                label: 'Répartition des Ventes',
                data: [30000, 50000, 20000],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    // Données pour les meilleures prestations vendues
    const topPrestation = [
        { id: 1, nom: 'Service A', ventes: 30000, prix: '50€', couleur: 'bg-red-200' },
        { id: 2, nom: 'Service B', ventes: 50000, prix: '75€', couleur: 'bg-blue-200' },
        { id: 3, nom: 'Service C', ventes: 20000, prix: '100€', couleur: 'bg-yellow-200' },
    ];

    return (
        <div className="p-10 min-h-full w-full bg-gray-100 rounded-lg ">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Tableau de Bord</h1>

            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-2 rounded-lg shadow-lg text-center">
                    <h2 className="text-lg font-bold text-gray-800">Chiffre d'Affaires</h2>
                    <p className="text-xl text-green-500 mt-2">75,000€</p>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-lg text-center">
                    <h2 className="text-lg font-bold text-gray-800">Total des Ventes</h2>
                    <p className="text-xl text-blue-500 mt-2">150</p>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-lg text-center">
                    <h2 className="text-lg font-bold text-gray-800">Clients Actifs</h2>
                    <p className="text-xl text-purple-500 mt-2">80</p>
                </div>
            </div>

            {/* Graphiques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Chiffre d'Affaires Mensuel</h2>
                    <Bar data={barData} options={{ responsive: true }} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Répartition des Ventes par Service</h2>
                    <Pie data={pieData} options={{ responsive: true }} />
                </div>
            </div>

            {/* Meilleures Prestations Vendues */}
            <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Top 3 des Meilleures Prestations Vendues</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {topPrestation.map((prestation) => (
                        <div key={prestation.id} className={`${prestation.couleur} p-4 rounded-lg shadow-md text-center`}>
                            <h3 className="text-lg font-bold text-gray-800">{prestation.nom}</h3>
                            <p className="text-gray-600 mt-2">Ventes : {prestation.ventes}€</p>
                            <p className="text-gray-600">Prix moyen : {prestation.prix}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
