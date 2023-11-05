import React, { useState } from 'react';
import "../../styles/preguntasfrecuentes.css";

const PreguntasFrecuentes = () => {
  const [q1Checked, setQ1Checked] = useState(false);
  const [q2Checked, setQ2Checked] = useState(false);
  const [q3Checked, setQ3Checked] = useState(false);
  const [q4Checked, setQ4Checked] = useState(false);
  const [q5Checked, setQ5Checked] = useState(false);

  const toggleQ1 = () => setQ1Checked(!q1Checked);
  const toggleQ2 = () => setQ2Checked(!q2Checked);
  const toggleQ3 = () => setQ3Checked(!q3Checked);
  const toggleQ4 = () => setQ4Checked(!q4Checked);
  const toggleQ5 = () => setQ5Checked(!q5Checked);

  return (
    <div className='container'>
      <div className="faq-header">Preguntas Frecuentes</div>

      <div className="faq-content">

        {/* question and answer box start */}
        <div className={`faq-question ${q1Checked ? 'open' : ''}`} onClick={toggleQ1}>
          <input id="q1" type="checkbox" className="panel" checked={q1Checked} onChange={toggleQ1} />

          <div className="faq-content-container">
            <div className='title-container d-inline-flex'>
              <div className="plus">+</div>
              <label className="panel-title">¿Cómo veo los requerimientos para aplicar a la beca de mi interés?</label>
            </div>
            {q1Checked && <div className="panel-content">Puedes acceder a la información dándole click al botón de "Aplicar" ya que te va a redirigir a la página con la información completa sobre esa específica beca. Si cumples todos los requisitos establecidos por la institución, no dudes en aplicar.</div>}
          </div>
        </div>
        {/* question and answer box finish */}

            {/* question and answer box start */}
            <div className={`faq-question ${q2Checked ? 'open' : ''}`} onClick={toggleQ2}>
          <input id="q2" type="checkbox" className="panel" checked={q2Checked} onChange={toggleQ2} />

          <div className="faq-content-container">
            <div className='title-container d-inline-flex'>
              <div className="plus">+</div>
              <label className="panel-title">¿Puedo aplicar a todas las becas que desee?</label>
            </div>
            {q2Checked && <div className="panel-content">Puedes aplicar a todas las becas que desees mientras cumplas con los requerimientos mínimos que cada institución establece. No hay un límite establecido por Bexplora, puedes llevar registro de las becas a las que aplicaste en la sección de Mis Aplicaciones.</div>}
          </div>
        </div>
        {/* question and answer box finish */}

         {/* question and answer box start */}
         <div className={`faq-question ${q3Checked ? 'open' : ''}`} onClick={toggleQ3}>
          <input id="q3" type="checkbox" className="panel" checked={q3Checked} onChange={toggleQ3} />

          <div className="faq-content-container">
            <div className='title-container d-inline-flex'>
              <div className="plus">+</div>
              <label className="panel-title">¿A quién van dirigidas estas becas? </label>
            </div>
            {q3Checked && <div className="panel-content">Estas becas van dirigidas a residentes de Costa Rica ya que las becas publicadas en Bexplora por las diferentes instituciones van para personas que conforman este grupo y es un requerimiento residir en dicho país. En Bexplora esperamos pronto extender esta plataforma a diferentes regiones.</div>}
          </div>
        </div>
        {/* question and answer box finish */}

  {/* question and answer box start */}
  <div className={`faq-question ${q4Checked ? 'open' : ''}`} onClick={toggleQ4}>
          <input id="q4" type="checkbox" className="panel" checked={q4Checked} onChange={toggleQ4} />

          <div className="faq-content-container">
            <div className='title-container d-inline-flex'>
              <div className="plus">+</div>
              <label className="panel-title">¿Me debo registrar como usuario o institución?</label>
            </div>
            {q4Checked && <div className="panel-content">Si sos una persona interesada en aplicar a una de las becas que se ofrecen en Bexplora debes registrarte como Usuario. Cuando ya te hayas registrado como Usuario, tendras accesso a ver tu perfil y utilizar la sección de Mis Aplicaciones donde podrás ver el registro de las becas a donde has aplicado.</div>}
          </div>
        </div>
        {/* question and answer box finish */}

         {/* question and answer box start */}
  <div className={`faq-question ${q5Checked ? 'open' : ''}`} onClick={toggleQ5}>
          <input id="q5" type="checkbox" className="panel" checked={q5Checked} onChange={toggleQ5} />

          <div className="faq-content-container">
            <div className='title-container d-inline-flex'>
              <div className="plus">+</div>
              <label className="panel-title">¿Bexplora es la institución/universidad que está dando la beca?</label>
            </div>
            {q5Checked && <div className="panel-content">No. Bexplora es la plataforma donde las diferentes instituciones publican las becas que tienen disponibles y estas instituciones son las que ofrecen el beneficio. Bexplora solamente se encarga de facilitar esta información para que tu puedas tener fácil acceso a las varias oportunidades que se ofrecen en diferentes instituciones sin tener que hacer una búsqueda exhaustiva.</div>}
          </div>
        </div>
        {/* question and answer box finish */}

        </div>
      </div>
  );
}

export default PreguntasFrecuentes