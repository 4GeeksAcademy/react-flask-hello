
import React, { useState } from 'react'; // useState nos permite guardar información que puede cambiar
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Iconos de flechas izquierda y derecha

// Creamos nuestro componente (como una caja que contiene todo el carrusel)
const Carousel = () => {
  
  // Estado: es como la "memoria" del componente
  // currentIndex guarda qué imagen estamos viendo ahora (0=primera, 1=segunda, etc.)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Aquí guardamos todos los datos de nuestros entrenadores
  // Es como una lista con la información de cada uno
  const trainers = [
    {
      id: 1, // Número único para identificar cada entrenador
      src: "https://hips.hearstapps.com/hmg-prod/images/arnold-schwarzenegger-1547023769.jpg", // URL de la foto
      name: "Carlos Mendoza", // Nombre del entrenador
      specialty: "Entrenador Personal", // Su especialidad
      description: "Especialista en fuerza y acondicionamiento físico. 8 años de experiencia ayudando a alcanzar objetivos de fitness." // Descripción
    },
    {
      id: 2,
      src: "https://www.avanzaentucarrera.com/orientacion/comp/uploads/2014/05/pilates-1024x543.jpg",
      name: "Ana Rodríguez", 
      specialty: "Yoga & Pilates",
      description: "Instructora certificada en yoga y pilates. Enfoque en bienestar integral y flexibilidad."
    },
    {
      id: 3,
      src: "https://www.sinburpeesenmiwod.com/wp-content/uploads/2018/01/cursos-oficiales-entrenador-crossfit.jpg",
      name: "Miguel Torres",
      specialty: "CrossFit",
      description: "Coach de CrossFit nivel 2. Especialista en entrenamientos funcionales de alta intensidad."
    },
    {
      id: 4,
      src: "https://estheticinternacional.es/wp-content/uploads/2020/07/elegir-mejor-dietista-nutricionista-deportivo-3.jpg",
      name: "Laura García",
      specialty: "Nutrición Deportiva",
      description: "Nutricionista deportiva y entrenadora. Planes personalizados para optimizar rendimiento y salud."
    },
    {
      id: 5,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe-qWF0RyCiCXz6hmsON3sqQKhMS1LwwFR4g&s",
      name: "David López",
      specialty: "Nutricion",
      description: "Nutricionista especializado en perdida de grasa y ganancia muscular."
    }
  ];

  // Función para ir a la siguiente imagen
  const nextSlide = () => {
    // setCurrentIndex cambia el valor de currentIndex
    // prevIndex es el valor actual
    setCurrentIndex((prevIndex) => 
      // Si estamos en la última imagen (trainers.length - 1), volvemos a la primera (0)
      // Si no, pasamos a la siguiente (+1)
      prevIndex === trainers.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para ir a la imagen anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      // Si estamos en la primera imagen (0), vamos a la última
      // Si no, vamos a la anterior (-1)
      prevIndex === 0 ? trainers.length - 1 : prevIndex - 1
    );
  };

  // Función para ir directamente a una imagen específica
  const goToSlide = (index) => {
    setCurrentIndex(index); // Simplemente cambiamos currentIndex al número que nos pasan
  };

  // Aquí empieza lo que se va a mostrar en pantalla (el HTML)
  return (
    
    <div className="max-w-4xl mx-auto">
      
      <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        
        <div className="relative h-96"> 
          
          {/* La imagen actual - trainers[currentIndex] toma el entrenador actual */}
          <img
            src={trainers[currentIndex].src} 
            alt={trainers[currentIndex].name} 
            className="w-full h-full object-cover" 
          />
          
          {/* Botón para ir a la imagen anterior */}
          <button
            onClick={prevSlide} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            
          >
            <ChevronLeft size={24} /> {/* Icono de flecha izquierda */}
          </button>

          {/* Botón para ir a la siguiente imagen (igual que el anterior pero a la derecha) */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          {/* Información del entrenador (se muestra encima de la imagen) */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
            {/* 
            absolute bottom-0 left-0 right-0 = cubre todo el ancho en la parte inferior
            bg-gradient-to-t from-black/90 to-transparent = gradiente de negro a transparente hacia arriba
            */}
            
            {/* Nombre del entrenador */}
            <h3 className="text-white text-2xl font-bold mb-1">
              {trainers[currentIndex].name} {/* Muestra el nombre del entrenador actual */}
            </h3>
            
            {/* Especialidad del entrenador */}
            <h4 className="text-blue-300 text-lg font-semibold mb-2">
              {trainers[currentIndex].specialty} {/* Muestra la especialidad en azul */}
            </h4>
            
            {/* Descripción del entrenador */}
            <p className="text-gray-200 text-sm">
              {trainers[currentIndex].description} {/* Muestra la descripción */}
            </p>
          </div>
        </div>

        {/* Indicadores (los puntos en la parte inferior) */}
        <div className="flex justify-center space-x-2 py-4 bg-gray-800">
          {/* 
          flex = elementos en fila
          justify-center = centrados horizontalmente
          space-x-2 = espaciado entre elementos
          */}
          
          {/* trainers.map crea un botón por cada entrenador */}
          {trainers.map((_, index) => (
            // _ significa que no usamos el dato del entrenador, solo el index (posición)
            <button
              key={index} 
              onClick={() => goToSlide(index)} 
              className={`w-3 h-3 rounded-full transition-colors ${
                // Si es la imagen actual, color azul; si no, color gris
                index === currentIndex 
                  ? 'bg-blue-400' 
                  : 'bg-gray-500 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Contador que muestra "Entrenador X de Y" */}
      <div className="text-center mt-4 text-gray-600">
        Entrenador {currentIndex + 1} de {trainers.length}
        {/* currentIndex + 1 porque las posiciones empiezan en 0, pero queremos mostrar desde 1 */}
      </div>
    </div>
  );
};


export default Carousel;






