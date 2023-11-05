import React from 'react'
import "../../styles/nosotros.css";

const Nosotros = () => {
  return (
    <div className="landing-page container d-flex my-5">
				<div className="first-block d-inline-flex">
					<div className="text-main-box d-block-flex">
						<h1 className="title-nosotros d-flex">¿Quiénes somos?</h1>
						<h5 className="text-nosotros d-flex">Somos un grupo de desarrolladoras que creemos firmemente en el poder transformador de la educación y las oportunidades de estudio. Creemos que cada individuo tiene un potencial ilimitado que puede ser desbloqueado a través del conocimiento y la formación adecuada. Por lo tanto, nuestra misión es facilitar el acceso a estas oportunidades educativas para que un mayor número de personas pueda aprovecharlas al máximo.</h5>
						<h5 className="text-nosotros d-flex my-4">Esperamos que al hacerlo, podamos beneficiar a muchas personas en todo el mundo. Creemos que al brindar información clara y accesible sobre programas educativos, becas y cursos de capacitación, podemos empoderar a las personas para que tomen decisiones informadas sobre su futuro académico y profesional. Al mejorar el acceso a la educación, también esperamos contribuir al crecimiento del ámbito laboral y económico de las personas, brindándoles las herramientas necesarias para competir en un mundo cada vez más globalizado y tecnológico.</h5>
						<h5 className="text-nosotros d-flex my-4">En última instancia, nuestra visión es que todos tengan igualdad de oportunidades para alcanzar sus metas y sueños, sin importar su origen, género o circunstancias. Creemos que al proporcionar información y recursos educativos accesibles, podemos ayudar a construir un mundo en el que el talento y el esfuerzo sean los factores determinantes del éxito, y donde la educación sea la llave que abra puertas hacia un futuro mejor.</h5>
					</div>
					<div className="image-side d-flex">
						<img className="img-nosotros d-flex" src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" />
					</div>
				</div>
                </div>
  )
}

export default Nosotros