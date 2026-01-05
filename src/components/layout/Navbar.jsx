
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';
import Button from '../ui/Button';

import logo from '../../assets/logo.jpg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Projects', path: '/projects' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} `}>
            <div className="container nav-container">
                <Link to="/" className="nav-logo" onClick={closeMenu}>
                    <img src={logo} alt="DondasTech" style={{ height: '50px', width: 'auto' }} />
                </Link>

                {/* Desktop Menu */}
                <div className="nav-links">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={location.pathname === link.path ? 'active' : ''}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/contact">
                        <Button variant="primary">Get Started</Button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu} className="mobile-toggle">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="mobile-menu">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={location.pathname === link.path ? 'active' : ''}
                            onClick={closeMenu}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/contact" onClick={closeMenu}>
                        <Button variant="primary" style={{ width: '100%' }}>Get Started</Button>
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
