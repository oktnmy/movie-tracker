import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import { FiMenu, FiX, FiFilm } from 'react-icons/fi'; // Using react-icons for a nice touch

const Header = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Style for active NavLink
    const activeLinkStyle = {
        color: '#3b82f6', // A bright blue for the active link
        fontWeight: '600'
    };

    const handleLogout = () => {
        doSignOut().then(() => {
            navigate('/login');
        });
    };

    return (
        <header className='w-full h-16 fixed top-0 left-0 z-20 bg-gray-900 text-white shadow-lg'>
            <div className='container mx-auto px-4 h-full flex justify-between items-center'>
                {/* Logo / Brand Name */}
                <Link to="/" className="flex items-center gap-2 text-xl font-bold">
                    <FiFilm className="text-blue-400" />
                    MovieTracker
                </Link>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-2xl"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <FiX /> : <FiMenu />}
                </button>

                {/* Navigation Links */}
                <nav className={`
                    md:flex md:items-center md:gap-6
                    ${isMenuOpen ? 'flex' : 'hidden'}
                    flex-col md:flex-row
                    absolute md:static
                    top-16 left-0
                    w-full md:w-auto
                    bg-gray-900 md:bg-transparent
                    p-4 md:p-0
                    shadow-md md:shadow-none
                `}>
                    {userLoggedIn ? (
                        <>
                            {/* Links for Logged-in Users */}
                            <NavLink to="/search" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className='hover:text-blue-400 transition-colors py-2 md:py-0'>Search</NavLink>
                            <NavLink to="/favorites" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className='hover:text-blue-400 transition-colors py-2 md:py-0'>Favorites</NavLink>
                            <NavLink to="/watchlist" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className='hover:text-blue-400 transition-colors py-2 md:py-0'>Watchlist</NavLink>
                            <NavLink to="/profile" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className='hover:text-blue-400 transition-colors py-2 md:py-0'>Profile</NavLink>
                            <button onClick={handleLogout} className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-semibold transition-colors mt-4 md:mt-0 md:ml-4'>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Links for Logged-out Users */}
                            <NavLink to="/login" className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded font-semibold transition-colors'>
                                Login
                            </NavLink>
                            <NavLink to="/register" className='hover:text-blue-400 transition-colors py-2 md:py-0'>
                                Register
                            </NavLink>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;