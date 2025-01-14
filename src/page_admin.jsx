import  { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';



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
import { IoIosPersonAdd } from "react-icons/io";
import { GrUpdate } from "react-icons/gr";
import { MdMoneyOffCsred } from "react-icons/md";

/* Composant Menu */
const Menu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="w-1/4 p-4 bg-gray-200 lg:block hidden h-[calc(100vh_-_100px)] overflow-auto">
            <ul className="space-y-4">
                <Link to="/devis" className="w-full">
                    <button
                        className="border-2 rounded-xl py-3 px-10 border-black w-full hover:bg-black hover:text-white flex flex-row items-center justify-center space-x-4">
                        <span className="text-lg">Ajouter un devis</span>
                        <IoAddCircle className="w-6 h-6"/>
                    </button>
                </Link>

                <li>
                    <NavLink
                        to="/Accueil"
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
                        to="/liste_clients"
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
                            <MdAddCircleOutline className="mr-3"/> Ajouter / Modifier d'un client
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
                                    to="/add_client"
                                    className={({isActive}) =>
                                        isActive
                                            ? 'flex items-center p-2 rounded bg-black text-white transition-all duration-300 ease-in-out'
                                            : 'flex items-center p-2 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                                    }
                                >
                                    <IoIosPersonAdd/> <span className={"ml-2"}>Ajouter un client</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/updateUser"
                                    className={({isActive}) =>
                                        isActive
                                            ? 'flex items-center p-2 rounded bg-black text-white transition-all duration-300 ease-in-out'
                                            : 'flex items-center p-2 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                                    }
                                >
                                    <GrUpdate/> <span className={"ml-2"}> Modifier un client </span>
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </li>

                <li>
                    <NavLink
                        to="/add_facturation"
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
                        to="/devis"
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
                        to="/Listedesdevis"
                        className={({isActive}) =>
                            isActive
                                ? 'flex items-center p-4 rounded bg-black hover:bg-opacity-25 text-white transition-all duration-300 ease-in-out'
                                : 'flex items-center p-4 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                        }
                    >
                        <MdMoneyOffCsred className="mr-3"/> Liste des devis
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/add_user"
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
                        to="/profile"
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


export default Menu;
