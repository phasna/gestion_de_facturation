import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineInfoCircle } from 'react-icons/ai';

const Identifian = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [showInfo, setShowInfo] = useState(false); // État pour gérer l'affichage du texte d'information
    const [role, setRole] = useState(null); // État pour gérer le rôle de l'utilisateur

    const navigate = useNavigate(); // Hook pour la navigation

    const handleSubmit = () => {
        if (!username || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        // Simuler la vérification des identifiants et définir le rôle
        if (username === 'admin@gmail.com' && password === 'admin') {
            setRole('admin');
        } else if (username === 'user@gmail.com' && password === 'user') {
            setRole('user');
        } else {
            alert("Identifiant ou mot de passe incorrect."); // Afficher une alerte si les identifiants ne sont pas valides
            setError(''); // Réinitialiser le message d'erreur car l'alerte est affichée
            return;
        }

        setError('');

        // Rediriger selon le rôle
        if (role === 'admin') {
            navigate('/accueil');
        } else if (role === 'user') {
            navigate('/accueil_user');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleInfoVisibility = () => {
        setShowInfo(!showInfo); // Inverse l'état de visibilité du texte d'information
    };

    return (
        <form className="bg-gradient-to-r from-black to-gray-900 w-screen h-screen p-4 flex justify-center items-center">
            <div className="bg-gray-100 bg-opacity-90 rounded-lg w-3/5 h-auto p-16 shadow-xl">
                <h1 className="flex justify-center text-4xl font-bold pb-6 text-gray-800">Connectez-vous !</h1>

                <div className="group mb-8 relative">
                    <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Identifiant</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <span
                        className="absolute right-3 top-11 cursor-pointer text-gray-500"
                        onClick={toggleInfoVisibility} // Gérer le clic sur l'icône
                    >
                        <AiOutlineInfoCircle size={24} />
                    </span>
                    {/* Tooltip qui s'affiche seulement si showInfo est true */}
                    {showInfo && (
                        <div className="absolute top-14 right-0 mt-2 w-64 p-2 text-white bg-black rounded-md transition-opacity">
                            L'identifiant est votre email.
                        </div>
                    )}
                </div>

                <div className="group mb-8 relative">
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Mot de passe</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span
                        className="absolute right-3 top-11 cursor-pointer text-gray-500"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                    </span>
                </div>

                {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

                <Link to="/mdp" className="text-blue-500 hover:underline block mb-8">
                    Mot de passe oublié ?
                </Link>

                <div className="group">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="mt-4 w-full px-6 py-3 bg-black text-white font-semibold rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 text-lg"
                    >
                        Connecter
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Identifian;
