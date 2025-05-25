import Banner2 from '../assets/images/Banner2.png'

export const Home = () => {

	return (
		<div className="banner-container d-flex align-items-center justify-content-center text-center">
			<div>
				<h1 className="display-4 bg-secondary-subtle fw-bold ">Descubre tu estilo deportivo</h1>
				<div className="mt-4">

					<img src={Banner2} class="img-fluid" alt="Banner Principal" />
				</div>
				<div className="container mt-5">
					<div className="row justify-content-center">
						<div className="col-md-5 mb-4">
							<h2 className="fw-bold">Mision</h2>
							<p>Impulsar a cada persona a despertar su instinto a través de ropa deportiva de alto rendimiento, que combina diseño, tecnología y actitud para superar límites dentro y fuera del gimnasio.</p>
						</div>
						<div className="col-md-5 mb-4">
							<h2 className="fw-bold">Vision</h2>
							<p>Ser la marca de ropa deportiva más innovadora y reconocida a nivel mundial, inspirando a las personas a vivir un estilo de vida activo y saludable.</p>
						</div>
					</div>
					<div className="row text-start">
						<h3 className="fw-bold">Ropa Deportiva & Activewear </h3>
						<p><b>Ropa deportiva diseñada para impulsarte a ser tu mejor versión.</b> En [Nombre de tu marca], creamos prendas que eliminan cualquier barrera entre tú y tus metas. Porque cuando se trata de darlo todo, tu ropa debe ser tu aliada, no un obstáculo.</p>
						<p><b>Funcionalidad y estilo para entrenar sin límites.</b> Desde 2025, diseñamos ropa deportiva que combina comodidad, innovación y durabilidad. Cada prenda está pensada para acompañarte en cada repetición, cada kilómetro y cada momento de superación, porque conocemos la pasión de quienes viven para entrenar.</p>
						<h3 className="fw-bold">Ropa deportiva forjada en el gimnasio</h3>
						<p>Nuestra historia comenzó en el gimnasio, impulsada por el amor al entrenamiento. Ese espíritu sigue vivo en cada pieza de ropa que creamos. Nuestra colección incluye las últimas innovaciones en ropa deportiva, desde camisetas que absorben el sudor hasta leggins que ofrecen soporte y libertad de movimiento, diseñadas para que rindas al máximo y te recuperes con estilo.</p>
						<p><b>Para hombres:</b> Camisetas de entrenamiento que mantienen la frescura, shorts ligeros, sudaderas cómodas y pantalones que se adaptan a cualquier rutina.</p>
						<p><b>Para mujeres:</b>Leggins con tecnología seamless, tops deportivos con soporte superior y telas de secado rápido que potencian cada movimiento, desde el yoga hasta el levantamiento de pesas.</p>
						<p>Nuestra ropa está inspirada en la dedicación al fitness, con cortes modernos y tejidos innovadores que te ayudan a superar tus límites, sin olvidar el estilo que te hace destacar.</p>
						<h3 className="fw-bold">Màs que ropa deportiva</h3>
						<p>[Nombre de tu marca] es más que una marca; es una comunidad unida por la pasión de mejorar cada día. Somos los pasos que das hoy para conquistar tus metas de mañana. Somos cada desafío superado, cada nuevo récord y cada momento de crecimiento. Nuestra ropa deportiva, desde prendas para running hasta esenciales para descansar, está diseñada para quienes no se conforman.</p>
						<p><b>Únete a nuestra comunidad.</b> Encuentra inspiración, consejos de entrenamiento y las últimas tendencias en nuestro blog [Nombre de tu blog o sección]. Porque en [Nombre de tu marca], no solo vestimos tu cuerpo, sino que celebramos tu esfuerzo y tu camino hacia ser tu mejor versión.</p>
					</div>
				</div>
			</div>
		</div>

	);
}; 
