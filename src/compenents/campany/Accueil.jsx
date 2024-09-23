import { useState } from 'react';
import { FaUser, FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaEye, FaDownload, FaEllipsisV } from 'react-icons/fa'; // Ajout des icônes supplémentaires
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

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

const ClientCard = ({ client }) => (
    <div className="bg-gray-200 p-4 rounded shadow flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <FaUser className="text-blue-500"/>
            <span>{client.name}</span>
        </div>
        <div className="flex items-center space-x-4">
            <FaEye className="text-gray-600 cursor-pointer hover:text-blue-500" title="Voir"/>
            <button className="text-sm border-2 border-black rounded-full px-4 py-1 hover:bg-black hover:text-white">
                Envoyer
            </button>
            <FaDownload className="text-gray-600 cursor-pointer hover:text-green-500" title="Télécharger"/>
            <FaEllipsisV className="text-gray-600 cursor-pointer hover:text-gray-900" title="Options"/>
        </div>
    </div>

);

const clients = [
    {id: 1, name: 'Alice Smith'},
    {id: 2, name: 'Bob Johnson'},
    {id: 3, name: 'Charlie Brown'},
];

function Dashboard() {
    const [activeMenu, setActiveMenu] = useState('Home');

    return (
        <div className="flex min-h-screen  text-3xl relative">
            <div className="flex-1">
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-100 p-20 rounded shadow col-span-2">
                        <h2 className="text-xl font-bold mb-2">Statistiques</h2>
                        <div className="flex-grow">
                            <Line data={lineData} options={lineOptions}/>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-20 rounded shadow">
                        <h2 className="text-xl font-bold mb-2">Répartition du Chiffre d'Affaires</h2>
                        <div className="flex-grow">
                            <Pie data={pieData} options={pieOptions}/>
                        </div>
                    </div>
                </div>

                <h2 className="text-4xl mb-4 text-black my-10">Liste des Clients</h2>

                <div>
                    <div className="space-y-5 text-xl">
                        {clients.map((client) => (
                            <ClientCard key={client.id} client={client}/>
                        ))}
                    </div>

                </div>
                <div className="flex justify-center items-center mt-5 w-full">
                    <button
                        className="text-white border-2 rounded-full border-white py-3 bg-black hover:bg-opacity-50 hover:text-black w-2/6">
                        Afficher plus
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
