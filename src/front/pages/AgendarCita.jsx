import React, { useState } from 'react';
import '../css/AgendarCita.css'; // Crearás este CSS después

// --- Datos Simulados ---
// Simulación de la disponibilidad del médico para un día específico
const getAvailableHours = (date) => {
    // Simulamos que el médico solo tiene disponibilidad para el día 10, 15 y 22.
    if (!date) return [];
    
    const dayOfMonth = date.getDate();

    if (dayOfMonth === 10) {
        return ['09:00', '10:30', '12:00', '15:00', '16:30'];
    } else if (dayOfMonth === 15) {
        return ['11:00', '14:00', '17:00'];
    } else if (dayOfMonth === 22) {
        return ['08:00', '09:00', '10:00', '11:00'];
    } else {
        return []; // No hay disponibilidad en este día
    }
};

const AgendarCita = () => {
    // Estado para la fecha seleccionada (usaremos un objeto Date o null)
    const [selectedDate, setSelectedDate] = useState(null);
    // Estado para las horas disponibles
    const [availableHours, setAvailableHours] = useState([]);
    // Estado para la hora elegida por el paciente
    const [selectedHour, setSelectedHour] = useState(null);

    // SIMULACIÓN DE LA RENDERIZACIÓN DEL CALENDARIO (Solo UI/Mockup)
    // En un proyecto real, se usaría una librería de calendario (ej: react-calendar)
    const mockCalendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
    
    // Función que se ejecuta al seleccionar un día
    const handleDaySelect = (day) => {
        const date = new Date(new Date().getFullYear(), new Date().getMonth(), day);
        setSelectedDate(date);
        setSelectedHour(null); // Reiniciar la hora al cambiar el día
        
        // Cargar las horas disponibles simuladas
        const hours = getAvailableHours(date);
        setAvailableHours(hours);
    };

    // Función que se ejecuta al seleccionar una hora
    const handleHourSelect = (hour) => {
        setSelectedHour(hour);
        alert(`Cita seleccionada: ${selectedDate.toLocaleDateString()} a las ${hour}`);
        // Aquí se llamaría a la API para confirmar la cita
    };

    return (
        <div className="cita-container">
            <h2>📅 Agendar Nueva Cita</h2>
            <p>Paso 1: Selecciona la fecha deseada en el calendario.</p>
            
            {/* Selector de Mes/Año (simulación) */}
            <div className="date-selector-mock">
                <button>&lt;</button>
                <span>Octubre 2025</span>
                <button>&gt;</button>
            </div>

            {/* Calendario (Simulación de tipo mes) */}
            <div className="calendar-grid">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
                    <div key={day} className="day-header">{day}</div>
                ))}
                
                {/* Relleno para empezar el día 1 en el lunes */}
                {[...Array(5)].map((_, i) => <div key={`empty-${i}`} className="day-cell empty"></div>)}

                {mockCalendarDays.map(day => (
                    <div 
                        key={day}
                        className={`day-cell ${selectedDate && selectedDate.getDate() === day ? 'selected' : ''} ${getAvailableHours(new Date(new Date().getFullYear(), new Date().getMonth(), day)).length > 0 ? 'has-availability' : ''}`}
                        onClick={() => handleDaySelect(day)}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Ventana/Panel de Horas Disponibles */}
            {selectedDate && (
                <div className="availability-panel">
                    <h3>Horas Disponibles para el {selectedDate.toLocaleDateString()}</h3>
                    
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
            
            {/* Botón de Confirmación (aparece al elegir hora) */}
            {selectedHour && (
                <div className="confirmation-box">
                    <p>Cita: **{selectedDate.toLocaleDateString()} a las {selectedHour}**</p>
                    <button className="confirm-button">Confirmar Cita</button>
                </div>
            )}
        </div>
    );
};

export default AgendarCita;