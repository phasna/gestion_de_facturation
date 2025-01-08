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
                <Graphique />
            </div>

            {/* Section Historique des Clients */}
            <div className="mt-10">
                <Client />
            </div>
        </div>
    );
};

export default Accueil;
