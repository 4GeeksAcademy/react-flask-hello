import React, { useState } from 'react';

const CitasForm = () => {
    
    const [formData, setFormData] = useState({
        nombre: '',
        especialidad: 'Medicina General',
        fecha: ''
    });

  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

   
    const handleSubmit = (e) => {
        e.preventDefault(); 
        
        //  
        console.log("Cita solicitada:", formData);
        
        alert(`¡Gracias ${formData.nombre}! Tu cita para ${formData.especialidad} ha sido solicitada.`);

       
        setFormData({
            nombre: '',
            especialidad: 'Medicina General',
            fecha: ''
        });
    };

    return (
        <section id="citas" style={styles.formContainer}>
            <h3 style={styles.title}>Solicita tu Cita Médica</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
                
                <label style={styles.label}>
                    Nombre Completo:
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </label>

                <label style={styles.label}>
                    Especialidad Requerida:
                    <select
                        name="especialidad"
                        value={formData.especialidad}
                        onChange={handleChange}
                        style={styles.input}
                    >
                        <option value="Medicina General">Medicina General</option>
                        <option value="Pediatría">Pediatría</option>
                        <option value="Cardiología">Cardiología</option>
                        <option value="Dermatología">Dermatología</option>
                    </select>
                </label>
                
                <label style={styles.label}>
                    Fecha Preferida:
                    <input
                        type="date"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </label>

                <button type="submit" style={styles.submitButton}>
                    Confirmar Solicitud
                </button>
            </form>
        </section>
    );
};

const styles = {
    formContainer: {
        padding: '50px 20px',
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
    },
    title: {
        fontSize: '2em',
        color: '#008080',
        marginBottom: '30px',
    },
    form: {
        maxWidth: '500px',
        margin: '0 auto',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        textAlign: 'left',
    },
    label: {
        display: 'block',
        marginBottom: '15px',
        fontWeight: 'bold',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    submitButton: {
        backgroundColor: '#20B2AA',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1.1em',
        marginTop: '20px',
        width: '100%',
    }
};

export default CitasForm;
