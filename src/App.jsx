import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

/* Importation des composants */
import Nav from './compenents/campany/Nav';
import Liste_clients from './compenents/campany/Liste_clients.jsx';
import Add_client from './compenents/campany/Add_client';
import Add_facturation from './compenents/campany/Add_facturation';
import Profile from './compenents/campany/Profile.jsx';
import Accueil from "./compenents/campany/Accueil";

/* Page Facturation en PDF */
import Facturation from "./compenents/campany/Add_facturation.jsx"; // Assure-toi que le nom du fichier est correct

/* Les icons du Menu */
import { AiOutlineProfile } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdAddCircleOutline } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";
import { FaHome } from 'react-icons/fa';

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
                    to="/Liste_clients"
                    className={({ isActive }) =>
                        isActive
                            ? 'flex items-center p-4 rounded bg-black text-white transition-all duration-300 ease-in-out'
                            : 'flex items-center p-4 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                    }
                >
                    <AiOutlineProfile className="mr-3" /> Liste des clients
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/Add_client"
                    className={({ isActive }) =>
                        isActive
                            ? 'flex items-center p-4 rounded bg-black hover:bg-opacity-25 text-white transition-all duration-300 ease-in-out'
                            : 'flex items-center p-4 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                    }
                >
                    <MdAddCircleOutline className="mr-3" /> Ajouter des clients
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/Add_facturation"
                    className={({ isActive }) =>
                        isActive
                            ? 'flex items-center p-4 rounded bg-black hover:bg-opacity-25 text-white transition-all duration-300 ease-in-out'
                            : 'flex items-center p-4 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                    }
                >
                    <TbReportMoney className="mr-3" /> Ajouter une facturation
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
                    <CgProfile className="mr-3" /> Profile
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
                            <Route path="/Add_facturation" element={<Add_facturation />} />
                            <Route path="/Profile" element={<Profile />} />
                            <Route path="/Facturation" element={<Facturation />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </div>
    );
};

export default App;
