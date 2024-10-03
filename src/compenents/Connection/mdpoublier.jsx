import React, { useState } from 'react';
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Mdpoublier = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setError("Veuillez entrer une adresse email valide.");
        } else {
            setError('');
            console.log("Email de récupération:", email);
        }
    };

    return (
        <form className="bg-gradient-to-r from-gray-900  to-blue-800 w-screen h-screen p-4 flex justify-center items-center">
            <div className="bg-black bg-opacity-50 rounded-lg w-2/5 h-auto p-10 shadow-xl ">
                <Link to="/" className="text-blue-500 hover:underline flex items-center mb-8">
                    <IoChevronBackCircleOutline className="w-8 h-8 mr-2" />
                    <span className="text-lg">Revenir</span>
                </Link>

                <h1 className="flex justify-center text-2xl font-bold mb-8 text-white">Entrez votre email de récupération !</h1>
                <div className="group mb-8">
                    <label htmlFor="email" className="block text-white font-semibold mb-3 text-lg">Votre email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="text-red-500 text-sm mb-8">{error}</p>}

                <div className="group w-full flex justify-center items-center">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="mt-4 w-1/3 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white text-lg"
                    >
                        Envoyer
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Mdpoublier;
