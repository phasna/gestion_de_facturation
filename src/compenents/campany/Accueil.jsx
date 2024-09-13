import { useState } from 'react';
import { FaEye, FaDownload, FaEllipsisV } from 'react-icons/fa';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import user_01 from '../../assets/img/user_1.png';
import user_02 from '../../assets/img/user_2.png';
import user_03 from '../../assets/img/user_3.png';
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
    <div className="bg-gray-200 rounded shadow flex items-center justify-between p-4 space-x-4">
        <div className="flex items-center space-x-4">
            <img src={client.img} alt="" className="w-16 h-16 rounded-full"/>
            <span className="text-lg">{client.name}</span>
        </div>
        <div className="flex items-center space-x-5">
            <FaEye className="text-gray-600 cursor-pointer hover:text-blue-500" title="Voir"/>
            <FaDownload className="text-gray-600 cursor-pointer hover:text-green-500" title="Télécharger"/>
            <FaEllipsisV className="text-gray-600 cursor-pointer hover:text-blue-500" title="Options"/>
        </div>
    </div>
);

const clients = [
    {id: 1, name: 'Alice Smith', img: user_01},
    {id: 2, name: 'Bob Johnson', img: user_02},
    {id: 3, name: 'Charlie Brown', img: user_03},
];

function Dashboard() {
    const [activeMenu, setActiveMenu] = useState('Home');

    return (
        <div className="flex  min-h-screen text-xl p-4">
            <div className="flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-100 p-4 rounded shadow col-span-2">
                        <h2 className="text-xl font-bold mb-2">Statistiques</h2>
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

                <h2 className="text-2xl mb-4 text-black">Liste des Clients</h2>

                <div className="space-y-5">
                    {clients.map((client) => (
                        <ClientCard key={client.id} client={client} />
                    ))}
                </div>

                <div className="flex justify-center items-center mt-5">
                    <Link to="/src/compenents/campany/Liste_clients" className="lg:w-1/5 sm:w-1/2 md:w-1/4">
                        <button
                            className="border-2 rounded-xl py-3 px-3 w-full border-black bg-black hover:bg-opacity-70 text-white flex items-center justify-center space-x-2">
                            <span className="text-lg">Afficher plus</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
