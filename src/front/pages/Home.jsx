import Banner2 from '../assets/images/Banner2.png'

export const Home = () => {

	return (
		<>
			<div className="w-100">
				<img
					src={Banner2}
					alt="Banner Principal"
					className="img-fluid w-100"
					style={{ objectFit: 'cover', maxHeight: '680px' }}
				/>
			</div>
			<div className="align-items-center justify-content-center text-center">
				<div className="container-fluid bg-secondary-subtle py-5">
					<div className='row justify-content-center mb-4'>
						<div className='col-12 col-md-8 text-center'>
							<h1 className="display-5  fw-bold py-3 px-2 rounded-3 mb-4">Descubre tu estilo deportivo</h1>
							<hr className="border-primary w-50 mx-auto" />
						</div>
					</div>
					<div className="container mt-5">
						<div className="row justify-content-center">
							<div className="col-md-5 mb-4">
								<div className="card h-100 shadow-sm border-0 bg-light">
									<div className="card-body">
										<h2 className="fw-bold text-dark mb-3">Misión</h2>
										<p className="card-text">Impulsar a cada persona a despertar su instinto a través de ropa deportiva de alto rendimiento, que combina diseño, tecnología y actitud para superar límites dentro y fuera del gimnasio.</p>
									</div>
								</div>
							</div>
							<div className="col-md-5 mb-4">
								<div className="card h-100 shadow-sm border-0 bg-light">
									<div className="card-body">
										<h2 className="fw-bold text-dark mb-3">Visión</h2>
										<p className="card-text">Ser la marca de ropa deportiva más innovadora y reconocida a nivel mundial, inspirando a las personas a vivir un estilo de vida activo y saludable.</p>
									</div>
								</div>
							</div>
						</div>
						<div className="row my-5">
							<div className="col-12">
								<div className="p-4 bg-primary text-white rounded-4 shadow-lg">
									<h2 className="fw-bold mb-3 text-uppercase letter-spacing-2">¡Bienvenido a tu nueva experiencia deportiva!</h2>
									<p className="lead mb-0">
										Descubre colecciones exclusivas, tecnología de punta y diseños que te motivan a dar lo mejor de ti.
										<span className="fw-semibold"> ¡Entrena, supera tus límites y luce increíble!</span>
									</p>
								</div>
							</div>
						</div>
						<div className="row text-start bg-light py-5">
							<div className="col-12 col-lg-10 mx-auto">
								<h3 className="fw-bold mt-4 mb-2">Ropa Deportiva & Activewear</h3>
								<p><b>Ropa deportiva diseñada para impulsarte a ser tu mejor versión.</b> En <span className="text-primary">[Nombre de tu marca]</span>, creamos prendas que eliminan cualquier barrera entre tú y tus metas. Porque cuando se trata de darlo todo, tu ropa debe ser tu aliada, no un obstáculo.</p>
								<p><b>Funcionalidad y estilo para entrenar sin límites.</b> Desde 2025, diseñamos ropa deportiva que combina comodidad, innovación y durabilidad. Cada prenda está pensada para acompañarte en cada repetición, cada kilómetro y cada momento de superación, porque conocemos la pasión de quienes viven para entrenar.</p>
								<h3 className="fw-bold mt-4 mb-2">Ropa deportiva forjada en el gimnasio</h3>
								<p>Nuestra historia comenzó en el gimnasio, impulsada por el amor al entrenamiento. Ese espíritu sigue vivo en cada pieza de ropa que creamos. Nuestra colección incluye las últimas innovaciones en ropa deportiva, desde camisetas que absorben el sudor hasta leggins que ofrecen soporte y libertad de movimiento, diseñadas para que rindas al máximo y te recuperes con estilo.</p>
								<ul className="list-unstyled ms-3">
									<li className="mb-2"><b>Para hombres:</b> Camisetas de entrenamiento que mantienen la frescura, shorts ligeros, sudaderas cómodas y pantalones que se adaptan a cualquier rutina.</li>
									<li className="mb-2"><b>Para mujeres:</b> Leggins con tecnología seamless, tops deportivos con soporte superior y telas de secado rápido que potencian cada movimiento, desde el yoga hasta el levantamiento de pesas.</li>
								</ul>
								<p>Nuestra ropa está inspirada en la dedicación al fitness, con cortes modernos y tejidos innovadores que te ayudan a superar tus límites, sin olvidar el estilo que te hace destacar.</p>
								<h3 className="fw-bold mt-4 mb-2">Más que ropa deportiva</h3>
								<p><span className="text-primary">[Nombre de tu marca]</span> es más que una marca; es una comunidad unida por la pasión de mejorar cada día. Somos los pasos que das hoy para conquistar tus metas de mañana. Somos cada desafío superado, cada nuevo récord y cada momento de crecimiento. Nuestra ropa deportiva, desde prendas para running hasta esenciales para descansar, está diseñada para quienes no se conforman.</p>
								<p><b>Únete a nuestra comunidad.</b> Encuentra inspiración, consejos de entrenamiento y las últimas tendencias en nuestro blog <span className="text-primary">[Nombre de tu blog o sección]</span>. Porque en <span className="text-primary">[Nombre de tu marca]</span>, no solo vestimos tu cuerpo, sino que celebramos tu esfuerzo y tu camino hacia ser tu mejor versión.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}; 
