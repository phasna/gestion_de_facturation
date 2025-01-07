import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChartLine, FaShoppingCart, FaUser } from 'react-icons/fa';

const Dashboard = () => {
    const [chiffreAffairesTotal, setChiffreAffairesTotal] = useState(0);
    const [totalVentes, setTotalVentes] = useState(0);
    const [clientsActifs, setClientsActifs] = useState(0);

    // Charger les données
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [totalResponse, ventesResponse, clientsResponse] = await Promise.all([
                    axios.get('http://100.107.164.18:8000/api/chiffre-affaires-total/'), // Chiffre d'affaires total
                    axios.get('http://100.107.164.18:8000/api/total-ventes/'), // Total des ventes
                    axios.get('http://100.107.164.18:8000/api/clients-actifs/') // Clients actifs
                ]);

                setChiffreAffairesTotal(totalResponse.data.chiffre_affaires_total);
                setTotalVentes(ventesResponse.data.total_ventes);
                setClientsActifs(clientsResponse.data.clients_actifs);
            } catch (error) {
                console.error('Erreur lors du chargement des données :', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-10 min-h-full w-full rounded-lg">
            <h1 className="text-3xl font-bold text-white mb-6">Tableau de Bord</h1>

            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-5 rounded-lg shadow-lg text-center flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Chiffre d'Affaires</h2>
                        <p className="text-xl text-green-500 mt-2 text-left">{chiffreAffairesTotal}€</p>
                    </div>
                    <FaChartLine className="text-green-500 text-4xl" />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg text-center flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Total des Ventes</h2>
                        <p className="text-xl text-blue-500 mt-2 text-left">{totalVentes}</p>
                    </div>
                    <FaShoppingCart className="text-blue-500 text-4xl" />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-lg text-center flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Clients Actifs</h2>
                        <p className="text-xl text-purple-500 mt-2 text-left">{clientsActifs}</p>
                    </div>
                    <FaUser className="text-purple-500 text-4xl" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
