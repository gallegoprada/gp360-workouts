//'use client'

import Logout from './Logout';

export default function NavBar() {
    // State to toggle mobile menu
    //const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isMenuOpen = false;

    const menuItems = [
        { label: 'Inicio', href: '/' },
        { label: 'Workouts', href: '/workouts' },
        { label: 'Panel administrador', href: '/panel' },
        { label: 'Log in', href: '/login' },
    ];

    // Function to toggle mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
/*
<button className="block lg:hidden text-white" onClick={toggleMenu}>
*/
    return(
        <nav className="flex w-full items-center justify-end md:ml-auto">
            {/* Mobile Menu */}
                <div className='md:hidden'>
                    <button className="block text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>
                    </button>
                    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className="flex flex-col w-64 bg-black p-4">
                            <button className="self-end text-white" >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <ul className="space-y-4">
                                {menuItems.map((item, index) => (
                                    <li key={index} className="font-bold text-sm text-white ">
                                        <a href={item.href} className="pb-1 uppercase hover:text-beige">{item.label}</a>
                                    </li>
                                ))}
                            </ul>
                            <Logout />
                        </div>
                    </div>
                </div>
            {/* Desktop Menu */}
                <ul className="md:flex hidden items-center w-full justify-end">
                    {menuItems.map((item, index) => (
                        <li key={index} className="font-sans inline-block text-[13px] mx-4 text-white">
                            <a href={item.href} className="pb-1 uppercase hover:text-beige">{item.label}</a>
                        </li>
                    ))}
                </ul>
            {/* Logout/Login component */}
            <Logout className="hidden"/>
        </nav>
    )
}
