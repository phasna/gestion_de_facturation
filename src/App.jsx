
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Accueil from "./compenents/campany/Accueil.jsx";
import Liste_clients from "./compenents/campany/Liste_clients.jsx";
import Add_client from "./compenents/campany/Add_client.jsx";
import Add_facturation from "./compenents/campany/Add_facturation.jsx";
import Profile from "./compenents/campany/Profile.jsx";
import Add_user from "./compenents/Utilisateur/Add_user.jsx";
import Devie from "./compenents/campany/Devis.jsx";
import UpdateUser from "./compenents/campany/UpdateUser.jsx";
import Identifian from "./compenents/Connection/Identifian.jsx";
import Mdp from "./compenents/Connection/mdpoublier.jsx";
import Layout from "./compenents/Layout.jsx";
import Layout_user from "./compenents/Layout_user.jsx";

/*--------------------- Page User ---------------*/

import Accueil_user from "./compenents/user/Accueil.jsx";
import Liste_clients_user from "./compenents/user/Liste_clients.jsx";
import Profile_user from "./compenents/user/Profile.jsx";
import Devie_user from "./compenents/user/Devis.jsx";



const App = () => {
    return (


        <Router>

            <Routes>
                <Route  element={<Layout/>}>
                    <Route path="/Accueil" element={<Accueil/>}/>
                    <Route path="/liste_clients" element={<Liste_clients/>}/>
                    <Route path="/add_client" element={<Add_client/>}/>
                    <Route path="/add_facturation" element={<Add_facturation/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/add_user" element={<Add_user/>}/>
                    <Route path="/devis" element={<Devie/>}/>
                    <Route path="/updateUser" element={<UpdateUser/>}/>
                </Route>

                <Route  element={<Layout_user/>}>
                    <Route path="/Accueil_user" element={<Accueil_user/>}/>
                    <Route path="/liste_projets" element={<Liste_clients_user/>}/>
                    <Route path="/profile_user" element={<Profile_user/>}/>
                    <Route path="/add_projets" element={<Devie_user/>}/>
                </Route>

                {/*----------- Page Connection ----------------------*/}
                <Route path="/" element={<Identifian/>}/>
                <Route path="/mdp" element={<Mdp/>}/>

            </Routes>

        </Router>


    );
};

export default App;
