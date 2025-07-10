import { faWordpressSimple } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faWebflow } from "@fortawesome/free-brands-svg-icons";
import { faHexagonNodes } from "@fortawesome/free-solid-svg-icons";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faChessBishop } from "@fortawesome/free-solid-svg-icons";
import { faPenRuler } from "@fortawesome/free-solid-svg-icons";
import { faCube } from "@fortawesome/free-solid-svg-icons";

export const servicesContent = [
    {
        id: web,
        icon: <FontAwesomeIcon icon={faWordpressSimple} />,
        title: "Wordpress",
        description: "Potencia tu presencia con la plataforma CMS más versátil y popular. Diseñamos y desarrollamos sitios WordPress a medida, fáciles de gestionar y optimizados para el crecimiento de tu marca.",
        link: "Tu web con WordPress"
    },
    {
        id: web,
        icon: <FontAwesomeIcon icon={faCode} />,
        title: "Web Dev",
        description: "Para soluciones únicas y necesidades específicas. Construimos desarrollos web personalizados con las últimas tecnologías, garantizando funcionalidad, escalabilidad y rendimiento excepcional.",
        link: "Explora el desarrollo a medida"
    },
    {
        id: web,
        icon: <FontAwesomeIcon icon={faCartShopping} />,
        title: "E-commerce",
        description: "Lanza y comienza a vender con tu tienda online gracias a un diseño intuitivo y funcionalidades avanzadas. Creamos experiencias de compra que convierten visitantes en clientes fieles y aumentan tus ventas.",
        link: "Impulsa tu E-commerce"
    },
    {
        id: web,
        icon: <FontAwesomeIcon icon={faWebflow} />,
        title: "WebFlow",
        description: "Diseñamos sitios web visualmente impresionantes y altamente funcionales sin código complejo. Ideal para proyectos que demandan diseño de vanguardia y autonomía en la gestión.",
        link: "Descubre Webflow"
    },
    {
        id: communication,
        icon: <FontAwesomeIcon icon={faHexagonNodes} />,
        title: "Manejo de redes",
        description: "Gestionamos tus plataformas sociales con estrategia y creatividad. Construimos comunidades, aumentamos el engagement y fortalecemos la presencia de tu marca e interacción con tu público.",
        link: "Impulsa tu marca en redes"
    },
    {
        id: communication,
        icon: <FontAwesomeIcon icon={faPenNib} />,
        title: "Copywriting",
        description: "Creamos textos persuasivos y optimizados para web, blogs, redes sociales y campañas que captan la atención, transmiten un mensaje claro y convierten visitantes y seguidores en clientes.",
        link: "Escríbenos"
    },
    {
        id: communication,
        icon: <FontAwesomeIcon icon={faComments} />,
        title: "Producción de contenido",
        description: "Contamos tu historia con videos, post de redes sociales, artículos de blog y más. Generamos contenido de valor que posiciona tu marca como referente en tu sector.",
        link: "Crea con nosotros"
    },
    {
        id: communication,
        icon: <FontAwesomeIcon icon={faChessBishop} />,
        title: "Estrategia de comunicación",
        description: "Planificamos la hoja de ruta de tu comunicación digital. Investigamos, definimos tu voz y creamos un plan integral que reúne todo tu universo digital para cumplir tus objetivos.",
        link: "Descubre tu potencial"
    },
    {
        id: software,
        icon: <FontAwesomeIcon icon={faPenRuler} />,
        title: "AutoCAD LT",
        description: "Transforma tus ideas en planos precisos con el software de dibujo 2D líder en la industria. Crea, edita y documenta tus diseños con eficiencia, optimizando tu flujo de trabajo y entrega tus proyectos en tiempo récord.",
        link: "Potencia tu diseño 2D"
    },
    {
        id: software,
        icon: <FontAwesomeIcon icon={faCube} />,
        title: "AutoCAD IST",
        description: "Diseña sin límites en 2D y 3D con la herramienta más completa para arquitectos e ingenieros. Acelera tus flujos de trabajo y crea diseños impactantes con potentes funciones de modelado, visualización y automatización.",
        link: "Adquirir licencia completa"
    }
];