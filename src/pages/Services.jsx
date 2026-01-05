import React from 'react';
import { Helmet } from 'react-helmet-async';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Monitor, Smartphone, Database, Shield, Settings, BarChart } from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: <Monitor size={32} style={{ color: '#60a5fa' }} />,
            title: "Custom System Development",
            description: "We build tailored software solutions that address your specific business challenges, automating workflows and improving efficiency."
        },
        {
            icon: <Smartphone size={32} style={{ color: '#c084fc' }} />,
            title: "Web & Mobile Applications",
            description: "Responsive, high-performance websites and mobile apps designed to provide a seamless user experience across all devices."
        },
        {
            icon: <Database size={32} style={{ color: '#4ade80' }} />,
            title: "Database Design & Management",
            description: "Secure and scalable database architectures to ensure your business data is organized, accessible, and protected."
        },
        {
            icon: <Settings size={32} style={{ color: '#fb923c' }} />,
            title: "Process Automation",
            description: "We identify bottlenecks in your operations and implement digital tools to automate repetitive tasks."
        },
        {
            icon: <Shield size={32} style={{ color: '#f87171' }} />,
            title: "Technical Support & Maintenance",
            description: "Ongoing support to ensure your systems remain up-to-date, secure, and functioning optimally."
        },
        {
            icon: <BarChart size={32} style={{ color: '#2dd4bf' }} />,
            title: "ICT Consulting",
            description: "Expert advice on technology strategy to help small businesses make informed decisions for future growth."
        }
    ];

    return (
        <>
            <Helmet>
                <title>Services | Dondastech</title>
                <meta name="description" content="Explore our ICT services: System Development, Digital Platforms, Automation, and Technical Support." />
            </Helmet>

            <div style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'linear-gradient(to bottom, var(--color-bg-alt), var(--color-bg))', textAlign: 'center' }}>
                <div className="container">
                    <h1>Our Services</h1>
                    <p className="text-muted" style={{ fontSize: '1.25rem' }}>
                        Comprehensive ICT solutions designed to scale with your business.
                    </p>
                </div>
            </div>

            <Section>
                <div className="grid-3">
                    {services.map((service, index) => (
                        <Card key={index} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <div style={{ marginBottom: '1.5rem' }}>{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p className="text-muted" style={{ flexGrow: 1 }}>{service.description}</p>
                        </Card>
                    ))}
                </div>
            </Section>

            <Section className="section-alt">
                <div className="container text-center">
                    <h2>Need a Custom Solution?</h2>
                    <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Every business is unique. Contact us to discuss your specific requirements, and we'll design a solution just for you.
                    </p>
                    <Link to="/contact">
                        <Button variant="primary">Let's Talk</Button>
                    </Link>
                </div>
            </Section>
        </>
    );
};

export default Services;
