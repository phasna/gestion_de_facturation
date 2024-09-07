import Nav from "./campany/Nav.jsx";
import {Outlet} from "react-router-dom";
import Admin from "../page_admin.jsx";


function Layout() {
    return (
        <>
            <Nav/>
            <div className="flex">
                <Admin/>
                <div className="w-full">
                    <Outlet/>
                </div>

            </div>
        </>
    );
}

export default Layout;