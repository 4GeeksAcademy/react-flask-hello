import "./privacidad.css";
import BgPrivacidad from "../aboutus/img/privacidad.jpg";

export const Privacidad = () => (
  <div
    className="privacidad-container"
    style={{
      backgroundImage: `url(${BgPrivacidad})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }}
  >
    <div className="privacidad-overlay">
      <h1>Política de Privacidad</h1>

      <div className="privacidad-content">
        <p>
          En GameStore respetamos tu privacidad. Esta política explica qué datos
          recopilamos, cómo los usamos y tus derechos sobre ellos. Al usar nuestra
          web aceptas estas prácticas.
        </p>

        <h3>Datos que recopilamos</h3>
        <ul>
          <li>Datos de registro (nombre, email, contraseña)</li>
          <li>Datos de uso (historial de compras, preferencias)</li>
          <li>Datos técnicos (IP, navegador, dispositivo)</li>
          <li>
            Datos de pago (procesados de forma segura, no almacenamos números
            completos)
          </li>
        </ul>

        <h3>Para qué los usamos</h3>
        <ul>
          <li>Gestionar tu cuenta y pedidos</li>
          <li>Procesar pagos</li>
          <li>Mejorar la plataforma</li>
          <li>Enviarte comunicaciones (si aceptaste recibirlas)</li>
        </ul>

        <h3>Con quién los compartimos</h3>
        <ul>
          <li>Proveedores de pago y hosting</li>
          <li>Servicios de análisis y marketing</li>
          <li>Autoridades cuando la ley lo requiera</li>
        </ul>

        <h3>Tus derechos</h3>
        <p>
          Puedes acceder, corregir o eliminar tus datos, así como oponerte a su uso.
          Escríbenos a{" "}
          <a href="mailto:privacidad@gamestore.com">privacidad@gamestore.com</a>.
        </p>

        <h3>Cookies</h3>
        <p>
          Usamos cookies para funcionamiento, análisis y publicidad. Más
          información en nuestra{" "}
          <a href="https://www.google.com/">Política de Cookies</a>.
        </p>

        <p className="privacidad-footer-note">
          Última actualización: 1 de julio de 2025.
        </p>
      </div>
    </div>
  </div>
);