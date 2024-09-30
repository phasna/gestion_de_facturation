import { useState, useEffect } from 'react';
import { FaEye, FaDownload, FaEllipsisV } from 'react-icons/fa';
import { Line, Pie } from 'react-chartjs-2';

const Accueil = () => {
    const [clientsData, setClientsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Récupérer les données des clients et prestations depuis le backend
    useEffect(() => {
        fetch('http://127.0.0.1:8000/factures/client-prestations-data/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                return response.json();
            })
            .then(data => {
                setClientsData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Chargement des données...</div>;
    if (error) return <div>Erreur: {error}</div>;

    // Extraire les données nécessaires pour les graphiques
    const labels = clientsData.map(client => `${client.client_nom} ${client.client_prenom}`);
    const nombrePrestations = clientsData.map(client => client.nombre_prestations);
    const chiffreAffaires = clientsData.map(client => client.chiffre_affaires);

    // Graphique en ligne pour le chiffre d'affaires
    const lineData = {
        labels,
        datasets: [
            {
                label: 'Chiffre d\'Affaires',
                data: chiffreAffaires,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                fill: true,
            },
        ],
    };

    // Graphique circulaire pour le nombre de prestations
    const pieData = {
        labels,
        datasets: [
            {
                label: 'Nombre de Prestations',
                data: nombrePrestations,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9F40'],
                borderColor: '#fff',
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="flex min-h-screen text-xl p-4">
            <div className="flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-100 p-4 rounded shadow col-span-2">
                        <h2 className="text-xl font-bold mb-2">Statistiques du Chiffre d'Affaires</h2>
                        <div className="w-full">
                            <Line data={lineData} />
                        </div>
                    </div>

                    <div className="bg-gray-100 p-4 rounded shadow">
                        <h2 className="text-xl font-bold mb-2">Répartition des Prestations</h2>
                        <div className="w-full">
                            <Pie data={pieData} />
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl mb-4 text-black">Liste des Clients</h2>

                <div className="space-y-5">
                    {clientsData.map((client, index) => (
                        <div key={client.client_id} className="bg-gray-200 rounded shadow flex items-center justify-between p-4 space-x-4">
                            <div className="flex items-center space-x-4">
                                <img src={client.img || '/default_avatar.png'} alt="Client" className="w-16 h-16 rounded-full" />
                                <span className="text-lg">{client.client_nom} {client.client_prenom}</span>
                            </div>
                            <div className="flex items-center space-x-5">
                                <FaEye className="text-gray-600 cursor-pointer hover:text-blue-500" title="Voir" />
                                <FaDownload className="text-gray-600 cursor-pointer hover:text-green-500" title="Télécharger" />
                                <FaEllipsisV className="text-gray-600 cursor-pointer hover:text-blue-500" title="Options" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Accueil;
