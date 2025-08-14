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
        id: 'web',
        icon: <FontAwesomeIcon icon={faWordpressSimple} />,
        title: 'services.card.wordpress.title',
        description: 'services.card.wordpress.description',
        link: 'services.card.wordpress.link'
    },
    {
        id: 'web',
        icon: <FontAwesomeIcon icon={faCode} />,
        title: 'services.card.webdev.title',
        description: 'services.card.webdev.description',
        link: 'services.card.webdev.link'
    },
    {
        id: 'web',
        icon: <FontAwesomeIcon icon={faCartShopping} />,
        title: 'services.card.ecommerce.title',
        description: 'services.card.ecommerce.description',
        link: 'services.card.ecommerce.link'
    },
    {
        id: 'web',
        icon: <FontAwesomeIcon icon={faWebflow} />,
        title: 'services.card.webflow.title',
        description: 'services.card.webflow.description',
        link: 'services.card.webflow.link'
    },
    {
        id: 'communication',
        icon: <FontAwesomeIcon icon={faHexagonNodes} />,
        title: 'services.card.socialMedia.title',
        description: 'services.card.socialMedia.description',
        link: 'services.card.socialMedia.link'
    },
    {
        id: 'communication',
        icon: <FontAwesomeIcon icon={faPenNib} />,
        title: 'services.card.copyWriting.title',
        description: 'services.card.copyWriting.description',
        link: 'services.card.copyWriting.link'
    },
    {
        id: 'communication',
        icon: <FontAwesomeIcon icon={faComments} />,
        title: 'services.card.contentProduction.title',
        description: 'services.card.contentProduction.description',
        link: 'services.card.contentProduction.link'
    },
    {
        id: 'communication',
        icon: <FontAwesomeIcon icon={faChessBishop} />,
        title: 'services.card.communicationStrategy.title',
        description: 'services.card.communicationStrategy.description',
        link: 'services.card.communicationStrategy.link'
    },
    {
        id: 'software',
        icon: <FontAwesomeIcon icon={faPenRuler} />,
        title: 'services.card.autocadLt.title',
        description: 'services.card.autocadLt.description',
        link: 'services.card.autocadLt.link'
    },
    {
        id: 'software',
        icon: <FontAwesomeIcon icon={faCube} />,
        title: 'services.card.autocadIst.title',
        description: 'services.card.autocadIst.description',
        link: 'services.card.autocadIst.link'
    }
];