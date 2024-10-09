import Image from "../../assets/img/Image_03.png";

const AccueilImage = () => {
    return (
        <div className="bg-gradient-to-r from-blue-800 to-blue-700 w-full h-96 p-10 rounded-lg shadow-lg flex justify-between items-center">
            {/* Section texte */}
            <div className="w-1/2 space-y-6 pr-10 p-10">
                <h1 className="text-4xl text-white font-extrabold leading-tight">
                    Bienvenue dans l'interface
                </h1>
                <p className="text-white text-lg leading-relaxed">
                    Créez et ajoutez des factures & des clients facilement.
                </p>
                <button className="px-8 py-4 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors duration-300">
                    Ajouter un client
                </button>
            </div>

            {/* Section image */}
            <div className="w-1/2 flex items-center justify-center">
                <div className="h-full w-96 rounded-lg overflow-hidden">
                    <img
                        src={Image}
                        alt="Illustration"
                        className="w-full h-full object-cover"
                        loading="lazy" // Améliore les performances en retardant le chargement de l'image
                    />
                </div>
            </div>
        </div>
    );
};

export default AccueilImage;
