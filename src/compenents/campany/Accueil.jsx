
import ListeClients  from "./Liste_clients_accueil.jsx";
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

import { Link } from 'react-router-dom';

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



const pieData = {
    labels: ['Développement web', 'Design', 'Réseaux'],
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



function Dashboard() {

    return (
        <div className="flex  min-h-screen text-xl p-4">
            <div className="flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-100 p-4 rounded shadow col-span-2">
                        <h2 className="text-xl font-bold mb-2">Statistiques des revenues</h2>
                        <div className="w-full">
                            <Line data={lineData} options={lineOptions} />
                        </div>
                    </div>

                    <div className="bg-gray-100 p-4 rounded shadow">
                        <h2 className="text-xl font-bold mb-2">Répartition du Chiffre d'Affaires</h2>
                        <div className="w-full">
                            <Pie data={pieData} options={pieOptions} />
                        </div>
                    </div>
                </div>
                <div className="space-y-5">
                {/*<ListeClients />*/}
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
