import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'en', // idioma por defecto
    fallbackLng: 'es',
    backend: {
      loadPath: '/api/translations/{{lng}}', // aquí tu API devuelve traducciones por idioma
    },
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;

//Configurado para que traduzca de Ingles a Español