import React, { useState } from 'react';
import '../css/DoctorDashboard.css'; 

const AccordionItem = ({ title, icon, links }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = (e, linkName, linkPath) => {
        e.preventDefault();
        
        console.log(`[SIMULACIÓN DE NAVEGACIÓN - MÉDICO]`);
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


const doctorMenuData = [
    {
        title: '1. Agenda y citas',
        icon: '📅',
        links: [
            { name: 'Calendario personal y de consultas', path: '/medico/agenda' },
            { name: 'Listado de pacientes citados', path: '/medico/citas-hoy' },
            { name: 'Reprogramar o cancelar citas', path: '/medico/modificar-cita' },
            { name: 'Disponibilidad automática', path: '/medico/bloquear-horas' },
            { name: 'Integración con Google Calendar', path: '/medico/integracion-agenda' },
        ],
    },
    {
        title: '2. Información de pacientes',
        icon: '📄',
        links: [
            { name: 'Historial clínico completo', path: '/medico/historial-completo' },
            { name: 'Notas médicas y evolución', path: '/medico/notas' },
            { name: 'Resultados de laboratorio o pruebas', path: '/medico/resultados' },
            { name: 'Adjuntar documentos o imágenes', path: '/medico/adjuntar-docs' },
            { name: 'Ver prescripciones anteriores', path: '/medico/prescripciones-previas' },
        ],
    },
    {
        title: '3. Gestión de prescripciones',
        icon: '✍️',
        links: [
            { name: 'Emitir o renovar recetas electrónicas', path: '/medico/emitir-receta' },
            { name: 'Registrar tratamientos', path: '/medico/registrar-tratamiento' },
            { name: 'Consultar alergias o contraindicaciones', path: '/medico/alergias' },
        ],
    },
    {
        title: '4. Comunicación',
        icon: '💬',
        links: [
            { name: 'Mensajería interna con pacientes y colegas', path: '/medico/mensajeria' },
            { name: 'Alertas del sistema', path: '/medico/alertas' },
            { name: 'Consultas interdepartamentales', path: '/medico/consultas-inter' },
        ],
    },
    {
        title: '5. Reportes y estadísticas',
        icon: '📈',
        links: [
            { name: 'Pacientes atendidos por día / mes', path: '/medico/reporte-atendidos' },
            { name: 'Tasa de ausencias (no-shows)', path: '/medico/tasa-ausencias' },
            { name: 'Carga de trabajo semanal o mensual', path: '/medico/carga-trabajo' },
            { name: 'Informes clínicos personalizados', path: '/medico/informes-personalizados' },
        ],
    },
    {
        title: '6. Administración y perfil',
        icon: '⚙️',
        links: [
            { name: 'Gestión de horarios y disponibilidad', path: '/medico/gestion-horarios' },
            { name: 'Actualización de datos profesionales', path: '/medico/perfil' },
            { name: 'Preferencias de notificación o agenda', path: '/medico/config-notif' },
        ],
    },
    {
        title: '7. Telemedicina (Opcional)',
        icon: '💻',
        links: [
            { name: 'Videoconsultas integradas', path: '/medico/videoconsultas' },
            { name: 'Chat en vivo con el paciente', path: '/medico/chat-vivo' },
            { name: 'Notas y diagnósticos postconsulta', path: '/medico/diagnosticos-tele' },
        ],
    },
];

const DoctorDashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <h2 className="main-title-doctor">👨‍⚕️ Panel de Control del Médico</h2>
                
                {doctorMenuData.map((item, index) => (
                    <AccordionItem 
                        key={index}
                        title={item.title}
                        icon={item.icon}
                        links={item.links}
                    />
                ))}
            </div>

            <div className="content">
                <h1>Bienvenido, Dr(a). [Apellido]</h1>
                <p>Gestiona tu agenda, pacientes y prescripciones desde aquí.</p>
                
                <div className="placeholder-content-doctor">
                    <h3>Área de Trabajo Clínico</h3>
                    <p>En este espacio se cargarían las herramientas y formularios para la consulta.</p>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;