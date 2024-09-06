import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

/* Importation des composants */
import Nav from './compenents/campany/Nav';
import Liste_clients from './compenents/campany/Liste_clients.jsx';
import Add_client from './compenents/campany/Add_client';
import Add_facturation from './compenents/campany/Add_facturation';
import Profile from './compenents/campany/Profile.jsx';
import Accueil from "./compenents/campany/Accueil";

/* Page Facturation en PDF */
import Facturation from "./compenents/Facturation/Facturation.jsx"; // Assure-toi que le nom du fichier est correct

/* Page Facturation en PDF */
import Add_user from "./compenents/Utilisateur/Add_user.jsx"; // Assure-toi que le nom du fichier est correct
import Devie from "./compenents/campany/Devis.jsx";

/* Les icons du Menu */
import { AiOutlineProfile } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdAddCircleOutline } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";
import { FaHome } from 'react-icons/fa';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";

import { IoAddCircle } from "react-icons/io5";

const Menu = () => (
    <div className="w-1/4 p-4 bg-gray-200">
        <ul className="space-y-4">
            <Link to="/Devie" className="w-full">
                <button
                    className="border-2 rounded-xl py-3 px-10 border-black w-full hover:bg-black hover:text-white flex flex-row items-center justify-center space-x-4">
                    <span className="text-lg">Ajouter un devis</span>
                    <IoAddCircle className="w-6 h-6"/>
                </button>
            </Link>

            <li>
                <NavLink
                    to="/"
                    end
                    className={({isActive}) =>
                        isActive
                            ? 'flex items-center p-4 rounded bg-black text-white transition-all duration-300 ease-in-out'
                            : 'flex items-center p-4 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                    }
                >
                    <FaHome className="mr-3"/> Accueil
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/Liste_clients"
                    className={({isActive}) =>
                        isActive
                            ? 'flex items-center p-4 rounded bg-black text-white transition-all duration-300 ease-in-out'
                            : 'flex items-center p-4 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                    }
                >
                    <AiOutlineProfile className="mr-3"/> Liste des clients
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/Add_client"
                    className={({isActive}) =>
                        isActive
                            ? 'flex items-center p-4 rounded bg-black hover:bg-opacity-25 text-white transition-all duration-300 ease-in-out'
                            : 'flex items-center p-4 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                    }
                >
                    <MdAddCircleOutline className="mr-3"/> Ajouter des clients
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/Add_facturation"
                    className={({isActive}) =>
                        isActive
                            ? 'flex items-center p-4 rounded bg-black hover:bg-opacity-25 text-white transition-all duration-300 ease-in-out'
                            : 'flex items-center p-4 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                    }
                >
                    <TbReportMoney className="mr-3"/> Ajouter une facturation
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/Devie"
                    className={({isActive}) =>
                        isActive
                            ? 'flex items-center p-4 rounded bg-black hover:bg-opacity-25 text-white transition-all duration-300 ease-in-out'
                            : 'flex items-center p-4 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                    }
                >
                    <LiaMoneyCheckAltSolid className="mr-3"/> Ajouter un devie
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/Add_user"
                    className={({isActive}) =>
                        isActive
                            ? 'flex items-center p-4 rounded bg-black hover:bg-opacity-25 text-white transition-all duration-300 ease-in-out'
                            : 'flex items-center p-4 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                    }
                >
                    <AiOutlineUsergroupAdd className="mr-3"/> Ajouter utilisateur
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/Profile"
                    className={({isActive}) =>
                        isActive
                            ? 'flex items-center p-4 rounded bg-black text-white transition-all duration-300 ease-in-out'
                            : 'flex items-center p-4 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                    }
                >
                    <CgProfile className="mr-3"/> Profile
                </NavLink>
            </li>
        </ul>
    </div>
);

const App = () => {
    return (
        <div>
            <Nav/>
            <Router>
                <div className="flex">
                    <Menu/>
                    <div className="w-3/4 p-4">
                        <Routes>
                            <Route path="/" element={<Accueil/>}/>
                            <Route path="/Liste_clients" element={<Liste_clients/>}/>
                            <Route path="/Add_client" element={<Add_client/>}/>
                            <Route path="/Add_facturation" element={<Add_facturation/>}/>
                            <Route path="/Profile" element={<Profile />} />
                            <Route path="/Add_user" element={<Add_user />} />
                            <Route path="/Devie" element={<Devie />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </div>
    );
};

export default App;
