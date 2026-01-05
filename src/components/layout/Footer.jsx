import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="grid-3">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold mb-4">Dondastech</h3>
                        <p className="text-muted mb-6">
                            Your reliable technology partner. We assist companies with scalable system solutions, digital platforms, and ICT innovation.
                        </p>
                        <div className="flex gap-2">
                            <a href="#" className="text-muted hover:text-primary"><Linkedin size={20} /></a>
                            <a href="https://www.facebook.com/profile.php?id=61578267747811" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary"><Facebook size={20} /></a>
                            <a href="#" className="text-muted hover:text-primary"><Twitter size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4>Quick Links</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><a href="/about" className="text-muted hover:text-primary">About Us</a></li>
                            <li><a href="/services" className="text-muted hover:text-primary">Services</a></li>
                            <li><a href="/projects" className="text-muted hover:text-primary">Projects</a></li>
                            <li><a href="/contact" className="text-muted hover:text-primary">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4>Contact Info</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li className="flex items-center gap-2 text-muted">
                                <Mail className="text-primary" size={18} />
                                <span>info@dondastech.co.za</span>
                            </li>
                            <li className="flex items-center gap-2 text-muted">
                                <Phone className="text-primary" size={18} />
                                <span>078 218 9537</span>
                            </li>
                            <li className="flex items-center gap-2 text-muted">
                                <MapPin className="text-primary" size={18} />
                                <span>South Africa (Gauteng, KwaZulu-Natal, Free State)</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="text-center text-muted" style={{ marginTop: '3rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', fontSize: '0.9rem' }}>
                    <p>&copy; {new Date().getFullYear()} Dondastech. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
