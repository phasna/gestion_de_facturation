import  { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';

/* Importation des composants */
import Nav from './compenents/campany/Nav';
import Liste_clients from './compenents/campany/Liste_clients.jsx';
import Add_client from './compenents/campany/Add_client';
import Add_facturation from './compenents/campany/Add_facturation';
import Profile from './compenents/campany/Profile.jsx';
import Accueil from "./compenents/campany/Accueil";
import UpdateUser from "./compenents/campany/UpdateUser.jsx";

/* Page Facturation en PDF */
import Facturation from "./compenents/Facturation/Facturation.jsx";

/* Page pour ajouter un utilisateur */
import Add_user from "./compenents/Utilisateur/Add_user.jsx";

/* Page pour les devis */
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
import { BiChevronDown } from "react-icons/bi"; // Nouvelle icône pour indiquer le dropdown

/* Composant Menu */
const Menu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="w-1/4 p-4 bg-gray-200 lg:block hidden">
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

                {/* Dropdown pour Ajouter des clients */}
                <li>
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center p-4 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out w-full justify-between"
                    >
                        <div className="flex items-center">
                            <MdAddCircleOutline className="mr-3"/> Ajouter des clients
                        </div>
                        {/* Icône qui tourne pour indiquer le dropdown */}
                        <BiChevronDown
                            className={`transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                            size={24}
                        />
                    </button>
                    {isDropdownOpen && (
                        <ul className="pl-8 space-y-2">
                            <li>
                                <NavLink
                                    to="/Add_client"
                                    className={({isActive}) =>
                                        isActive
                                            ? 'flex items-center p-2 rounded bg-black text-white transition-all duration-300 ease-in-out'
                                            : 'flex items-center p-2 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                                    }
                                >
                                    Ajouter un client
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/UpdateUser"
                                    className={({isActive}) =>
                                        isActive
                                            ? 'flex items-center p-2 rounded bg-black text-white transition-all duration-300 ease-in-out'
                                            : 'flex items-center p-2 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                                    }
                                >
                                    Modifier un client
                                </NavLink>
                            </li>
                        </ul>
                    )}
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
                        <LiaMoneyCheckAltSolid className="mr-3"/> Ajouter un devis
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
};

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

                            <Route path="/UpdateUser" element={<UpdateUser />} />


                        </Routes>
                    </div>
                </div>
            </Router>
        </div>
    );
};

export default App;
