import React from "react";
import LogoWhats from "../assets/img/LogoWhats.svg"
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { useTranslation } from "react-i18next";

export default function WhatsappButton() {
    const { t } = useTranslation();

    return (

        <FloatingWhatsApp
            phoneNumber="593995117464"
            avatar={LogoWhats}

            accountName={t('whatsapp.accountName')}
            statusMessage={t('whatsapp.statusMessage')}
            chatMessage={t('whatsapp.chatMessage')}
            placeholder={t('whatsapp.placeholder')}
            
        />
    );
};