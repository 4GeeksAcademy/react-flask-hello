import React from "react";

export const Footer = () => {
  /*const handleGoBack = () => {
    window.history.back();
  };*/ /*Es un efecto rallante y lo guardo por si acaso. Alexis*/
  const SloganRandom=() => {
    const slogans = [
      "Ahorra tu dinero fácilmente",
      "Tu dinero, tu futuro",
      "Gestiona tus finanzas con estilo",
      "Ahorra hoy, disfruta mañana",
      "Finanzas inteligentes para todos",
      "Tu aliado en el ahorro",
      "Ahorra con confianza",
      "Transforma tus finanzas personales",
      "Ahorra, invierte, crece",
      "Tu dinero, tus reglas",
      "Ahorra sin complicaciones",
      "Finanzas al alcance de tu mano",
      "Ahorra y alcanza tus metas",
      "Ahorra con propósito",
      "Tu camino hacia la libertad financiera",
      "Ahorra con nosotros, crece con nosotros",
      "Ahorra hoy, sonríe mañana",
      "Ahorra con estilo",
      "Ahorra y vive mejor",
      "Ahorra para lo que realmente importa",
      "Ahorra con nosotros, alcanza tus sueños",
      "Ahorra y disfruta de la vida",
      "Ahorra con inteligencia",
      "Ahorra y construye tu futuro",
      "Ahorra con nosotros, vive sin preocupaciones",
      "Ahorra y alcanza tus objetivos",
      "Ahorra con nosotros, transforma tu vida",
      "Ahorra y haz realidad tus sueños",
      "Ahorra con nosotros, vive sin límites",
      "Ahorra y disfruta de la libertad financiera",
      "Ahorra con nosotros, alcanza tus metas financieras",
      "Ahorra y vive la vida que deseas",
      "Ahorra con nosotros, construye tu legado",
      "Ahorra y alcanza tus sueños más grandes",
      "Ahorra con nosotros, vive la vida que mereces",
      "Ahorra y alcanza tus metas más ambiciosas",
      "Ahorra con nosotros, transforma tu futuro",
      "Ahorra y vive la vida que siempre has querido",
      "Ahorra con nosotros, alcanza tus sueños más locos",
      "Ahorra y vive la vida que siempre has imaginado",
      "Ahorra con nosotros, alcanza tus metas más desafiantes",
      "Ahorra y vive la vida que siempre has soñado",
      "Ahorra con nosotros, alcanza tus metas más audaces",
      "Ahorra y vive la vida que siempre has querido vivir",
      "Ahorra con nosotros, alcanza tus metas más extraordinarias",
      "Ahorra y vive la vida que siempre has deseado",
      "Ahorra con nosotros, alcanza tus metas más increíbles",
      "Ahorra y vive la vida que siempre has anhelado",
      "Ahorra con nosotros, alcanza tus metas más sorprendentes",
      "Ahorra y vive la vida que siempre has soñado vivir",
      "Ahorra con nosotros, alcanza tus metas más impresionantes",
      "Ahorra y vive la vida que siempre has querido experimentar",
      "Ahorra con nosotros, alcanza tus metas más extraordinarias",
      "Ahorra y vive la vida que siempre has querido alcanzar",
      "Ahorra con nosotros, alcanza tus metas más asombrosas",
      "Ahorra y vive la vida que siempre has querido disfrutar",
      "Ahorra con nosotros, alcanza tus metas más espectaculares",
      "Ahorra y vive la vida que siempre has querido explorar",
      "Ahorra con nosotros, alcanza tus metas más grandiosas",
      "Ahorra y vive la vida que siempre has querido conquistar",
      "Ahorra con nosotros, alcanza tus metas más impresionantes",
      "Ahorra y vive la vida que siempre has querido lograr",
      "Ahorra con nosotros, alcanza tus metas más ambiciosas"];
    const randomIndex = Math.floor(Math.random() * slogans.length);
    return slogans[randomIndex];
  };
  return (
    <footer
      style={{
        /*Un pequeño efecto de fondo y un ajuste en el tamaño. Alexis*/
        background: "linear-gradient(to left, #22b455, #1dd1a1, #22b455)",
        backgroundSize: "200%",
        transition: "0.3s linear",
        minHeight: "6.6vh",
        color: "#B7FF00",
        /*Los Cambios finalizan aqui*/
        textAlign: "center",
        padding: "1rem",
        marginTop: "auto",
        fontWeight: "500",
        border: "2px solid #B7FF00"
      }}
    >
      <p style={{ margin: 0, fontSize: "1rem" }}>
        {SloganRandom()}
      </p>
    </footer>
  );
};


