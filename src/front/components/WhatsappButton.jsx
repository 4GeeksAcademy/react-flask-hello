import React from "react";
import LogoWhats from "../assets/img/LogoWhats.svg"
import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function WhatsappButton() {

    return (

        <FloatingWhatsApp
            phoneNumber="593995117464"
            accountName="CloudTech Sistemas"
            statusMessage="Normalmente responde en 1 hora"
            chatMessage="¡Hola! 👋 ¿Cómo podemos ayudarte?"
            placeholder="Escribe tu mensaje"
            avatar={LogoWhats}
        />
    );
};