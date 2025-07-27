import "./privacidad.css";
export const Privacidad = () => (
  <div className="privacidad-container">
    <h1>Política de Privacidad</h1>

    <div className="privacidad-content">
      <div className="privacidad-intro">
        <p>
          En GameStore (“nosotros”, “nuestro”), respetamos la privacidad de las personas que utilizan nuestra web y servicios (“tú”, “usuario”). Esta Política de Privacidad explica qué datos recopilamos, cómo los usamos y con quién los compartimos. Al acceder o usar GameStore, aceptas las prácticas aquí descritas.
        </p>
      </div>

      <h3>1. Responsable del tratamiento</h3>
      <p>
        GameStore S.L., con domicilio en Calle Ejemplo 123, Madrid, España, NIF B12345678, es el responsable del tratamiento de tus datos.
      </p>

      <h3>2. Datos que recopilamos</h3>
      <ul>
        <li><strong>Datos de registro</strong>: nombre, correo electrónico, contraseña.</li>
        <li><strong>Datos de uso</strong>: historial de compras, preferencias, interacciones con la web.</li>
        <li><strong>Datos técnicos</strong>: dirección IP, tipo de navegador, sistema operativo, tiempos de acceso.</li>
        <li><strong>Datos de pago</strong>: información de tarjeta o cuenta, recibida a través de pasarelas seguras (no almacenamos números completos).</li>
      </ul>

      <h3>3. Finalidades y bases legales</h3>
      <ul>
        <li>
          <strong>Gestionar tu cuenta y perfil:</strong> ejecución de contrato.  
        </li>
        <li>
          <strong>Procesar pedidos y pagos:</strong> ejecución de contrato y obligación legal.  
        </li>
        <li>
          <strong>Mejorar la plataforma:</strong> interés legítimo para análisis de uso y optimización.  
        </li>
        <li>
          <strong>Enviarte comunicaciones comerciales:</strong> con tu consentimiento previo (puedes revocar cuando quieras).  
        </li>
      </ul>

      <h3>4. Plazo de conservación</h3>
      <p>
        Conservaremos tus datos mientras tu cuenta esté activa y durante 3 años tras la última interacción, salvo obligación legal de conservarlos más tiempo.
      </p>

      <h3>5. Destinatarios de los datos</h3>
      <ul>
        <li>Proveedores de servicios de pago (Stripe, PayPal).</li>
        <li>Plataformas de hosting y análisis (Google Analytics).</li>
        <li>Agencias de marketing que prestan servicios por encargo.</li>
        <li>Autoridades competentes, si existe obligación legal.</li>
      </ul>

      <h3>6. Transferencias internacionales</h3>
      <p>
        Algunos proveedores pueden procesar datos fuera del Espacio Económico Europeo. Garantizamos que aplican cláusulas contractuales tipo de la UE o estándares de seguridad equivalentes.
      </p>

      <h3>7. Tus derechos</h3>
      <p>Puedes ejercer, gratuitamente, los derechos de:</p>
      <ul>
        <li>Acceso a tus datos.</li>
        <li>Rectificación de datos inexactos.</li>
        <li>Supresión (“derecho al olvido”).</li>
        <li>Limitación u oposición al tratamiento.</li>
        <li>Portabilidad de datos.</li>
        <li>Retirar tu consentimiento en cualquier momento.</li>
      </ul>
      <p>
        Para ello, contacta a <a href="mailto:privacidad@gamestore.com">privacidad@gamestore.com</a> o envía carta a la dirección indicada arriba.
      </p>

      <h3>8. Seguridad</h3>
      <p>
        Implementamos medidas técnicas y organizativas para proteger tus datos contra acceso no autorizado, pérdida y divulgación.
      </p>

      <h3>9. Cookies</h3>
      <p>
        Usamos cookies propias y de terceros para funcionamiento de la web, análisis de uso y publicidad personalizada. Consulta nuestra <a href="/cookies">Política de Cookies</a> para más información.
      </p>

      <h3>10. Cambios en esta política</h3>
      <p>
        Podremos actualizar esta Política de Privacidad. La versión vigente siempre estará en nuestra web con la fecha de la última revisión.
      </p>
      <p className="privacidad-footer-note">
        Última actualización: 1 de julio de 2025.
      </p>
    </div>
  </div>
);
