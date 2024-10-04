import Image from "../../assets/img/Image_02.png";

const AccueilImage = () => {
    return (
        <div className="bg-gradient-to-r from-blue-800 to-blue-700 w-full h-72 p-10 rounded-lg shadow-lg flex justify-between items-center">
            {/* Section texte */}
            <div className="w-1/2 pr-10">
                <h1 className="text-4xl mb-6 text-white font-extrabold leading-tight">
                    Bienvenue dans l'interface
                </h1>
                <p className="text-white mb-6 text-lg leading-relaxed">
                    Créez et ajoutez des factures & des clients facilement.
                </p>

                <button className="px-8 py-4 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold">
                    Ajouter un client
                </button>
            </div>

            {/* Section image */}
            <div className="w-1/2 h-full flex items-center justify-center">
                <div className="h-full w-1/3 rounded-lg overflow-hidden shadow-md">
                    <img
                        src={Image}
                        alt="Illustration"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default AccueilImage;
