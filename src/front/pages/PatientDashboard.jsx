import React, { useState } from 'react';
import '../css/PatientDashboard.css'; 

// =======================================================================================
// LÓGICA DE DÍAS Y HORAS
// =======================================================================================

const generateHours = () => {
    const hours = [];
    // 9:00 (540 minutos) a 14:00 (840 minutos), intervalo de 30 minutos
    for (let minutes = 540; minutes <= 840; minutes += 30) {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        const time = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        hours.push(time);
    }
    return hours;
};
const workingHours = generateHours();

/**
 * Verifica si el día es no laborable (Sábado y Domingo).
 */
const isUnavailableDay = (date) => {
    const dayOfWeek = date.getDay(); // 0=Dom, 1=Lun, 2=Mar, 3=Mié, 4=Jue, 5=Vie, 6=Sáb
    return dayOfWeek === 0 || dayOfWeek === 6; // Bloquea Sábados y Domingos
};

// Obtiene las horas disponibles (filtrando días no laborables y horarios ocupados simulados)
const getAvailableHours = (date) => {
    if (!date || isUnavailableDay(date)) {
        return []; 
    }

    // SIMULACIÓN: Bloqueamos algunas horas en el día 15
    const occupiedSlots = [];
    if (date.getDate() === 15) {
        occupiedSlots.push('09:00', '14:00');
    }
    
    return workingHours.filter(hour => !occupiedSlots.includes(hour));
};

/**
 * Ordena las citas por fecha y hora cronológicamente (más próxima primero).
 */
const sortAppointmentsChronologically = (appointments) => {
    // Es crucial que la comparación sea sobre los objetos originales si vamos a usar .indexOf
    // para encontrar el índice original después de un sort.
    return [...appointments].sort((a, b) => {
        const dateA = new Date(a.date);
        dateA.setHours(parseInt(a.hour.substring(0, 2)), parseInt(a.hour.substring(3, 5)));

        const dateB = new Date(b.date);
        dateB.setHours(parseInt(b.hour.substring(0, 2)), parseInt(b.hour.substring(3, 5)));

        return dateA - dateB;
    });
};


// =======================================================================================
// 1. COMPONENTE DE VISTA SECUNDARIA: AgendarCita (Icono de cita actualizado)
// =======================================================================================

