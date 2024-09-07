import React from 'react';

const Mdpoublier = () => {
    return (
        <form className=" bg-black w-screen h-screen p-4 flex justify-center items-center  ">
            <div className="bg-gray-200 rounded-lg w-2/5 h-auto p-10 bg-opacity-70 ">
                <h1 className="flex justify-center ">Entrez email de récupération</h1>
                <div className="group">
                    <label htmlFor="zip" className="rounded-full py-3 px-3 ">Votre email !</label>
                    <input
                        type="text"
                        id="zip"
                        name="zip"
                        className="mt-1 block w-full  px-10 py-2  border border-gray-300  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

                        required
                    />
                    <div className="group">
                        <button type="button"
                                className="mt-4 px-4 py-2 bg-black text-white font-semibold rounded-md shadow-sm  focus:outline-none">Envoyer
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Mdpoublier;