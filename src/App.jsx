import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope } from 'react-icons/fa';
import Nav from './compenents/campany/Nav';


import Liste_clients from './compenents/campany/Liste_clients.jsx';
import Ajouter_client from './compenents/campany/Ajouter_client.jsx';
import Profile from './compenents/campany/Profile.jsx';
import Accueil from "./compenents/campany/Accueil.jsx";

const Menu = () => (
    <div className="w-1/4 p-4 bg-gray-200">
        <ul className="space-y-4">
            <li>
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        isActive
                            ? 'flex items-center p-4 rounded bg-black text-white transition-all duration-300 ease-in-out'
                            : 'flex items-center p-4 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                    }
                >
                    <FaHome className="mr-3" /> Accueil
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/Liste_Clients"
                    className={({ isActive }) =>
                        isActive
                            ? 'flex items-center p-4 rounded bg-black text-white transition-all duration-300 ease-in-out'
                            : 'flex items-center p-4 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                    }
                >
                    <FaInfoCircle className="mr-3" /> Liste des clients
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/Ajouter_Clients"
                    className={({ isActive }) =>
                        isActive
                            ? 'flex items-center p-4 rounded bg-black hover:bg-opacity-25 text-white transition-all duration-300 ease-in-out'
                            : 'flex items-center p-4 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                    }
                >
                    <FaServicestack className="mr-3" /> Ajouter des clients
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/Profile"
                    className={({ isActive }) =>
                        isActive
                            ? 'flex items-center p-4 rounded bg-black text-white transition-all duration-300 ease-in-out'
                            : 'flex items-center p-4 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                    }
                >
                    <FaEnvelope className="mr-3" /> Profile
                </NavLink>
            </li>
        </ul>
    </div>
);

const App = () => {
    return (
        <div>
            <Nav />
        <Router>
            <div className="flex">
                <Menu />
                <div className="w-3/4 p-4">
                    <Routes>
                        <Route path="/" element={<Accueil />} />
                        <Route path="/about" element={<Liste_clients />} />
                        <Route path="/services" element={<Ajouter_client />} />
                        <Route path="/contact" element={<Profile />} />
                    </Routes>
                </div>
            </div>
        </Router>
        </div>
    );
};

export default App;
