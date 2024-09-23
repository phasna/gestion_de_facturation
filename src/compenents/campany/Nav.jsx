import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../../src/assets/img/logo.png';
import user from '../../../src/assets/img/User.png';
import { Link } from 'react-router-dom';


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="relative flex justify-between items-center bg-black px-12 ">
            <Link to="/Accueil" className="lg:w-1/5 sm:w-1/2 md:w-1/4 hover:text-blue-700">

            {/* Logo à gauche */}
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-32 w-32" />
            </div>
            </Link>


            {/* Icône de menu burger (visible uniquement sur petits écrans) */}
            <button
                className="block md:hidden text-white text-3xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Icône de profil à droite */}
            <Link to="/profile" >
            <div className="flex items-center">
                <img src={user} alt="Profil" className="h-24 w-24" />
                {/*<CgProfile className="text-5xl cursor-pointer text-white"/>*/}
            </div>
            </Link>


            {/* Menu burger */}
            <div className={`fixed top-0 right-0 w-3/4 h-full bg-gray-200 md:hidden transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
                <button
                    className="p-4 text-3xl"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <FaTimes />
                </button>
                <ul className="p-4 space-y-4">
                    <li>
                        <a href="/" className="block p-4 text-lg text-black hover:bg-gray-300">Accueil</a>
                    </li>
                    <li>
                        <a href="/src/compenents/campany/Liste_clients" className="block p-4 text-lg text-black hover:bg-gray-300">Liste des clients</a>
                    </li>
                    <li>
                        <a href="/Add_client" className="block p-4 text-lg text-black hover:bg-gray-300">Ajouter des clients</a>
                    </li>
                    <li>
                        <a href="/Add_facturation" className="block p-4 text-lg text-black hover:bg-gray-300">Ajouter une facturation</a>
                    </li>
                    <li>
                        <a href="/Devie" className="block p-4 text-lg text-black hover:bg-gray-300">Ajouter un devis</a>
                    </li>
                    <li>
                        <a href="/Add_user" className="block p-4 text-lg text-black hover:bg-gray-300">Ajouter utilisateur</a>
                    </li>
                    <li>
                        <a href="/Profile" className="block p-4 text-lg text-black hover:bg-gray-300">Profile</a>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
