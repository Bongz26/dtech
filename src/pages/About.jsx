import React from 'react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import { Target, Lightbulb } from 'lucide-react';
import founderImage from '../assets/founder.png';

const About = () => {
    return (
        <>
            <Helmet>
                <title>About Us | Dondastech</title>
                <meta name="description" content="Learn about Dondastech, our journey in the ICT sector and our mission to assist small companies with system solutions." />
            </Helmet>

            {/* Hero */}
            <div style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'linear-gradient(to bottom, var(--color-bg-alt), var(--color-bg))', textAlign: 'center' }}>
                <div className="container">
                    <h1>About Us</h1>
                    <p className="text-muted" style={{ fontSize: '1.25rem' }}>
                        Driven by innovation, grounded in experience.
                    </p>
                </div>
            </div>

            <Section>
                {/* Founder Image with Floating Widgets */}
                <div style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                        position: 'relative',
                        maxWidth: '900px',
                        width: '100%',
                        borderRadius: '1rem',
                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)',
                    }}>
                        <img
                            src={founderImage}
                            alt="Bongz Donda - Founder of Dondastech"
                            style={{ width: '100%', display: 'block', borderRadius: '1rem', objectFit: 'cover' }}
                        />
                        
                        {/* CSS for glassmorphism */}
                        <style>{`
                            .glass-card {
                                background: rgba(17, 24, 39, 0.7);
                                backdrop-filter: blur(12px);
                                -webkit-backdrop-filter: blur(12px);
                                border: 1px solid rgba(255, 255, 255, 0.1);
                                box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
                                border-radius: 12px;
                                padding: 1.5rem;
                                color: #ffffff;
                                z-index: 10;
                            }
                            @media (max-width: 768px) {
                                .floating-widget {
                                    position: relative !important;
                                    top: auto !important;
                                    left: auto !important;
                                    right: auto !important;
                                    bottom: auto !important;
                                    transform: none !important;
                                    margin: 1rem auto;
                                    width: calc(100% - 2rem) !important;
                                }
                            }
                        `}</style>

                        {/* Widget 1: Core Values */}
                        <div className="glass-card floating-widget" style={{
                            position: 'absolute',
                            top: '10%',
                            left: '-5%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '1rem 1.5rem'
                        }}>
                            <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '8px', borderRadius: '8px' }}>
                                <Target size={20} color="#3b82f6" />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Core Values</div>
                                <div style={{ fontWeight: 'bold' }}>Innovate • Create • Accelerate</div>
                            </div>
                        </div>

                        {/* Widget 2: Mission */}
                        <div className="glass-card floating-widget" style={{
                            position: 'absolute',
                            top: '40%',
                            left: '-10%',
                            maxWidth: '300px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <Lightbulb size={18} color="#a855f7" />
                                <span style={{ fontWeight: '600' }}>Our Mission</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                                Empowering small businesses with scalable system solutions.
                            </p>
                        </div>

                        {/* Widget 3: Stats */}
                        <div className="glass-card floating-widget" style={{
                            position: 'absolute',
                            bottom: '-5%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: '3rem',
                            padding: '1.5rem 3rem',
                            width: 'max-content',
                            justifyContent: 'space-around'
                        }}>
                            <div>
                                <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#f97316' }}>100%</div>
                                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>Reliability</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#3b82f6' }}>24/7</div>
                                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>Support</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#e2e8f0' }}>Total</div>
                                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>Dignity & Respect</div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="grid-2" style={{ alignItems: 'start' }}>
                    <div>
                        <h2>Our Journey</h2>
                        <div className="text-muted" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <p>
                                Dondas Tech is a fresh entrant in the ICT landscape, backed by deep industry expertise from our founder.
                            </p>
                            <p>
                                With a strong foundation in technology, we've hit the ground running tackling diverse projects, honing our skills and forging meaningful partnerships right from the start.
                            </p>
                            <p>
                                <strong>Our Core Focus:</strong> We assist small companies with system solutions. That is what we do best. We understand that small businesses need scalable, efficient and affordable technology to grow and we provide exactly that.
                            </p>
                            <p>
                                Guided by our core values <strong>Innovate, Create, Accelerate</strong>, we transform ideas into reality. From simple digital platforms to complex automation systems, our seasoned approach delivers professional results that empower our clients to lead in their fields.
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <Card style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                                <Target className="text-primary" size={24} />
                            </div>
                            <div>
                                <h3>Our Mission</h3>
                                <p className="text-muted">
                                    To empower small businesses with high-quality, scalable system solutions that drive efficiency and growth.
                                </p>
                            </div>
                        </Card>
                        <Card style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                                <Lightbulb size={24} style={{ color: '#a855f7' }} />
                            </div>
                            <div>
                                <h3>Our Vision</h3>
                                <p className="text-muted">
                                    To be the most reliable technology partner for emerging businesses in South Africa.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </Section>
        </>
    );
};

export default About;
