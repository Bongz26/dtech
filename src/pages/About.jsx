import React from 'react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import { Target, Lightbulb } from 'lucide-react';

const About = () => {
    return (
        <>
            <Helmet>
                <title>About Us | Dondastech</title>
                <meta name="description" content="Learn about Dondastech, our journey in the ICT sector, and our mission to assist small companies with system solutions." />
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
                <div className="grid-2" style={{ alignItems: 'start' }}>
                    <div>
                        <h2>Our Journey</h2>
                        <div className="text-muted" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <p>
                                Dondas Tech is a fresh entrant in the ICT landscape, backed by deep industry expertise from our founder.
                            </p>
                            <p>
                                With a strong foundation in technology, we've hit the ground running tackling diverse projects, honing our skills, and forging meaningful partnerships right from the start.
                            </p>
                            <p>
                                <strong>Our Core Focus:</strong> We assist small companies with system solutions. That is what we do best. We understand that small businesses need scalable, efficient, and affordable technology to grow and we provide exactly that.
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
