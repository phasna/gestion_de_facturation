
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope } from 'react-icons/fa';
import Nav from './compenents/campany/Nav.jsx';

import Liste_clients from './compenents/campany/Liste_clients.jsx';
import Add_client from './compenents/campany/Add_client';
import Profile from './compenents/campany/Profile.jsx';
import Accueil from "./compenents/campany/Accueil";

const Menu = () => (
    <div className="w-1/4 p-4 bg-gray-200">
        <ul className="space-y-4">
            <li>
                <NavLink to="/" end className="flex items-center p-4 rounded bg-black text-white">
                    <FaHome className="mr-3" /> Accueil
                </NavLink>
            </li>
            <li>
                <NavLink to="/Liste_clients" className="flex items-center p-4 rounded hover:bg-black hover:text-white">
                    <FaInfoCircle className="mr-3" /> Liste des clients
                </NavLink>
            </li>
            <li>
                <NavLink to="/Add_client" className="flex items-center p-4 rounded hover:bg-black hover:text-white">
                    <FaServicestack className="mr-3" /> Ajouter des clients
                </NavLink>
            </li>
            <li>
                <NavLink to="/Profile" className="flex items-center p-4 rounded hover:bg-black hover:text-white">
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
                            <Route path="/Liste_clients" element={<Liste_clients />} />
                            <Route path="/Add_client" element={<Add_client />} />
                            <Route path="/Profile" element={<Profile />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </div>
    );
};

export default App;
