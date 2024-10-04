import { useState } from "react";
import { FaDownload, FaEye, FaTrash } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../../src/assets/img/logo_1.png";
import { projects } from "../ProjectData/ProjectData.jsx"; // Importer les projets
import { Link } from "react-router-dom";

const iconStyles = "text-gray-600 cursor-pointer hover:text-blue-500";

// Informations de l'entreprise
const companyInfo = {
    name: "Mon Entreprise",
    address: "123 Rue de l'Exemple",
    city: "75000 Paris",
    phone: "+33 1 23 45 67 89",
    email: "contact@monentreprise.com",
};

// Fonction pour générer un PDF
const generatePDF = (project) => {
    const pdfDoc = new jsPDF();

    // Ajouter le logo
    pdfDoc.addImage(logo, 'PNG', 10, 10, 30, 30); // Ajustez la position et la taille selon vos besoins

    // Titre du document
    pdfDoc.setFontSize(20);
    pdfDoc.text("Facture", 14, 50);

    // Informations de l'entreprise à gauche
    pdfDoc.setFontSize(12);
    pdfDoc.text(`Émis par : ${companyInfo.name}`, 14, 70);
    pdfDoc.text(`${companyInfo.address}`, 14, 80);
    pdfDoc.text(`${companyInfo.city}`, 14, 90);
    pdfDoc.text(`Téléphone : ${companyInfo.phone}`, 14, 100);
    pdfDoc.text(`Email : ${companyInfo.email}`, 14, 110);

    // Informations du projet à droite
    pdfDoc.text(`Facturé à : ${project.name}`, 130, 70);
    pdfDoc.text(`Détails : ${project.detail}`, 130, 80);
    pdfDoc.text(`Entreprise : ${project.entreprise}`, 130, 90);
    pdfDoc.text(`Adresse : ${project.entreprise_address}`, 130, 100);
    pdfDoc.text(`Téléphone : ${project.entreprise_phone}`, 130, 110);
    pdfDoc.text(`SIRET : ${project.siret}`, 130, 120);
    pdfDoc.text(`Ville : ${project.city}`, 130, 130);

    // Ajouter des lignes de facturation (description, quantité, prix unitaire, total)
    const items = [
        ["Description", "Quantité", "Prix Unitaire", "Total"],
        ["Développement web ", "2", "100€", "200€"],
        ["Design ", "1", "50€", "50€"],
        ["Réseaux", "3", "30€", "90€"],
    ];

    // Colonnes de sous-total, TVA et Total
    const summary = [
        ["Sous-total", "340€"],
        ["TVA (20%)", "68€"],
        ["Total", "408€"],
    ];

    // Générer le tableau des articles
    pdfDoc.autoTable({
        head: [items[0]],
        body: items.slice(1),
        startY: 150,
    });

    // Ajouter les colonnes pour sous-total, TVA et Total
    let finalY = pdfDoc.lastAutoTable.finalY + 10; // Position après le tableau
    pdfDoc.autoTable({
        head: [["Description", "Montant"]],
        body: summary,
        startY: finalY,
        theme: 'grid',
        styles: { cellPadding: 2, fontSize: 10 },
    });

    // Ajouter le paragraphe concernant le paiement
    finalY = pdfDoc.lastAutoTable.finalY + 10; // Position après le tableau de résumé
    pdfDoc.setFontSize(10);
    pdfDoc.text(
        "Veuillez payer dans les délais indiqués. Sinon, une amende sera appliquée.",
        14,
        finalY
    );

    // Retourner le document
    return pdfDoc;
};

const ProjectCard = ({ project, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showActions, setShowActions] = useState(false);

    const handleViewPdf = () => {
        const pdfDoc = generatePDF(project);
        pdfDoc.output("dataurlnewwindow");
    };

    const handleDownloadPdf = (e) => {
        e.stopPropagation();
        const pdfDoc = generatePDF(project);
        pdfDoc.save(`facturation_${project.id}.pdf`);
    };

    const handleToggleActions = (e) => {
        e.stopPropagation();
        setShowActions(!showActions);
    };

    return (
        <div className="mb-4">
            <motion.div
                className="bg-gray-200 px-5 py-2 rounded shadow cursor-pointer w-full"
                onClick={() => setIsOpen(!isOpen)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center mb-3">
                    {project.icon} {/* Utiliser l'icône du projet */}
                    <span className="ml-2">{project.name}</span>
                </div>
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex space-x-7 mb-3 justify-end">
                        <FaEye
                            className={iconStyles}
                            title="Visualiser"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleViewPdf();
                            }}
                        />
                        <FaDownload
                            className={iconStyles}
                            title="Télécharger"
                            onClick={handleDownloadPdf}
                        />
                        <div
                            className="flex items-center justify-between cursor-pointer hover:text-red-500"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(project.id);
                            }}
                        >
                            <FaTrash className={`${iconStyles} text-red-500`} title="Supprimer"/>
                        </div>
                    </div>
                    {isOpen && (
                        <div className="p-4 bg-gray-100 rounded mt-2">
                            {project.name}, {project.detail}.
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
};

const ProjectList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleProjects, setVisibleProjects] = useState(5);
    const [projectData, setProjectData] = useState(projects); // Utilisez les données importées

    const handleDeleteProject = (projectId) => {
        const updatedProjects = projectData.filter((project) => project.id !== projectId);
        setProjectData(updatedProjects);
    };

    const handleSeeMore = () => {
        setVisibleProjects(visibleProjects + 5);
    };

    const filteredProjects = projectData.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            <h1 className="text-3xl font-semibold my-10 text-center">Liste des Projets</h1>
            {/*<div className="mb-8 flex justify-end items-center space-x-4 mr-5">*/}
            {/*    <IoSearchOutline className="text-gray-500 w-6 h-6" />*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        placeholder="Rechercher des projets..."*/}
            {/*        className="border border-gray-300 rounded px-3 py-2 placeholder-gray-500 text-gray-900"*/}
            {/*        onChange={(e) => setSearchTerm(e.target.value)}*/}
            {/*    />*/}
            {/*</div>*/}

            {/* Conteneur avec overflow-auto */}
            <div className="max-h-[80vh] overflow-auto">
                {filteredProjects.length > 0 ? (
                    filteredProjects.slice(0, visibleProjects).map((project) => (
                        <ProjectCard key={project.id} project={project} onDelete={handleDeleteProject} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">Aucun résultat trouvé.</p>
                )}
            </div>

            {visibleProjects < filteredProjects.length && (
                <Link to="/liste_projets">
                    <div className="flex justify-center mt-4">
                        <button onClick={handleSeeMore} className="text-white bg-black hover:bg-opacity-80 py-3 px-7 w-1/5 rounded-xl">
                            Voir plus clients
                        </button>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default ProjectList;

