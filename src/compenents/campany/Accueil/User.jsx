import {  Bar } from 'react-chartjs-2';
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

    // Nouveau modèle de données pour les performances mensuelles
    const barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Chiffre d\'Affaires Mensuel (€)',
                data: [4500, 3500, 7500, 9000, 11000, 13000, 10000, 14000, 12000, 13000, 16000, 17000], // Valeurs modifiées
                backgroundColor: '#3b82f6', // Nouvelle couleur de fond
                borderColor: '#2563eb', // Couleur des bordures
                borderWidth: 2, // Épaisseur de la bordure
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


        </div>
    );
};

export default Dashboard;
