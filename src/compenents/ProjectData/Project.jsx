import { FaProjectDiagram, FaRegFileAlt, FaLaptopCode, FaMobileAlt, FaClipboardList } from "react-icons/fa";
import { FaCode, FaServer, FaUserCog, FaNetworkWired, FaCloud } from "react-icons/fa";

export const projects = [
    {
        id: 1,
        name: "Développement Web",
        detail: "Demande de devis pour un projet de développement web.",
        icon: <FaLaptopCode />,
        entreprise: "Web Solutions",
        entreprise_address: "1 allée des développeurs",
        entreprise_phone: "0654324561",
        siret: "23478986543",
        city: "Lyon",
        price: "$750"
    },
    {
        id: 2,
        name: "Maintenance Site",
        detail: "Demande de maintenance pour site existant.",
        icon: <FaRegFileAlt />,
        entreprise: "Tech Innovators",
        entreprise_address: "42 rue de l'innovation",
        entreprise_phone: "0634567890",
        siret: "34567891234",
        city: "Marseille",
        price: "$750"
    },
    {
        id: 3,
        name: "Application Mobile",
        detail: "Demande de devis pour une application mobile.",
        icon: <FaMobileAlt />,
        entreprise: "App Creators",
        entreprise_address: "12 rue des applications",
        entreprise_phone: "0678901234",
        siret: "45678902345",
        city: "Paris",
        price: "$750"
    },
    {
        id: 4,
        name: "Stratégie Numérique",
        detail: "Consultation pour stratégie numérique.",
        icon: <FaClipboardList />,
        entreprise: "Digital Experts",
        entreprise_address: "23 avenue des stratégies",
        entreprise_phone: "0689123456",
        siret: "56789013456",
        city: "Lille",
        price: "$750"
    },
    {
        id: 5,
        name: "Recherche Prestataires",
        detail: "Recherche de prestataires pour un projet.",
        icon: <FaProjectDiagram />,
        entreprise: "Creative Agency",
        entreprise_address: "34 rue de la créativité",
        entreprise_phone: "0691234567",
        siret: "67890124567",
        price: "$750",
        city: "Bordeaux",
    },

];

export default projects;