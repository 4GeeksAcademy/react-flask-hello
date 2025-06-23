import React, { useState, useEffect } from 'react';
import { ChevronRight, Dumbbell, Target, Play } from 'lucide-react';
import "../../styles/Epersonalizado.css";
import { useParams } from 'react-router-dom';

const Home = () => {
  const { grupo } = useParams();
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);

  useEffect(() => {
    if (grupo) {
      setGrupoSeleccionado(grupo);
    }
  }, [grupo]);



  const gruposMusculares = {
    hombro: {
      nombre: 'Hombro',
      entrenamientos: [
        {
          nombre: 'Press militar con mancuernas',
          descripcion: 'Sentado o de pie, elevar mancuernas desde los hombros hacia arriba',
          series: '3-4 series',
          video: "https://www.youtube.com/watch?v=o5M9RZ-vWrc",
          repeticiones: '8-12 reps'
        },
        {
          nombre: 'Elevaciones laterales',
          descripcion: 'Con mancuernas, elevar los brazos hacia los lados hasta la altura de los hombros',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=n7Mns0WbmXM",
          repeticiones: '12-15 reps'
        },
        {
          nombre: 'Elevaciones frontales',
          descripcion: 'Elevar mancuernas al frente hasta la altura de los hombros alternando brazos',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=qIxtugfMI-E",
          repeticiones: '10-12 reps'
        },
        {
          nombre: 'Pájaros (elevaciones posteriores)',
          descripcion: 'Inclinado hacia adelante, elevar mancuernas hacia atrás trabajando deltoides posterior',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=OpHqGI6A1bY",
          repeticiones: '12-15 reps'
        }
      ]
    },
    pecho: {
      nombre: 'Pecho',
      entrenamientos: [
        {
          nombre: 'Press de banca',
          descripcion: 'Acostado, empujar la barra desde el pecho hacia arriba',
          series: '4 series',
          video: "https://www.youtube.com/watch?v=MkMf308jXww",
          repeticiones: '6-10 reps'
        },
        {
          nombre: 'Flexiones de pecho',
          descripcion: 'Flexiones tradicionales manteniendo el cuerpo recto',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=wLGn8XmLeEM",
          repeticiones: '10-20 reps'
        },
        {
          nombre: 'Press inclinado con mancuernas',
          descripcion: 'En banco inclinado, empujar mancuernas desde el pecho',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=PAd6ezGbDUQ",
          repeticiones: '8-12 reps'
        },
        {
          nombre: 'Aperturas con mancuernas',
          descripcion: 'Acostado, abrir y cerrar los brazos con mancuernas en arco',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=AYWpCfLcYYg",
          repeticiones: '10-12 reps'
        }
      ]
    },
    biceps: {
      nombre: 'Bíceps',
      entrenamientos: [
        {
          nombre: 'Curl de bíceps con mancuernas',
          descripcion: 'De pie, flexionar codos llevando mancuernas hacia los hombros',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=96O5mvyblQM",
          repeticiones: '10-12 reps'
        },
        {
          nombre: 'Curl martillo',
          descripcion: 'Curl con agarre neutro (palmas mirándose entre sí)',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=j99intoPKGE",
          repeticiones: '10-12 reps'
        },
        {
          nombre: 'Curl concentrado',
          descripcion: 'Sentado, apoyar codo en muslo y hacer curl con una mancuerna',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=8B0mY3gknoc",
          repeticiones: '8-10 reps por brazo'
        },
        {
          nombre: 'Curl con barra',
          descripcion: 'De pie, curl con barra recta o EZ manteniendo codos fijos',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=Ks5KNBSmw6A",
          repeticiones: '8-10 reps'
        }
      ]
    },
    triceps: {
      nombre: 'Tríceps',
      entrenamientos: [
        {
          nombre: 'Fondos en paralelas',
          descripcion: 'Bajar y subir el cuerpo usando barras paralelas',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=H6r0fh2-YNU",
          repeticiones: '8-12 reps'
        },
        {
          nombre: 'Press francés',
          descripcion: 'Acostado, extender brazos desde atrás de la cabeza',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=VN_QtPv4Ugo",
          repeticiones: '10-12 reps'
        },
        {
          nombre: 'Extensiones de tríceps',
          descripcion: 'Con mancuerna, extender brazo desde atrás de la cabeza',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=fQ-KB40W3d8",
          repeticiones: '10-12 reps por brazo'
        },
        {
          nombre: 'Fondos en banco',
          descripcion: 'Apoyar manos en banco y bajar/subir el cuerpo',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=H6r0fh2-YNU",
          repeticiones: '10-15 reps'
        }
      ]
    },
    abdomen: {
      nombre: 'Abdomen',
      entrenamientos: [
        {
          nombre: 'Crunches abdominales',
          descripcion: 'Acostado, elevar torso contrayendo abdominales',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=OsUz898onTE",
          repeticiones: '15-20 reps'
        },
        {
          nombre: 'Plancha',
          descripcion: 'Mantener posición de flexión apoyado en antebrazos',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=61A2oTh10V8",
          repeticiones: '30-60 segundos'
        },
        {
          nombre: 'Bicicleta',
          descripcion: 'Acostado, alternar rodilla con codo opuesto',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=dYxamPVcKvk",
          repeticiones: '20 reps por lado'
        },
        {
          nombre: 'Elevaciones de piernas',
          descripcion: 'Acostado, elevar piernas rectas hacia el techo',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=oxJj5FoBycQ",
          repeticiones: '12-15 reps'
        }
      ]
    },
    espalda: {
      nombre: 'Espalda',
      entrenamientos: [
        {
          nombre: 'Dominadas',
          descripcion: 'Colgado de barra, elevar cuerpo hasta que barbilla pase la barra',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=jawH2Pn_16Y",
          repeticiones: '5-10 reps'
        },
        {
          nombre: 'Remo con mancuerna',
          descripcion: 'Inclinado, tirar mancuerna hacia el torso',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=xEUQnIo0hMI",
          repeticiones: '10-12 reps por brazo'
        },
        {
          nombre: 'Peso muerto',
          descripcion: 'Levantar barra desde el suelo manteniendo espalda recta',
          series: '4 series',
          video: "https://www.youtube.com/watch?v=f4klPwr3MjU",
          repeticiones: '6-8 reps'
        },
        {
          nombre: 'Remo en polea baja',
          descripcion: 'Sentado, tirar cable hacia el abdomen',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=ue8MXKXdOVw",
          repeticiones: '10-12 reps'
        }
      ]
    },
    cuadriceps: {
      nombre: 'Cuádriceps',
      entrenamientos: [
        {
          nombre: 'Sentadillas',
          descripcion: 'Bajar como si fueras a sentarte manteniendo espalda recta',
          series: '4 series',
          video: "https://www.youtube.com/watch?v=iCOBGhyK4sQ",
          repeticiones: '10-15 reps'
        },
        {
          nombre: 'Prensa de piernas',
          descripcion: 'En máquina, empujar peso con las piernas',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=MTfwemR8QMQ",
          repeticiones: '12-15 reps'
        },
        {
          nombre: 'Zancadas',
          descripcion: 'Dar paso largo hacia adelante y bajar rodilla trasera',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=j25uCd04Sz0",
          repeticiones: '10-12 reps por pierna'
        },
        {
          nombre: 'Extensiones de cuádriceps',
          descripcion: 'Sentado en máquina, extender piernas hacia arriba',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=GwkdX6k9314",
          repeticiones: '12-15 reps'
        }
      ]
    },
    isquiotibiales: {
      nombre: 'Isquiotibiales',
      entrenamientos: [
        {
          nombre: 'Peso muerto rumano',
          descripcion: 'Con piernas semi-rectas, bajar barra manteniendo espalda recta',
          series: '4 series',
          video: "https://www.youtube.com/watch?v=UU6AS_iHPyI",
          repeticiones: '8-10 reps'
        },
        {
          nombre: 'Curl femoral acostado',
          descripcion: 'Boca abajo en máquina, flexionar piernas llevando talones a glúteos',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=kmtn5RJkvVE",
          repeticiones: '10-12 reps'
        },
        {
          nombre: 'Puente de glúteo',
          descripcion: 'Acostado, elevar cadera contrayendo glúteos e isquiotibiales',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=_oTAaAJmDVM",
          repeticiones: '12-15 reps'
        },
        {
          nombre: 'Buenos días',
          descripcion: 'De pie con barra en hombros, inclinar torso hacia adelante',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=Ti55Yp7IIL4",
          repeticiones: '10-12 reps'
        }
      ]
    },
    gemelos: {
      nombre: 'Gemelos',
      entrenamientos: [
        {
          nombre: 'Elevaciones de gemelos de pie',
          descripcion: 'De pie, elevar cuerpo sobre las puntas de los pies',
          series: '4 series',
          video: "https://www.youtube.com/watch?v=Npn-Zej7Q1s",
          repeticiones: '15-20 reps'
        },
        {
          nombre: 'Elevaciones de gemelos sentado',
          descripcion: 'Sentado con peso sobre muslos, elevar sobre puntas de pies',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=Z27RhPA66_8",
          repeticiones: '15-20 reps'
        },
        {
          nombre: 'Saltos en cajón',
          descripcion: 'Saltar sobre un cajón o plataforma usando impulso de gemelos',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=Y7oZdwP-mcY",
          repeticiones: '8-10 reps'
        },
        {
          nombre: 'Caminata en puntas',
          descripcion: 'Caminar sobre las puntas de los pies manteniendo equilibrio',
          series: '3 series',
          video: "https://www.youtube.com/watch?v=x56f7h4JG3g",
          repeticiones: '30-45 segundos'
        }
      ]
    }
  };

  // Función para extraer el ID del video de YouTube
  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const volver = () => {
    setGrupoSeleccionado(null);
  };

  if (grupoSeleccionado) {
    const grupo = gruposMusculares[grupoSeleccionado];
    return (
      <div className="entrenamiento-container">
        <div className="ejercicios-container">
          <button
            onClick={volver}
            className="btn-volver"
          >
            <ChevronRight className="btn-volver-icon" />
            Volver a grupos musculares
          </button>

          <div className="ejercicios-header">
            <div className="ejercicios-title-container">
              <Target className="ejercicios-title-icon" />
              <h1 className="ejercicios-title">Entrenamientos de {grupo.nombre}</h1>
            </div>

            <div className="ejercicios-grid">
              {grupo.entrenamientos.map((entrenamiento, index) => {
                const videoId = getYouTubeVideoId(entrenamiento.video);
                return (
                  <div key={index} className="ejercicio-card">
                    <div className="ejercicio-header">
                      <h3 className="ejercicio-nombre">{entrenamiento.nombre}</h3>
                      <Dumbbell className="ejercicio-icon" />
                    </div>

                    <p className="ejercicio-descripcion">{entrenamiento.descripcion}</p>

                    {/* Video de YouTube */}
                    {videoId && (
                      <div className="video-container">
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={entrenamiento.nombre}
                          className="video-iframe"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                        <div className="video-overlay">
                          <Play className="play-icon" />
                        </div>
                      </div>
                    )}

                    <div className="ejercicio-tags">
                      <span className="tag-series">
                        {entrenamiento.series}
                      </span>
                      <span className="tag-repeticiones">
                        {entrenamiento.repeticiones}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="entrenamiento-container">
      <div className="entrenamiento-wrapper">
        <div className="entrenamiento-header">
          <h1 className="entrenamiento-title">
            Entrenamiento Personalizado
          </h1>
          <p className="entrenamiento-subtitle">
            Selecciona el grupo muscular que quieres entrenar y descubre 4 ejercicios específicos
          </p>
        </div>

        <div className="grupos-grid">
          {Object.entries(gruposMusculares).map(([key, grupo]) => (
            <button
              key={key}
              onClick={() => setGrupoSeleccionado(key)}
              className="grupo-card"
            >
              <div className="grupo-card-header">
                <Dumbbell className="grupo-icon" />
                <ChevronRight className="grupo-arrow" />
              </div>

              <h2 className="grupo-nombre">
                {grupo.nombre}
              </h2>

              <p className="grupo-descripcion">
                4 ejercicios específicos
              </p>

              <div className="grupo-progress-bar"></div>
            </button>
          ))}
        </div>

        <div className="entrenamiento-footer">
          <p className="footer-text">
            💪 Haz clic en cualquier grupo muscular para ver los ejercicios recomendados
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
