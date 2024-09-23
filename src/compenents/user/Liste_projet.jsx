import React from 'react';
import { FaEye, FaDownload, FaEllipsisV } from 'react-icons/fa'; // Assure-toi d'installer react-icons

const projects = [
    {
        id: 1,
        date: '2024-09-01',
        items: [
            { icon: '🔧', title: 'Project A' },
            { icon: '📊', title: 'Project B' },
            { icon: '🖥️', title: 'Project C' },
        ],
    },
    {
        id: 2,
        date: '2024-09-02',
        items: [
            { icon: '📦', title: 'Project D' },
            { icon: '📅', title: 'Project E' },
            { icon: '🚀', title: 'Project F' },
        ],
    },
];

const ProjectList = () => {
    return (
        <div>
            <h1 className={"p-4 text-3xl font-bold"}>Les listes des projets récents </h1>
            <div className="p-4 space-y-6">
                {projects.map(projectGroup => (
                    <div key={projectGroup.id} className="border p-4 rounded-md bg-gray-100">
                        <div className="text-lg font-bold mb-2">{projectGroup.date}</div>
                        <ul className="space-y-2">
                            {projectGroup.items.map((item, index) => (
                                <li key={index}
                                    className="flex items-center justify-between p-2 border-b last:border-none">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-2xl">{item.icon}</span>
                                        <span>{item.title}</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="text-blue-500 hover:text-blue-700">
                                            <FaEye/>
                                        </button>
                                        <button className="text-green-500 hover:text-green-700">
                                            <FaDownload/>
                                        </button>
                                        <button className="text-gray-500 hover:text-gray-700">
                                            <FaEllipsisV/>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center mt-5 w-full">
                <button
                    className="text-white border-2 rounded-full border-white py-4 px-5 bg-black hover:bg-opacity-50 hover:text-black w-2/6">
                    Afficher plus
                </button>
            </div>
        </div>
    );
};

export default ProjectList;
