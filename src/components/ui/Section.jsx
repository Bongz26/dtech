import React from 'react';

const Section = ({ id, className = '', children, centered = false }) => {
    return (
        <section id={id} className={`section ${className}`}>
            <div className={`container ${centered ? 'text-center' : ''}`}>
                {children}
            </div>
        </section>
    );
};

export default Section;
