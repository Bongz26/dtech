import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Code, Server, Smartphone, ArrowRight, CheckCircle } from 'lucide-react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Dondastech | ICT Solutions & System Development</title>
        <meta name="description" content="Dondastech provides professional ICT solutions, system development, and digital platforms. We specialize in assisting small companies with scalable system solutions." />
      </Helmet>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-blob blob-1" />
          <div className="hero-blob blob-2" />
        </div>

        <div className="container hero-content">
          <span style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            borderRadius: '50px',
            background: 'rgba(59, 130, 246, 0.1)',
            color: '#60a5fa',
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            Reliable Technology Partner
          </span>
          <h1>
            Scalable System Solutions <br /> for Growing Businesses
          </h1>
          <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
            We specialize in assisting small companies with custom system solutions, digital platforms, and ICT strategies designed for growth and efficiency.
          </p>
          <div className="flex justify-center gap-2">
            <Link to="/contact">
              <Button>
                Get a Quote <ArrowRight style={{ marginLeft: '0.5rem' }} size={18} />
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="secondary">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Services Preview */}
      <Section className="section-alt">
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <h2>Our Expertise</h2>
          <p className="text-muted">
            We deliver high-quality technical solutions tailored to your unique business needs.
          </p>
        </div>

        <div className="grid-3">
          <Card>
            <Code className="text-primary" size={48} style={{ marginBottom: '1.5rem' }} />
            <h3>System Development</h3>
            <p className="text-muted">
              Custom software tailored to streamline your business operations and workflows.
            </p>
          </Card>
          <Card>
            <Smartphone className="text-primary" size={48} style={{ marginBottom: '1.5rem', color: '#a855f7' }} />
            <h3>Digital Platforms</h3>
            <p className="text-muted">
              Modern, responsive websites and web applications that drive engagement.
            </p>
          </Card>
          <Card>
            <Server className="text-primary" size={48} style={{ marginBottom: '1.5rem', color: '#14b8a6' }} />
            <h3>ICT Integration</h3>
            <p className="text-muted">
              Seamless integration of digital tools to automate and scale your business.
            </p>
          </Card>
        </div>

        <div className="text-center" style={{ marginTop: '3rem' }}>
          <Link to="/services">
            <Button variant="secondary">Explore All Services</Button>
          </Link>
        </div>
      </Section>

      {/* Why Us */}
      <Section>
        <div className="grid-2">
          <div>
            <h2>Why Partner with <span className="text-primary">Dondastech</span>?</h2>
            <p className="text-muted">
              We are not just developers; we are partners in your growth. With hands-on experience in the ICT sector, we understand the challenges small businesses face.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
              {[
                "Proven track record with small businesses",
                "Scalable solutions aimed at future growth",
                "Clean, modern, and professional designs",
                "Ongoing technical support and innovation"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="text-primary" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Card style={{ borderLeft: '4px solid var(--color-primary)' }}>
              <blockquote style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#cbd5e1', marginBottom: '1.5rem' }}>
                "Our mission is simple: To provide accessible, high-tech system solutions that help small companies compete and thrive in the digital age."
              </blockquote>
              <div style={{ fontWeight: 'bold' }}>— Dondastech Team</div>
            </Card>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section style={{ paddingBottom: '6rem' }}>
        <div className="card text-center" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2>Ready to Digitalize Your Business?</h2>
            <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              Let's discuss how we can build a system solution that fits your growing needs.
            </p>
            <Link to="/contact">
              <Button variant="primary">Contact Us Today</Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Home;
