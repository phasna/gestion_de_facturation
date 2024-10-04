import {  NavLink, Link } from 'react-router-dom';



/* Les icons du Menu */
import { AiOutlineProfile } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaHome } from 'react-icons/fa';
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { IoAddCircle } from "react-icons/io5";

/* Composant Menu */
const Menu = () => {

    return (
        <div className="w-1/4 p-4 bg-gray-200 lg:block hidden h-screen">
            <ul className="space-y-4">
                <Link to="/add_projets" className="w-full">
                    <button
                        className="border-2 rounded-xl py-3 px-10 border-black w-full hover:bg-black hover:text-white flex flex-row items-center justify-center space-x-4">
                        <span className="text-lg">Ajouter un projet</span>
                        <IoAddCircle className="w-6 h-6"/>
                    </button>
                </Link>

                <li>
                    <NavLink
                        to="/Accueil_user"
                        end
                        className={({isActive}) =>
                            isActive
                                ? 'flex items-center p-4 rounded bg-black text-white transition-all duration-300 ease-in-out'
                                : 'flex items-center p-4 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                        }
                    >
                        <FaHome className="mr-3"/> Accueil_user
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/liste_projets"
                        className={({isActive}) =>
                            isActive
                                ? 'flex items-center p-4 rounded bg-black text-white transition-all duration-300 ease-in-out'
                                : 'flex items-center p-4 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                        }
                    >
                        <AiOutlineProfile className="mr-3"/> Liste des projets
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/add_projets"
                        className={({isActive}) =>
                            isActive
                                ? 'flex items-center p-4 rounded bg-black hover:bg-opacity-25 text-white transition-all duration-300 ease-in-out'
                                : 'flex items-center p-4 rounded hover:bg-black hover:bg-opacity-25 hover:text-white transition-all duration-300 ease-in-out'
                        }
                    >
                        <LiaMoneyCheckAltSolid className="mr-3"/> Ajouter un projets
                    </NavLink>
                </li>


                <li>
                    <NavLink
                        to="/profile_user"
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
