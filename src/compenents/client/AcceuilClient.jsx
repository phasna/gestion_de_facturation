import React, { useState, useEffect } from 'react';
import { FaUser, FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaEye, FaDownload, FaEllipsisV } from 'react-icons/fa'; // Ajout des icônes supplémentaires
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



// Les données des projets
const projects = [
    {
        id: 1,
        title: 'Titre 1',
        description: 'Description 1',
        price: '1000 €',
        color: 'bg-white', // Couleur de fond
        textColor: 'text-black', // Couleur du texte
    },
    {
        id: 2,
        title: 'Titre 2',
        description: 'Description 2',
        price: '8900,55 €',
        color: 'bg-green-200',
        textColor: 'text-black',
    },
    {
        id: 3,
        title: 'Titre 3',
        description: 'Description 3',
        price: '4350,77 €',
        color: 'bg-yellow-200',
        textColor: 'text-black',
    },
    {
        id: 4,
        title: 'Titre 4',
        description: 'Description 4',
        price: '1250 €',
        color: 'bg-blue-200',
    },
    {
        id: 5,
        title: 'Titre 5',
        description: 'Description 5',
        price: '6350,55 €',
        color: 'bg-pink-200',
    },
    {
        id: 6,
        title: 'Titre 6',
        description: 'Description 6',
        price: '2390,99 €',
        color: 'bg-purple-200',
    },
];







// eslint-disable-next-line react/prop-types
const ClientCard = ({ client }) => (

    <div className="bg-gray-200 p-4 rounded shadow flex items-center justify-between">
        <div className="flex items-center">
            <FaUser className="text-blue-500 mr-5" />
            {client.name}
        </div>
        <div className="flex space-x-7">
            <FaEye className="text-gray-600 cursor-pointer hover:text-blue-500" title="Voir" />
            <FaDownload className="text-gray-600 cursor-pointer hover:text-green-500" title="Télécharger" />

        </div>
    </div>
);

const projectRealiser = [
    { id: 1, name: 'Projet 1' },
    { id: 2, name: 'Projet 2' },
    { id: 3, name: 'Projet 3' },
];

function Dashboard() {

    const [currentIndex, setCurrentIndex] = useState(0);

    // Faire défiler automatiquement toutes les 3 secondes
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === Math.ceil(projects.length / 3) - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Toutes les 3 secondes

        return () => clearInterval(interval); // Nettoyer à la fin
    }, []);

    const angle = 360 / projects.length;

    //style={{transform: `translateX(-${currentIndex * 100}%)`}}

    return (
        <div className="flex items-center space-y-5 min-h-screen text-3xl relative overflow-hidden">
            <div className="w-full">
                <h2 className="text-4xl">Projets réalisés</h2>
                <div className="overflow-hidden w-full">
                    {/* Conteneur pour le carrousel avec transition */}
                    <div
                        className="flex transition-transform duration-1000 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * 55.99}%)`,
                            width: `${(projects.length / 3) * 100}%`, // Assure que la largeur soit correcte
                        }}
                    >
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className={`flex-none w-1/4 p-5 ${project.color} rounded-lg shadow-md mx-3`}
                                style={{ minWidth: '300px', maxWidth: '300px', border: '1px solid black' }}
                            >
                                <img
                                    src="https://via.placeholder.com/50"
                                    alt="Icône"
                                    className="mb-4"
                                />
                                <h3 className="text-xl font-semibold text-black">{project.title}</h3>
                                <p className="text-sm text-black">{project.description}</p>
                                <div className="mt-auto pt-2 border-t w-full">
                                    <p className="text-xl font-bold text-black">{project.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <h2 className="text-4xl mb-4 text-black my-10">Projets</h2>
                <p>Aujourd'hui 08-2024</p>

                <div className="space-y-5 mt-4">
                    {/* Affichage d'autres projets */}
                    {projectRealiser.map((client) => (
                        <ClientCard key={client.id} client={client} />
                    ))}
                </div>
                <div className="flex justify-center items-center mt-5">
                    <button
                        className="text-white border-2 rounded-full border-white py-4 px-5 bg-black hover:bg-opacity-50 hover:text-black text-center w-2/6">
                        Afficher plus
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
