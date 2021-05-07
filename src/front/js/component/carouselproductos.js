import React from "react";
import "../../styles/index.scss";

export const Carouselproductos = () => {
	let precios = ["₡100", "₡200", "₡300", "₡400", "₡500"];
	let productos = [
		"https://cdni.rt.com/actualidad/public_images/2019.02/article/5c69d6c708f3d942578b4567.jpg",
		"http://tecnobitt.com/wp-content/uploads/2013/12/electronica.jpg",
		"http://www.emprenomic.com/wp-content/uploads/2016/05/gadgets-638x368.jpg",
		"https://s03.s3c.es/imag/_v0/635x300/6/5/5/aparatoselectronicos635.jpg",
		"https://www.hipaajournal.com/wp-content/uploads/2018/08/19291916_s.jpg"
	];

	let descripciones = ["1", "2", "3", "4", "5"];

	return (
		<div className="container">
			<div id="carouselExampleCaptions" className="carousel slide " data-ride="carousel">
				<ol className="carousel-indicators">
					<li data-target="#carouselExampleCaptions" data-slide-to="0" className="active" />
					<li data-target="#carouselExampleCaptions" data-slide-to="1" />
					<li data-target="#carouselExampleCaptions" data-slide-to="2" />
				</ol>
				<div className="carousel-inner">
					{productos.map((p, index) => {
						if (index === 0) {
							return (
								<div className="carousel-item active center">
									<img src={p} className="mx-auto d-block w-100 h-25" alt="..." />
									<div className="carousel-caption d-none d-md-block">
										<h5 className="text-secondary">{descripciones[0]}</h5>
										<p className="text-secondary">{precios[0]}</p>
									</div>
								</div>
							);
						} else {
							return (
								<div className="carousel-item center" key={index}>
									<img src={p} className="mx-auto d-block w-100 h-25" alt="..." />
									<div className="carousel-caption d-none d-md-block">
										<h5>Second slide label</h5>
										<p>Some representative placeholder content for the second slide.</p>
									</div>
								</div>
							);
						}
					})}
				</div>
				<a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true" />
					<span className="sr-only">Previous</span>
				</a>
				<a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true" />
					<span className="sr-only">Next</span>
				</a>
			</div>
		</div>
	);
};
