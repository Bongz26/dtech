import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Target, Lightbulb, Shield, Heart, Rocket, Users, CheckCircle, Globe } from 'lucide-react';
import founderImageDark from '../assets/bongani-dark.png';

const About = () => {
    return (
        <>
            <Helmet>
                <title>About Us | DondasTech</title>
                <meta name="description" content="Learn about DondasTech's mission to assist with system solutions." />
            </Helmet>

            <style>{`
                .about-page {
                    background-color: #030712; /* Deep dark blue/black */
                    color: #ffffff;
                    min-height: 100vh;
                    font-family: 'Inter', sans-serif;
                    overflow-x: hidden;
                }
                .text-gradient {
                    background: linear-gradient(90deg, #60a5fa 0%, #3b82f6 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .glass-panel {
                    background: rgba(17, 24, 39, 0.6);
                    border: 1px solid rgba(59, 130, 246, 0.2);
                    border-radius: 16px;
                    padding: 24px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
                .glass-panel-bio {
                    background: rgba(15, 23, 42, 0.85);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    padding: 32px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.6);
                }
                .grid-values {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                }
                .grid-stats {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                    align-items: center;
                }
                @media (max-width: 1024px) {
                    .grid-values, .grid-stats {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 24px;
                    }
                    .about-layout {
                        flex-direction: column !important;
                    }
                    .bio-card {
                        position: relative !important;
                        bottom: auto !important;
                        left: auto !important;
                        margin-top: -40px;
                        margin-left: 20px;
                        margin-right: 20px;
                    }
                }
                @media (max-width: 640px) {
                    .grid-values, .grid-stats {
                        grid-template-columns: 1fr;
                    }
                    .hero-headline {
                        font-size: 2.5rem !important;
                    }
                }
            `}</style>

            <div className="about-page" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
                <div className="container about-layout" style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start' }}>

                    {/* LEFT COLUMN: Content */}
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2rem', zIndex: 2 }}>

                        <div>
                            <div style={{ color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                                About The Founder
                            </div>
                            <h1 className="hero-headline" style={{ fontSize: '4rem', lineHeight: '1.1', fontWeight: '800', margin: '0 0 1.5rem 0' }}>
                                Built on <span className="text-gradient">purpose.</span><br />
                                Driven by <span className="text-gradient">impact.</span>
                            </h1>
                            <p style={{ fontSize: '1.125rem', color: '#e2e8f0', lineHeight: '1.6', marginBottom: '1rem' }}>
                                Dondas Tech was founded on the belief that technology can bring dignity, efficiency and excellence to every organization that serves people.
                            </p>
                            <div style={{ width: '40px', height: '3px', background: '#3b82f6', marginBottom: '1rem' }}></div>
                            <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                We build smart, reliable and scalable solutions that help organizations streamline operations, enhance client experiences and grow with confidence.
                            </p>
                        </div>

                        {/* Values Card */}
                        <div className="glass-panel">
                            <div style={{ color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                                Our Values
                            </div>
                            <div className="grid-values">
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <Lightbulb size={20} color="#60a5fa" />
                                        <span style={{ fontWeight: 'bold' }}>Innovative</span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>We embrace technology to solve real problems.</p>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <Shield size={20} color="#60a5fa" />
                                        <span style={{ fontWeight: 'bold' }}>Reliable</span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>We build systems you can depend on.</p>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <Heart size={20} color="#60a5fa" />
                                        <span style={{ fontWeight: 'bold' }}>Dignified</span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>We respect the sacred nature of every service.</p>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <Users size={20} color="#60a5fa" />
                                        <span style={{ fontWeight: 'bold' }}>Supportive</span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>We grow together with our partners and clients.</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats Card */}
                        <div className="glass-panel">
                            <div className="grid-stats">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '50%' }}>
                                        <Rocket size={24} color="#60a5fa" />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>20+</div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Systems Delivered</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '12px', borderRadius: '50%' }}>
                                        <Users size={24} color="#a855f7" />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>50+</div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Client Partners</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '50%' }}>
                                        <CheckCircle size={24} color="#60a5fa" />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>100%</div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Commitment</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '50%' }}>
                                        <Globe size={24} color="#60a5fa" />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1 Mission</div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Dignity through technology</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Founder Image & Bio */}
                    <div style={{ flex: '0.8', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>

                        {/* Background Glow Effect */}
                        <div style={{
                            position: 'absolute',
                            top: '10%', right: '0',
                            width: '300px', height: '300px',
                            background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(3,7,18,0) 70%)',
                            filter: 'blur(40px)',
                            zIndex: 0
                        }}></div>

                        <img
                            src={founderImageDark}
                            alt="Bongani Dondas"
                            style={{
                                width: '100%',
                                maxWidth: '600px',
                                borderRadius: '24px',
                                objectFit: 'contain',
                                zIndex: 1,
                            }}
                        />

                        {/* Overlapping Bio Card */}
                        <div className="glass-panel-bio bio-card" style={{
                            position: 'relative',
                            marginTop: '-60px',
                            width: '90%',
                            alignSelf: 'center',
                            zIndex: 2,
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}>
                            <h2 style={{ margin: '0 0 4px 0', fontSize: '1.75rem', fontWeight: 'bold' }}>Bongani Dondas</h2>
                            <div style={{ color: '#60a5fa', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                Founder & Operations Technologist
                            </div>
                            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6', margin: '0 0 1.5rem 0' }}>
                                With a strong foundation in operations and technology, Bongani created Dondas Tech to bridge the gap between outdated processes and the future of digital operations management. His mission is to empower organizations across Africa with smart systems that bring clarity, control and efficiency to every operation.
                            </p>
                            <div style={{
                                fontFamily: "'Brush Script MT', 'Dancing Script', cursive",
                                fontSize: '2.5rem',
                                color: '#3b82f6',
                                opacity: 0.8,
                                transform: 'rotate(-5deg)'
                            }}>
                                Bongani D.
                            </div>
                        </div>

                    </div>
                </div>

                {/* BOTTOM VISION SECTION */}
                <div className="container" style={{ marginTop: '3rem' }}>
                    <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '16px', borderRadius: '12px' }}>
                                <Target size={32} color="#60a5fa" />
                            </div>
                            <div>
                                <div style={{ color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '4px' }}>
                                    Our Vision
                                </div>
                                <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                                    To be the trusted technology partner that drives operational excellence and digital transformation across Africa.
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.8 }}>
                            {/* Simple inline logo representation */}
                            <div style={{ border: '1px solid #60a5fa', padding: '4px', borderRadius: '4px' }}>
                                <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>DT</span>
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '1.2rem', lineHeight: '1' }}>DondasTech</div>
                                <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>Innovate | Create | Accelerate</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default About;
