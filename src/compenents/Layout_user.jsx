import Nav from "./campany/Nav.jsx";
import {Outlet} from "react-router-dom";
import User from "../page_user.jsx";

function LayoutUser() {
    return (
        <>
            <Nav/>
            <div className="flex">

                <User/>
                <div className="w-full">
                    <Outlet/>
                </div>

            </div>
        </>
    );
}

export default LayoutUser;