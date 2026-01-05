import React from 'react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Projects = () => {
    const projects = [
        {
            title: "Small Business Inventory System",
            category: "System Development",
            description: "A custom inventory management solution built for a local retail chain to automate stock tracking and reordering.",
            tags: ["React", "Node.js", "PostgreSQL"],
            image: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
        },
        {
            title: "Corporate Client Portal",
            category: "Digital Platform",
            description: "A secure client portal allowing real-time document sharing, project status tracking, and communication.",
            tags: ["Vue.js", "Firebase", "Vanilla CSS"],
            image: "linear-gradient(135deg, #334155 0%, #1e293b 100%)"
        },
        {
            title: "Logistics Fleet Tracker",
            category: "Automation",
            description: "An automated tracking system for a logistics company, integrating GPS data with a central dashboard.",
            tags: ["React Native", "Google Maps API", "Express"],
            image: "linear-gradient(135deg, #475569 0%, #334155 100%)"
        }
    ];

    return (
        <>
            <Helmet>
                <title>Projects | Dondastech</title>
                <meta name="description" content="Explore Dondastech's portfolio of ICT projects and system solutions." />
            </Helmet>

            <div style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'linear-gradient(to bottom, var(--color-bg-alt), var(--color-bg))', textAlign: 'center' }}>
                <div className="container">
                    <h1>Our Projects</h1>
                    <p className="text-muted" style={{ fontSize: '1.25rem' }}>
                        A showcase of our recent collaborations and technical solutions.
                    </p>
                </div>
            </div>

            <Section>
                <div className="grid-3">
                    {projects.map((project, index) => (
                        <Card key={index} style={{ padding: 0, overflow: 'hidden' }}>
                            <div
                                style={{
                                    height: '200px',
                                    width: '100%',
                                    background: project.image,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    color: 'rgba(255,255,255,0.1)',
                                    fontSize: '4rem',
                                    fontWeight: 'bold',
                                    userSelect: 'none'
                                }}>
                                    {index + 1}
                                </div>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                    {project.category}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{project.title}</h3>
                                <p className="text-muted" style={{ fontSize: '0.95rem' }}>{project.description}</p>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                                    {project.tags.map(tag => (
                                        <span key={tag} style={{
                                            padding: '0.25rem 0.5rem',
                                            background: 'rgba(255,255,255,0.05)',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            border: '1px solid var(--color-border)',
                                            color: 'var(--color-text-muted)'
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>
        </>
    );
};

export default Projects;
