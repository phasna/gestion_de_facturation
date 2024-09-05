// src/components/Dashboard.js
import { FaUser } from 'react-icons/fa';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

// Données pour le graphique linéaire (chiffre d'affaires par mois)
const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            label: 'Chiffre d\'Affaires',
            data: [3000, 2000, 1500, 2000, 2500, 3000],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            fill: true,
        },
    ],
};

const lineOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    return context.dataset.label + ': $' + context.raw;
                }
            }
        }
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Mois',
            },
        },
        y: {
            title: {
                display: true,
                text: 'Montant',
            },
            ticks: {
                callback: function(value) {
                    return '$' + value;
                }
            }
        }
    }
};

// Données pour le graphique camembert (répartition du chiffre d'affaires)
const pieData = {
    labels: ['Produit A', 'Produit B', 'Produit C'],
    datasets: [
        {
            label: 'Répartition du Chiffre d\'Affaires',
            data: [40, 30, 30],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderColor: '#fff',
            borderWidth: 2,
        },
    ],
};

const pieOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    return context.label + ': $' + context.raw;
                }
            }
        }
    }
};

// Composant réutilisable pour afficher un client
const ClientCard = ({ client }) => (
    <div className="bg-gray-200 p-4 rounded-full shadow">
        <div className="flex items-center mb-2">
            <FaUser className="text-blue-500 mr-5"/>
            {client.name}
        </div>
    </div>
);

// Données fictives pour les statistiques et le chiffre d'affaires
const statistics = {
    totalClients: 120,
    totalRevenue: '$34,000',
};

const clients = [
    { id: 1, name: 'Alice Smith' },
    { id: 2, name: 'Bob Johnson' },
    { id: 3, name: 'Charlie Brown' },
];

function Dashboard() {
    return (
        <div className="flex min-h-screen bg-black text-3xl">
            {/* Menu à gauche */}
            <div className="w-1/4 bg-white text-white h-screen p-4">
                <div className="flex flex-col">
                    <a href="#" className="my-10 text-black">Logo</a>
                    <button className="border-2 rounded-full m-5 p-5 hover:bg-opacity-30 bg-black text-white hover:text-black">
                        Ajouter un client +
                    </button>
                </div>
                <ul className="space-y-2 text-black">
                    <li><a href="#" className="block p-5 hover:bg-[#d9d9d9] rounded-full">Home</a></li>
                    <li><a href="#" className="block p-5 hover:bg-[#d9d9d9] rounded-full">About</a></li>
                    <li><a href="#" className="block p-5 hover:bg-[#d9d9d9] rounded-full">Services</a></li>
                    <li><a href="#" className="block p-5 hover:bg-[#d9d9d9] rounded-full">Contact</a></li>
                </ul>
            </div>

            {/* Contenu principal */}
            <div className="flex-1 p-20">
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {/* Première colonne avec graphique linéaire (plus large) */}
                    <div className="bg-gray-100 p-20 rounded shadow col-span-2">
                        <h2 className="text-xl font-bold mb-2">Statistiques</h2>
                        <div className="flex-grow">
                            <Line data={lineData} options={lineOptions} />
                        </div>
                    </div>

                    {/* Deuxième colonne avec graphique camembert (plus étroite) */}
                    <div className="bg-gray-100 p-20 rounded shadow">
                        <h2 className="text-xl font-bold mb-2">Répartition du Chiffre d'Affaires</h2>
                        <div className="flex-grow">
                            <Pie data={pieData} options={pieOptions} />
                        </div>
                    </div>
                </div>
                <h2 className="text-5xl font-bold mb-4 text-white my-10">Liste des Clients</h2>

                {/* Liste des clients */}
                <div className="space-y-5">
                    <ClientCard client={clients[0]} />
                    <ClientCard client={clients[1]} />
                    <ClientCard client={clients[2]} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
