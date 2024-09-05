import { useState } from 'react';
import { FaUser, FaSignOutAlt, FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaEye, FaDownload, FaEllipsisV } from 'react-icons/fa'; // Ajout des icônes supplémentaires
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

import { CgProfile } from "react-icons/cg";

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

// Composant réutilisable pour afficher un client sur une seule ligne avec les icônes à droite
const ClientCard = ({ client }) => (
    <div className="bg-gray-200 p-4 rounded shadow flex items-center justify-between">
        {/* Partie gauche avec l'icône utilisateur et le nom */}
        <div className="flex items-center">
            <FaUser className="text-blue-500 mr-5" />
            {client.name}
        </div>
        {/* Partie droite avec les icônes supplémentaires */}
        <div className="flex space-x-7">
            <FaEye className="text-gray-600 cursor-pointer hover:text-blue-500" title="Voir" /> {/* Icône "œil" */}
            <button className={"text-sm border-2 rounded-full border-black px-5 py-1 hover:bg-black hover:text-white "}>Envoyer</button>
            <FaDownload className="text-gray-600 cursor-pointer hover:text-green-500" title="Télécharger" /> {/* Icône "Télécharger" */}
            <FaEllipsisV className="text-gray-600 cursor-pointer hover:text-gray-900" title="Options" /> {/* Icône de trois boutons */}
        </div>
    </div>
);

// Données fictives pour les clients
const clients = [
    { id: 1, name: 'Alice Smith' },
    { id: 2, name: 'Bob Johnson' },
    { id: 3, name: 'Charlie Brown' },
];

function Dashboard() {
    const [activeMenu, setActiveMenu] = useState('Home'); // État pour le menu actif

    return (
        <div className="flex min-h-screen bg-black text-3xl relative">
            {/* Icône de profilr en haut à droite */}
            <div className="absolute top-4 right-10 text-white">
                <CgProfile className="text-5xl cursor-pointer" />
            </div>

            {/* Menu à gauche */}
            <div className="w-1/4 bg-white text-white max-h-screen p-4 mt-[155px] rounded-r-3xl">
                {/* Logo en haut du menu */}
                <div className="text-center mb-10">
                    <a href="#" className="text-3xl text-black font-bold">Logo</a>
                </div>

                <div className="flex flex-col">
                    <button className="border-2 rounded-full m-5 p-5 hover:bg-opacity-30 bg-black text-white hover:text-black">
                        Ajouter un client +
                    </button>
                </div>
                <ul className="space-y-2 text-black">
                    <li>
                        <a
                            href="#"
                            className={`flex items-center p-5 rounded-full ${activeMenu === 'Home' ? 'bg-gray-400' : 'hover:bg-[#d9d9d9]'}`}
                            onClick={() => setActiveMenu('Home')}
                        >
                            <FaHome className="mr-3" /> {/* Icône pour Home */}
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={`flex items-center p-5 rounded-full ${activeMenu === 'About' ? 'bg-gray-400' : 'hover:bg-[#d9d9d9]'}`}
                            onClick={() => setActiveMenu('About')}
                        >
                            <FaInfoCircle className="mr-3" /> {/* Icône pour About */}
                            About
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={`flex items-center p-5 rounded-full ${activeMenu === 'Services' ? 'bg-gray-400' : 'hover:bg-[#d9d9d9]'}`}
                            onClick={() => setActiveMenu('Services')}
                        >
                            <FaServicestack className="mr-3" /> {/* Icône pour Services */}
                            Services
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={`flex items-center p-5 rounded-full ${activeMenu === 'Contact' ? 'bg-gray-400' : 'hover:bg-[#d9d9d9]'}`}
                            onClick={() => setActiveMenu('Contact')}
                        >
                            <FaEnvelope className="mr-3" /> {/* Icône pour Contact */}
                            Contact
                        </a>
                    </li>
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
                <h2 className="text-4xl mb-4 text-white my-10">Liste des Clients</h2>

                {/* Liste des clients avec icônes à droite */}
                <div className="space-y-5">
                    {clients.map((client) => (
                        <ClientCard key={client.id} client={client} />
                    ))}
                </div>
                <div className={"flex justify-center items-center mt-5 "}>
                    <button className={"text-white border-2 rounded-full border-white py-4 px-5 bg-transparent hover:bg-white hover:text-black text-center w-2/6"}>Afficher plus</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
