import Logo from "./Logo";
import NavBar from "./NavBar";

const Header = () => {

    return (
        <header className="header bg-beige-oscuro pb-0 pt-10">
            <div className="bg-black container-2xl py-4 flex bg-black border-b border-t border-white px-8 mx-0">
                <Logo />
                <NavBar />
            </div>
        </header>
    )
}

export default Header;