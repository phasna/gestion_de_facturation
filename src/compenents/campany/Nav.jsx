import { CgProfile } from "react-icons/cg";
import logo from "../../../src/assets/img/logo.png";
import user from "../../../src/assets/img/user.png";

const Header = () => {
    return (
        <header className="flex justify-between items-center bg-black px-12">
            {/* Logo à gauche */}
            <div className="flex items-center">

                <img src={logo} alt="Logo" className="h-32 w-32" />
            </div>

            {/* Icône de profil à droite */}
            <div className="flex items-center">
                <img src={user} alt="Logo" className="h-24 w-24"/>

                {/*<CgProfile className="text-5xl cursor-pointer text-white"/>*/}

            </div>
        </header>
    );
};

export default Header;
