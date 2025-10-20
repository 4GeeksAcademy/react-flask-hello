import React from "react";

const HeroSection = () => {
    return (
        <section style={styles.hero}>
            <div style={styles.content}>
                <h2 style={styles.title}>Cuidado Integral y Personalizado para Ti</h2>
                <p style={styles.subtitle}>
                    Agenda tu consulta hoy mismo con nuestros especialistas de la salud.
                </p>
                <a href="#citas" style={styles.ctaButton}>
                    Agendar Cita Ahora
                </a>
            </div>
        </section>
    );
};

const styles = {
    hero: {
        backgroundColor: '#F0F8FF', 
        minHeight: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '50px 20px',
    },
    content: {
        maxWidth: '800px',
    },
    title: {
        fontSize: '3em',
        color: '#008080', 
        marginBottom: '20px',
    },
    subtitle: {
        fontSize: '1.2em',
        color: '#333',
        marginBottom: '40px',
    },
    ctaButton: {
        backgroundColor: '#FF6347',
        color: 'white',
        padding: '15px 30px',
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '1.2em',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
     
    }
};

export default HeroSection;
