import { CgProfile } from "react-icons/cg";

const Header = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-black px-12">
            {/* Logo à gauche */}
            <div className="flex items-center">
                {/*
                <img src="/path-to-logo/logo.png" alt="Logo" className="h-10 w-10" />
                */}
                <span className="ml-3 text-5xl font-bold text-white py-5">Mon Logo</span>
            </div>

            {/* Icône de profil à droite */}
            <div className="flex items-center">
                <CgProfile className="text-5xl cursor-pointer text-white"/>

            </div>
        </header>
    );
};

export default Header;
