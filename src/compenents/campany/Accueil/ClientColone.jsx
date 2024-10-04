import { CgProfile } from "react-icons/cg";
import { FaBox, FaEdit, FaTrashAlt, FaEuroSign } from 'react-icons/fa'; // Import des icônes

const StockedBoxes = () => {
    const users = [
        { id: 1, nom: 'Dupont', prenom: 'Jean', service: 'Stockage Simple', prix: '50€' },
        { id: 2, nom: 'Martin', prenom: 'Lucie', service: 'Stockage Longue Durée', prix: '100€' },
        { id: 3, nom: 'Durand', prenom: 'Alice', service: 'Garde-Meuble', prix: '75€' },
    ];

    // Tableau de couleurs à appliquer
    const colors = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200'];

    return (
        <div className="p-10 w-full bg-gray-100 rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestion des Boîtes Stockées</h1>

            {/* Grille de cartes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 p-10">
                {users.map((user, index) => (
                    <div
                        key={user.id}
                        className={`${colors[index % colors.length]} bg-opacity-60 backdrop-blur-lg p-6 rounded-lg shadow-lg`}
                    >
                        {/* Header avec icône et nom */}
                        <div className="flex items-center mb-4">
                            <CgProfile className="text-green-500 text-2xl mr-3" /> {/* Icône Boîte */}
                            <h2 className="text-xl font-bold text-gray-800">
                                {user.prenom} {user.nom}
                            </h2>
                        </div>

                        {/* Service avec icône */}
                        <p className="text-gray-600 flex items-center mb-4">
                            <FaBox className="text-blue-500 mr-2" /> {/* Icône du service */}
                            <span className="font-semibold">Service : </span>{user.service}
                        </p>

                        {/* Prix avec icône */}
                        <p className="text-gray-600 flex items-center mb-4">
                            <FaEuroSign className="text-green-500 mr-2" /> {/* Icône Euro */}
                            <span className="font-semibold">Prix : </span>{user.prix}
                        </p>

                        {/* Boutons d'actions */}
                        <div className="flex justify-between items-center">
                            <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                                <FaEdit className="mr-2" /> {/* Icône Modifier */}
                                Modifier
                            </button>
                            <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                                <FaTrashAlt className="mr-2" /> {/* Icône Supprimer */}
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StockedBoxes;