const AgendarCita = ({ patientName, hospitalName, onAppointmentConfirmed, initialDate, activeAppointments }) => {
    
    const initialMonth = initialDate ? initialDate.getMonth() : new Date().getMonth();
    const initialYear = initialDate ? initialDate.getFullYear() : new Date().getFullYear();

    const [currentMonth, setCurrentMonth] = useState(initialMonth);
    const [currentYear, setCurrentYear] = useState(initialYear);
    
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableHours, setAvailableHours] = useState([]);
    const [selectedHour, setSelectedHour] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false); 
    
    const dateToRender = new Date(currentYear, currentMonth, 1);
    const monthName = dateToRender.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
    const startingEmptyDays = (firstDayOfWeek + 6) % 7; 
    
    // Función para verificar si hay una cita en un día específico del mes/año actual
    const hasAppointmentOnDay = (day) => {
        return activeAppointments.some(cita => 
            cita.date.getDate() === day &&
            cita.date.getMonth() === currentMonth &&
            cita.date.getFullYear() === currentYear
        );
    };

    const goToPreviousMonth = () => {
        const today = new Date();
        if (currentYear === today.getFullYear() && currentMonth === today.getMonth()) return; 

        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
        setSelectedDate(null);
        setIsConfirmed(false);
    };

    const goToNextMonth = () => {
        if (currentYear >= 2030) return; 
        
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
        setSelectedDate(null);
        setIsConfirmed(false);
    };

    const handleDaySelect = (day) => {
        const date = new Date(currentYear, currentMonth, day);
        
        if (isUnavailableDay(date)) {
            setSelectedDate(null);
            setAvailableHours([]);
            setSelectedHour(null);
            setIsConfirmed(false);
            return;
        }

        setSelectedDate(date);
        setSelectedHour(null); 
        setIsConfirmed(false);
        
        const hours = getAvailableHours(date);
        setAvailableHours(hours);
    };

    const handleHourSelect = (hour) => {
        setSelectedHour(hour);
        setIsConfirmed(false); 
    };
    
    const handleConfirmAppointment = () => {
        if (selectedDate && selectedHour) {
            
            const appointmentDetails = {
                patient: patientName,
                hospital: hospitalName,
                date: selectedDate, 
                hour: selectedHour,
                dateTimeFormatted: `${selectedDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })} a las ${selectedHour} hrs`
            };
            
            setIsConfirmed(true);
            onAppointmentConfirmed(appointmentDetails);
        }
    };


    return (
        <div className="cita-container">
            <h2>📅 Agendar Nueva Cita</h2>
            
            {isConfirmed && (
                <div className="confirmation-row">
                    <p>✅ **Cita Confirmada**</p>
                    <div className="details-grid">
                        <span>**Paciente:** {patientName}</span>
                        <span>**Hospital:** {hospitalName}</span>
                        <span>**Fecha y Hora:** {selectedDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })} a las {selectedHour} hrs</span>
                    </div>
                </div>
            )}
            

            <p>Paso 1: Selecciona la fecha y hora. (Horario: Lun-Vie de 9:00 a 14:00)</p>
            
            <div className="date-selector-mock">
                <button onClick={goToPreviousMonth}>&lt;</button>
                <span>{monthName.charAt(0).toUpperCase() + monthName.slice(1)}</span>
                <button onClick={goToNextMonth} disabled={currentYear >= 2030 && currentMonth === 11}>&gt;</button>
            </div>

            {/* Calendario Centrado */}
            <div className="centered-calendar-container">
                <div className="calendar-grid">
                    {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
                        <div key={day} className="day-header">{day}</div>
                    ))}
                    
                    {[...Array(startingEmptyDays)].map((_, i) => <div key={`empty-${i}`} className="day-cell empty"></div>)}

                    {[...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1;
                        const dateToCheck = new Date(currentYear, currentMonth, day);
                        const isUnavailable = isUnavailableDay(dateToCheck);
                        const isOccupied = hasAppointmentOnDay(day);
                        
                        return (
                            <div 
                                key={day}
                                className={`day-cell 
                                    ${selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === currentMonth ? 'selected' : ''} 
                                    ${isUnavailable ? 'unavailable-day' : 'working-day'}
                                    ${!isUnavailable && getAvailableHours(dateToCheck).length > 0 ? 'has-availability' : ''}
                                `}
                                onClick={() => handleDaySelect(day)}
                            >
                                {day}
                                {/* Indicador de cita existente (NUEVO EMOJI Y CSS) */}
                                {isOccupied && <span className="appointment-indicator">🔴</span>}
                            </div>
                        )})}
                </div>
            </div>

            {/* Panel de Horas Disponibles */}
            {selectedDate && !isConfirmed && (
                <div className="availability-panel">
                    <h3>Horas Disponibles para el {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
                    
                    {availableHours.length > 0 ? (
                        <div className="hours-list">
                            {availableHours.map(hour => (
                                <button 
                                    key={hour}
                                    className={`hour-button ${selectedHour === hour ? 'selected-hour' : ''}`}
                                    onClick={() => handleHourSelect(hour)}
                                >
                                    {hour}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="no-availability">😔 No hay horarios disponibles para el día seleccionado.</p>
                    )}
                </div>
            )}
            
            {/* Botón de Confirmación */}
            {selectedHour && !isConfirmed && (
                <div className="confirmation-box">
                    <p>Cita pre-seleccionada: **{selectedDate.toLocaleDateString()} a las {selectedHour}**</p>
                    <button className="confirm-button" onClick={handleConfirmAppointment}>
                        Confirmar Cita Ahora
                    </button>
                </div>
            )}
        </div>
    );
};


// =======================================================================================
// 2. COMPONENTE DE VISTA SECUNDARIA: GestionarCitas (FUSIONADO y con orden cronológico)
// =======================================================================================

const GestionarCitas = ({ sortedAppointments, onModifyClick, onCancelCita }) => {
    return (
        <div className="cita-container">
            <h2>✏️ Gestionar Citas Agendadas</h2>
            
            {sortedAppointments && sortedAppointments.length > 0 ? (
                sortedAppointments.map((cita, index) => (
                    <div key={index} className="appointment-view gestion-item">
                        {/* Título Dinámico y Cronológico */}
                        <h3>
                            {index + 1}. Cita {cita.date.getDate()} de {cita.date.toLocaleDateString('es-ES', { month: 'long' })}
                        </h3>
                        <div className="confirmation-row current-appointment">
                            <div className="details-grid">
                                <span>**Paciente:** {cita.patient}</span>
                                <span>**Hospital:** {cita.hospital}</span>
                                <span>**Fecha y Hora:** {cita.dateTimeFormatted}</span>
                            </div>
                        </div>
                        
                        <div className="modification-actions">
                            {/* Botón Reagendar (Izquierda) */}
                            <button 
                                className="confirm-button" 
                                onClick={() => onModifyClick(cita.originalIndex)} // Usamos el índice original
                            >
                                Reagendar
                            </button>
                            
                            {/* Botón Cancelar (Derecha) */}
                            <button 
                                className="quick-button button-cancelar cancel-btn" 
                                onClick={() => onCancelCita(cita.originalIndex)} // Usamos el índice original
                            >
                                ¿Cancelar su cita?
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="placeholder-content">
                    <p>No tienes citas activas para gestionar.</p>
                </div>
            )}
        </div>
    );
};


// =======================================================================================
// 3. DATOS Y LÓGICA DE NAVEGACIÓN
// =======================================================================================

const mapPathToView = (path) => {
    return path.split('/').pop(); 
};

const patientMenuData = [
    {
        title: '1. Citas médicas',
        icon: '📅',
        links: [
            { name: 'Agendar cita', path: '/paciente/agendar-cita' },
            { name: 'Gestionar citas', path: '/paciente/gestionar-citas' }, // NUEVO ENLACE
            { name: 'Historial de citas', path: '/paciente/historial-citas' },
            { name: 'Recordatorios automáticos', path: '/paciente/recordatorios' },
        ],
    },
    // ... (El resto del menú se mantiene igual)
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

// =======================================================================================
// 4. COMPONENTE PRINCIPAL: PatientDashboard
// =======================================================================================

const PatientDashboard = () => {
    const [currentView, setCurrentView] = useState('welcome'); 
    const [openAccordion, setOpenAccordion] = useState(null); 
    const [activeAppointments, setActiveAppointments] = useState([]); 
    const [isModifying, setIsModifying] = useState(false);
    const [appointmentToModifyIndex, setAppointmentToModifyIndex] = useState(null); 

    // Simulación de datos del usuario logueado
    const patientName = "María Gómez"; 
    const hospitalName = "Hospital General San Juan";

    const handleNavigationClick = (path) => {
        const viewKey = mapPathToView(path);
        
        // El modo modificación solo se activa para agendar-cita (calendario)
        if (viewKey !== 'agendar-cita') {
            setIsModifying(false);
            // Solo reseteamos el índice si no es la vista de gestión, para que se mantenga el contexto
            if (viewKey !== 'gestionar-citas') {
                setAppointmentToModifyIndex(null);
            }
        }
        setCurrentView(viewKey);
    };
    
    // Handler cuando AgendarCita confirma una cita
    const handleAppointmentConfirmed = (appointmentDetails) => {
        let newAppointments;

        if (isModifying && appointmentToModifyIndex !== null) {
            // Caso de MODIFICACIÓN
            newAppointments = activeAppointments.map((cita, index) => 
                index === appointmentToModifyIndex ? appointmentDetails : cita
            );
            setIsModifying(false);
            setAppointmentToModifyIndex(null);
        } else {
            // Caso de NUEVA CITA
            newAppointments = [...activeAppointments, appointmentDetails];
        }
        
        setActiveAppointments(newAppointments);
        setCurrentView('gestionar-citas'); // Redirige a la nueva vista de gestión
    };

    // Handler cuando GestionarCitas quiere reagendar
    const handleModifyClick = (originalIndex) => {
        setAppointmentToModifyIndex(originalIndex); 
        setIsModifying(true); 
        setCurrentView('agendar-cita'); // Abre el calendario
    };
    
    // Handler cuando GestionarCitas quiere cancelar
    const handleCancelCita = (indexToCancel) => {
        if (window.confirm("¿Estás seguro de que quieres CANCELAR esta cita?")) {
            const newAppointments = activeAppointments.filter((_, index) => index !== indexToCancel);
            setActiveAppointments(newAppointments);
            setCurrentView('gestionar-citas'); // Mantener en la vista de gestión
            console.log(`Cita N° ${indexToCancel + 1} Cancelada.`);
        }
    };

    const handleAccordionToggle = (title) => {
        setOpenAccordion(openAccordion === title ? null : title);
    };
    
    const handleQuickAccessClick = (action) => {
        const pathMap = {
            'Tus citas': '/paciente/agendar-cita', 
            'Gestionar citas': '/paciente/gestionar-citas', // NUEVO BOTÓN RÁPIDO
        };
        handleNavigationClick(pathMap[action]);
    };

    const renderContent = () => {
        const citaToModify = appointmentToModifyIndex !== null ? activeAppointments[appointmentToModifyIndex] : null;
        
        // Preparamos la lista ordenada y con el índice original para las vistas de gestión
        const sortedAppointmentsWithIndex = sortAppointmentsChronologically(activeAppointments).map((cita, index, array) => {
            // Buscamos el índice original del objeto dentro del array activo sin ordenar
            const originalIndex = activeAppointments.indexOf(cita);
            return { ...cita, originalIndex };
        });


        switch (currentView) {
            case 'agendar-cita':
                return (
                    <AgendarCita 
                        patientName={patientName} 
                        hospitalName={hospitalName} 
                        onAppointmentConfirmed={handleAppointmentConfirmed} 
                        initialDate={citaToModify ? citaToModify.date : null}
                        activeAppointments={activeAppointments} 
                    />
                );
            case 'gestionar-citas': // NUEVA VISTA
                return (
                    <GestionarCitas 
                        sortedAppointments={sortedAppointmentsWithIndex} 
                        onModifyClick={handleModifyClick}
                        onCancelCita={handleCancelCita}
                    />
                );
            case 'welcome':
            default:
                return (
                    <div className="placeholder-content">
                        <h3>Área de Contenido Principal</h3>
                        <p>Selecciona una opción del menú lateral o usa los botones de acceso rápido.</p>
                    </div>
                );
        }
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar con el menú de acordeón */}
            <div className="sidebar">
                <h2 className="main-title">👋 Panel de Control del Paciente</h2>
                
                {patientMenuData.map((item, index) => {
                    const isOpen = openAccordion === item.title;

                    return (
                        <div key={index} className="accordion-item">
                            {/* Header del acordeón */}
                            <div 
                                className="accordion-header" 
                                onClick={() => handleAccordionToggle(item.title)}
                            >
                                <div>
                                    <span className="icon">{item.icon}</span> {item.title}
                                </div>
                                <span className={`arrow ${isOpen ? 'rotated' : ''}`}>&gt;</span>
                            </div>

                            {/* Contenido del acordeón */}
                            <div className={`accordion-content ${isOpen ? 'active' : ''}`}>
                                {item.links.map((link, linkIndex) => {
                                    // Filtramos los enlaces obsoletos (Modificar cita y Cancelar cita)
                                    if (link.name === 'Modificar cita' || link.name === 'Cancelar cita') return null;

                                    return (
                                        <a
                                            key={linkIndex}
                                            href="#" 
                                            className="secondary-link"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                // Mapeo especial para los enlaces que se fusionaron
                                                let path = link.path;
                                                if (path.includes('modificar-cita') || path.includes('cancelar-cita')) {
                                                    path = '/paciente/gestionar-citas';
                                                }
                                                handleNavigationClick(path);
                                            }}
                                        >
                                            {link.name}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Contenido principal */}
            <div className="content">
                <h1>Bienvenido/a, {patientName}</h1> 
                <p>Tu información de salud a un clic. Utiliza el menú lateral o el acceso rápido para navegar.</p>
                
                {/* SECCIÓN DE BOTONES DE ACCESO RÁPIDO (AJUSTADO) */}
                <div className="quick-access-buttons">
                    
                    <button 
                        className="quick-button button-agenda"
                        onClick={() => handleQuickAccessClick('Tus citas')} 
                    >
                        <span className="button-icon">📅</span> 
                        Tus citas
                    </button>
                    
                    <button 
                        className="quick-button button-modificar"
                        onClick={() => handleQuickAccessClick('Gestionar citas')} // RENOMBRADO
                    >
                        <span className="button-icon">✏️</span>
                        Gestionar citas
                    </button>
                    
                    {/* ELIMINADO: Botón rápido de Cancelar cita */}
                    
                </div>
                
                {/* Renderizado Dinámico del Contenido */}
                {renderContent()}
            </div>
        </div>
    );
};

export default PatientDashboard;