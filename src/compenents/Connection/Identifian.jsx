// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';



const Identifian = () => {
    return (

        <form className="bg-black w-screen h-screen p-4 flex justify-center items-center  ">
            <div className="bg-gray-200 bg-opacity-70 rounded-lg w-2/5 h-auto p-10 ">
                <h1 className="flex justify-center pb-2.5">Connectez-vous !</h1>
                <div className="group">
                    <label htmlFor="zip" className="rounded-full py-3 px-6...">Identifiant</label>
                    <input
                        type="text"
                        id="zip"
                        name="zip"
                        className="mt-1 block  w-full py-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

                        required
                    />
                </div>
                <div className="my-6">
                    <label htmlFor="zip" className="rounded-full py-44 px-6...">Mot de passe</label>
                    <input type="text"
                           id="zip"
                           name="zip"
                           className="mt-1 block  w-full py-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

                           required/>
                </div>

                <Link to="/mdp" className="lg:w-1/5 sm:w-1/2 md:w-1/4 hover:text-blue-700">

                <a>Mot de passe oublié ?</a>
                </Link>

                <div className="group">
                    <button type="button"
                            className="mt-4 px-4 py-2 bg-black text-white font-semibold rounded-md shadow-sm  focus:outline-none">Connecter
                    </button>
                </div>
            </div>

        </form>
    );
};

export default Identifian;