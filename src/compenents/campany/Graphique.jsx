import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [lineData, setLineData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Chiffre d\'Affaires',
                data: [],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                fill: true,
            },
        ],
    });

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: €${context.raw}`,
                },
            },
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
                    text: 'Montant (€)',
                },
                ticks: {
                    callback: (value) => `€${value}`,
                },
            },
        },
    };

    const translateMonth = (month) => {
        const monthTranslations = {
            January: 'Janvier',
            February: 'Février',
            March: 'Mars',
            April: 'Avril',
            May: 'Mai',
            June: 'Juin',
            July: 'Juillet',
            August: 'Août',
            September: 'Septembre',
            October: 'Octobre',
            November: 'Novembre',
            December: 'Décembre',
        };
        return monthTranslations[month] || month;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Appel de l'API pour récupérer les données
                const response = await axios.get('http://127.0.0.1:8000/api/chiffre-affaires-par-mois/');
                const data = response.data;

                if (data && data.length > 0) {
                    // Préparer les données pour Chart.js
                    const labels = data.map((entry) => translateMonth(entry.mois));
                    const values = data.map((entry) => entry.total_chiffre_affaires || 0);

                    setLineData({
                        labels: labels,
                        datasets: [
                            {
                                ...lineData.datasets[0],
                                data: values,
                            },
                        ],
                    });
                } else {
                    console.warn('Aucune donnée reçue pour le graphique. Vérifiez l\'API.');
                }
            } catch (error) {
                console.error('Erreur lors du chargement des données du graphique :', error);

                // Valeurs par défaut en cas d'erreur API
                setLineData({
                    labels: ['Janvier', 'Février', 'Mars'],
                    datasets: [
                        {
                            ...lineData.datasets[0],
                            data: [0, 0, 0],
                        },
                    ],
                });
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-10">
            <h2 className="text-2xl font-bold mb-4">Graphique des Revenus Mensuels</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <Line data={lineData} options={lineOptions} />
            </div>
        </div>
    );
};

export default Dashboard;
