import client1 from "../assets/img/Testimonials/clientprofile1.jpg"
import company1 from "../assets/img/Testimonials/companylogo1.png"
import client2 from "../assets/img/Testimonials/clientprofile2.png"
import company2 from "../assets/img/Testimonials/companylogo2.png"
import client3 from "../assets/img/Testimonials/clientProfile3.jpg"

export const testimonialsContent = [
    {
        id: 0,
        name: "Juan Romero",
        position: "Editor General",
        review: '“El equipo no solo construyó un sitio web en WordPress que refleja fielmente nuestra identidad, sino que nos dotó de las funcionalidades editoriales y de seguridad. Comprendieron nuestra visión sobre la literatura y la autogestión, permitiéndonos construir una amplia comunidad de creadores en Ecuador y Latinoamérica."',
        profilePicture: client3,
        logo: company1

    },
    {
        id: 1,
        name: "Gabriela Suárez",
        position: "Editora",
        review: `${'“Con '} ${"'Búsquedas'"} ${'se materializó el espacio digital seguro y respetuoso que necesitábamos para fomentar el diálogo. El trabajo realizado nos permitió tejer una red viva entre distintas corrientes y experiencias, recogiendo textos y reflexiones personales. Valoramos enormemente cómo el equipo entendió la esencia de nuestro proyecto, facilitando que distintas voces compartan sus comprensiones y se nutran mutuamente.”'}`,
        profilePicture: client2,
        logo: company2

    },
    {
        id: 2,
        name: "Abril Altamirano",
        position: "Editor General",
        review: '“Nos entregaron una solución que difunde literatura y arte a nivel internacional, superando limitaciones geográficas. Su equipo comprendió nuestro modelo colaborativo y su creatividad integró una biblioteca virtual y una sección interactiva de sonido, impulsando la obra de autores con una experiencia inmersiva.”',
        profilePicture: client1,
        logo: company1

    }
]