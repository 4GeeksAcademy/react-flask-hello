import React, { useState } from 'react';
import './PatientDashboard.css'; 


const AccordionItem = ({ title, icon, links }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = (e, linkName, linkPath) => {
        e.preventDefault();
        
       
        console.log(`[SIMULACIÓN DE NAVEGACIÓN]`);
        console.log(`Has hecho clic en: "${linkName}"`);
        console.log(`Ruta Futura (para Router): ${linkPath}`);
    };


    return (
        <div className="accordion-item">
           
            <div 
                className="accordion-header" 
                onClick={() => setIsOpen(!isOpen)}
            >
                <div>
                    <span className="icon">{icon}</span> {title}
                </div>
               
                <span className={`arrow ${isOpen ? 'rotated' : ''}`}>&gt;</span>
            </div>

            <div className={`accordion-content ${isOpen ? 'active' : ''}`}>
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.path}
                        className="secondary-link"
                        onClick={(e) => handleLinkClick(e, link.name, link.path)}
                    >
                        {link.name}
                    </a>
                ))}
            </div>
        </div>
    );
};
// --------------------------------------------------------------------------


const patientMenuData = [
    {
        title: '1. Citas médicas',
        icon: '📅',
        links: [
            { name: 'Agendar cita', path: '/paciente/agendar-cita' },
            { name: 'Modificar cita', path: '/paciente/modificar-cita' },
            { name: 'Cancelar cita', path: '/paciente/cancelar-cita' },
            { name: 'Historial de citas', path: '/paciente/historial-citas' },
            { name: 'Recordatorios automáticos', path: '/paciente/recordatorios' },
        ],
    },
    {
        title: '2. Resultados e informes médicos',
        icon: '🔬',
        links: [
            { name: 'Análisis clínicos y de laboratorio', path: '/paciente/analisis' },
            { name: 'Informes de radiología o diagnóstico', path: '/paciente/radiologia' },
            { name: 'Informes de alta hospitalaria', path: '/paciente/alta' },
            { name: 'Historial médico completo', path: '/paciente/historial-medico' },
        ],
    },
    {
        title: '3. Prescripciones y medicación',
        icon: '💊',
        links: [
            { name: 'Visualizar recetas activas', path: '/paciente/recetas-activas' },
            { name: 'Descargar receta electrónica', path: '/paciente/descargar-receta' },
            { name: 'Solicitar renovación o revisión', path: '/paciente/solicitar-renovacion' },
            { name: 'Historial de medicación', path: '/paciente/historial-medicacion' },
        ],
    },
    {
        title: '4. Facturación y seguros',
        icon: '💳',
        links: [
            { name: 'Visualizar facturas (pagadas o pendientes)', path: '/paciente/facturas' },
            { name: 'Realizar pagos online', path: '/paciente/pagos' },
            { name: 'Consultar cobertura o aseguradora', path: '/paciente/cobertura' },
        ],
    },
    {
        title: '5. Comunicación directa',
        icon: '💬',
        links: [
            { name: 'Mensajería segura con el médico', path: '/paciente/mensajeria' },
            { name: 'Solicitudes administrativas', path: '/paciente/solicitudes-adm' },
            { name: 'Alertas o notificaciones del hospital', path: '/paciente/alertas' },
        ],
    },
    {
        title: '6. Documentos personales',
        icon: '📁',
        links: [
            { name: 'Subir documentos externos', path: '/paciente/subir-docs' },
            { name: 'Descargar documentos del hospital', path: '/paciente/descargar-docs' },
        ],
    },
    {
        title: '7. Perfil y configuración',
        icon: '⚙️',
        links: [
            { name: 'Datos personales y de contacto', path: '/paciente/datos-personales' },
            { name: 'Preferencias de notificación', path: '/paciente/preferencias' },
            { name: 'Gestión de contraseñas y seguridad', path: '/paciente/seguridad' },
        ],
    },
];

const PatientDashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <h2 className="main-title">👋 Panel de Control del Paciente</h2>
                
                {patientMenuData.map((item, index) => (
                    <AccordionItem 
                        key={index}
                        title={item.title}
                        icon={item.icon}
                        links={item.links}
                    />
                ))}
            </div>

            <div className="content">
                <h1>Bienvenido, Paciente (HABRA QUE PONERLE LINK DE SU NOMBRE) </h1>
                <p>Tu información de salud a un clic. Utiliza el menú lateral para navegar.</p>
                
                <div className="placeholder-content">
                    <h3>Área de Contenido Principal</h3>
                    <p>En este espacio se cargarían las páginas secundarias. Revisa la consola para ver la simulación de navegación.</p>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;