import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { FaChartLine, FaShoppingCart, FaUser } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
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

    // Données pour les performances mensuelles
    const barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Chiffre d\'Affaires Mensuel (€)',
                data: [4000, 3000, 5000, 7000, 6000, 8000, 9000, 7500, 10000, 12000, 9000, 11000],
                backgroundColor: '#4CAF50',
            },
        ],
    };

    return (
        <div className="p-10 min-h-full w-full rounded-lg">
            <h1 className="text-3xl font-bold text-white mb-6">Tableau de Bord</h1>

            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-5 rounded-lg shadow-lg text-center flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Chiffre d'Affaires</h2>
                        <p className="text-xl text-green-500 mt-2 text-left">75,000€</p>
                    </div>
                    <FaChartLine className="text-green-500 text-4xl" />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg text-center flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Total des Ventes</h2>
                        <p className="text-xl text-blue-500 mt-2 text-left">150</p>
                    </div>
                    <FaShoppingCart className="text-blue-500 text-4xl" />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg text-center flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Clients Actifs</h2>
                        <p className="text-xl text-purple-500 mt-2 text-left">80</p>
                    </div>
                    <FaUser className="text-purple-500 text-4xl" />
                </div>
            </div>

            {/* Ajout du graphique en barres */}
            <div className="bg-white p-10 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Performances Mensuelles</h2>
                <Bar data={barData} options={{ responsive: true }} />
            </div>

            {/* Section avec statistiques détaillées */}
            <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-8">
                <div className="bg-white p-10 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Détail des Performances</h2>
                    <ul className="space-y-4">
                        <li className="flex items-center justify-between">
                            <span className="font-semibold text-gray-600">Meilleure Vente :</span>
                            <span className="font-bold text-gray-800">Design UI/UX - 50,000€</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="font-semibold text-gray-600">Nombre Total de Clients :</span>
                            <span className="font-bold text-gray-800">120</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="font-semibold text-gray-600">Taux de Conversion :</span>
                            <span className="font-bold text-gray-800">8%</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="font-semibold text-gray-600">Temps moyen de réponse :</span>
                            <span className="font-bold text-gray-800">24 heures</span>
                        </li>
                    </ul>
                </div>

                {/* Graphique en camembert */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Répartition des Ventes par Service</h2>
                    <Pie data={pieData} options={{ responsive: true }} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
