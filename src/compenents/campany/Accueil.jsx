import AccueilImage from "../campany/AccueilImage.jsx";
import User from "../campany/Accueil/User.jsx";
import Client from "../campany/Accueil/ClientColone.jsx"

const Accueil = () => {
    return (
        <div className={"p-10 min-h-screen bg-gradient-to-r from-blue-500 to-purple-600"}>
            <h1 className={"text-white text-center text-4xl mb-6 font-bold"}>Gestion des facturation</h1>
            <User />
            <Client />

            {/*<div className={"flex flex-row space-x-5 mt-5"}>*/}

            {/*</div>*/}
        </div>
    )
}
export default Accueil