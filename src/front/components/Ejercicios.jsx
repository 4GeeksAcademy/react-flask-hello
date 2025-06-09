import React from "react";

import "../../styles/Ejercicios.css";


const Ejercicios=()=>{
    return(
      <>
        <div className="ejercicios-container">
      
      {/* Imagen del ejercicio */}
      <div className="ejercicios-image">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9zUzLBFilYgiRkyZYXNlbt5UDMY0WMP4bPN-asrQ_8L0-AN-fJQNVRFBIrbq46CdnSLY&usqp=CAUhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOfxCSgYXWzSO8jiO5GNWBYAzV3wWgaEm1JA&s" 
          alt="Ejercicio Sentadilla" 
        />
      </div>

      {/* Explicación del ejercicio */}
      <div className="ejercicios-info">
        <h2>Sentadilla Básica</h2>
        <p>Para realizar una sentadilla correctamente:</p>
        <ul>
          <li>Ponte de pie con los pies separados al ancho de los hombros.</li>
          <li>Baja las caderas como si te fueras a sentar en una silla.</li>
          <li>Mantén la espalda recta y las rodillas detrás de los dedos de los pies.</li>
          <li>Sube lentamente a la posición inicial.</li>
        </ul>
      </div>

      {/* Video de YouTube */}
      <div className="ejercicios-video">
        <iframe 
         src="https://www.youtube.com/embed/UXJrBgI2RxA"
         title="Sentadilla Correcta"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         allowFullScreen
        ></iframe>
      </div>
    </div>


    <div className="ejercicios-container">
      
      {/* Pecho: Flexiones */}
      <div className="ejercicios-image">
        <img 
            src="https://www.entrenamiento.com/wp-content/uploads/2015/02/flexiones.jpg" 
            alt="Flexiones de pecho" 
          />
      </div>
      <div className="ejercicios-info">
        <h2>Flexiones de Pecho (Pectorales)</h2>
          <p>Para realizar flexiones correctamente:</p>
          <ul>
            <li>Colócate boca abajo con las manos separadas a la altura de los hombros.</li>
            <li>Baja el pecho hacia el suelo sin tocarlo.</li>
            <li>Mantén el cuerpo recto en todo momento.</li>
            <li>Empuja de nuevo hacia arriba hasta extender los brazos.</li>
          </ul>
      </div>

      {/* Video de YouTube */}
      <div className="ejercicios-video">
        <iframe 
         src="https://www.youtube.com/embed/IODxDxX7oi4"
            title="Flexiones de Pecho"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
      </div>
    </div>


       <div className="ejercicios-container">
      
      {/* Pecho: Flexiones */}
      <div className="ejercicios-image">
        <img 
            src="https://www.entrenamiento.com/wp-content/uploads/2015/02/flexiones.jpg" 
            alt="Flexiones de pecho" 
          />
      </div>
      <div className="ejercicios-info">
        <h2>Flexiones de Pecho (Pectorales)</h2>
          <p>Para realizar flexiones correctamente:</p>
          <ul>
            <li>Colócate boca abajo con las manos separadas a la altura de los hombros.</li>
            <li>Baja el pecho hacia el suelo sin tocarlo.</li>
            <li>Mantén el cuerpo recto en todo momento.</li>
            <li>Empuja de nuevo hacia arriba hasta extender los brazos.</li>
          </ul>
      </div>

      {/* Video de YouTube */}
      <div className="ejercicios-video">
        <iframe 
         src="https://www.youtube.com/embed/IODxDxX7oi4"
            title="Flexiones de Pecho"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
      </div>
    </div>


       <div className="ejercicios-container">
      
      {/* Abdominales: Plancha */}
      <div className="ejercicios-image">
        <img 
            src="data:image/jpeg;base64,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" 
            alt="Plancha abdominal" 
          />
      </div>

      {/* Explicación del ejercicio */}
      <div className="ejercicios-info">
        <h2>Plancha (Abdominales)</h2>
          <p>Para realizar la plancha correctamente:</p>
          <ul>
            <li>Apóyate en tus antebrazos y puntas de los pies.</li>
            <li>Mantén el cuerpo recto y contrae el abdomen.</li>
            <li>No dejes que las caderas bajen o se levanten.</li>
            <li>Mantén la posición entre 30 y 60 segundos.</li>
          </ul>
      </div>

      {/* Video de YouTube */}
      <div className="ejercicios-video">
        <iframe 
        src="https://www.youtube.com/embed/pSHjTRCQxIw"
            title="Plancha Abdominal"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
      </div>
    </div>
    </>
    )

}
export default Ejercicios;