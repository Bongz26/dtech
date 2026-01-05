import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        consent: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for your message. We will get back to you shortly.");
        console.log(formState);
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormState({ ...formState, [e.target.name]: value });
    };

    return (
        <>
            <Helmet>
                <title>Contact Us | Dondastech</title>
                <meta name="description" content="Contact Dondastech for your ICT system solutions. Email: info@dondastech.co.za, WhatsApp: 078 218 9537." />
            </Helmet>

            <div style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'linear-gradient(to bottom, var(--color-bg-alt), var(--color-bg))', textAlign: 'center' }}>
                <div className="container">
                    <h1>Contact Us</h1>
                    <p className="text-muted" style={{ fontSize: '1.25rem' }}>
                        Get in touch with our team to discuss your project.
                    </p>
                </div>
            </div>

            <Section>
                <div className="grid-2" style={{ alignItems: 'start' }}>
                    {/* Contact Info */}
                    <div>
                        <h2>Get in Touch</h2>
                        <p className="text-muted" style={{ marginBottom: '2rem' }}>
                            We are ready to assist you with scalable system solutions for your business. Reach out via email, phone, or WhatsApp.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <Card style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
                                <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.75rem', borderRadius: '50%' }}>
                                    <Mail className="text-primary" size={24} />
                                </div>
                                <div>
                                    <p className="text-muted" style={{ fontSize: '0.85rem' }}>Email Us</p>
                                    <a href="mailto:info@dondastech.co.za" style={{ fontWeight: 600, fontSize: '1.1rem' }}>info@dondastech.co.za</a>
                                </div>
                            </Card>

                            <Card style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
                                <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '0.75rem', borderRadius: '50%' }}>
                                    <Phone size={24} style={{ color: '#22c55e' }} />
                                </div>
                                <div>
                                    <p className="text-muted" style={{ fontSize: '0.85rem' }}>WhatsApp / Call</p>
                                    <a href="https://wa.me/27782189537" style={{ fontWeight: 600, fontSize: '1.1rem' }}>078 218 9537</a>
                                </div>
                            </Card>

                            <Card style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
                                <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '0.75rem', borderRadius: '50%' }}>
                                    <MapPin size={24} style={{ color: '#a855f7' }} />
                                </div>
                                <div>
                                    <p className="text-muted" style={{ fontSize: '0.85rem' }}>Location</p>
                                    <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>South Africa (Gauteng, KwaZulu-Natal, Free State)</p>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <Card>
                        <h2>Send a Message</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid-2" style={{ gap: '1rem', marginBottom: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formState.name}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Bongz DondaDondas Tech is a fresh entrant in the ICT landscape, backed by deep industry expertise from our founder.
With a strong foundation in technology, we've hit the ground running tackling diverse projects, honing our skills, and forging meaningful partnerships right from the start.
Our Core Focus: We assist small companies with system solutions. That is what we do best. We understand that small businesses need scalable, efficient, and affordable technology to grow and we provide exactly that.
Guided by our core values Innovate, Create, Accelerate, we transform ideas into reality. From simple digital platforms to complex automation systems, our seasoned approach delivers professional results that empower our clients to lead in their fields.
"
                                    />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formState.email}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="example@dondastech.co.za"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject" className="form-label">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    value={formState.subject}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows="4"
                                    value={formState.message}
                                    onChange={handleChange}
                                    className="form-textarea"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <input
                                    type="checkbox"
                                    id="consent"
                                    name="consent"
                                    required
                                    checked={formState.consent}
                                    onChange={handleChange}
                                    style={{ marginTop: '0.3rem' }}
                                />
                                <label htmlFor="consent" style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                    I agree to the processing of my personal data in accordance with regulations.
                                </label>
                            </div>

                            <Button type="submit" variant="primary" style={{ width: '100%' }}>
                                <Send size={16} style={{ marginRight: '0.5rem' }} /> Send Message
                            </Button>
                        </form>
                    </Card>
                </div>
            </Section>
        </>
    );
};

export default Contact;
