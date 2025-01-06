import AccueilImage from "../campany/AccueilImage.jsx";
import User from "../campany/Accueil/User.jsx";
import Client from "../campany/Accueil/ClientColone.jsx";
import Graphique from "../campany/Graphique.jsx"; // Import du fichier Graphique.jsx

const Accueil = () => {
    return (
        <div className={"p-10 min-h-screen bg-gradient-to-r from-blue-500 to-purple-600"}>
            <h1 className={"text-white text-center text-4xl mb-6 font-bold"}>Gestion des facturations</h1>

            {/* Section Tableau de Bord */}
            <User />

            {/* Section Graphiques */}
            <div className="mt-10">
                <h2 className="text-white text-2xl font-bold mb-4">Performances et Statistiques</h2>
                <Graphique />
            </div>

            {/* Section Historique des Clients */}
            <div className="mt-10">
                <h2 className="text-white text-2xl font-bold mb-4">Historique des Clients</h2>
                <Client />
            </div>
        </div>
    );
};

export default Accueil;
