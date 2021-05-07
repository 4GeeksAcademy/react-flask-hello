import React from "react";
import { Link } from "react-router-dom";

export const Carousel = () => {
	return (
		<div id="carouselExampleControls" className="carousel slide ml-50" data-ride="carousel">
			<div className="carousel-inner">
				<div className="carousel-item active">
					<img
						src="https://cdni.rt.com/actualidad/public_images/2019.02/article/5c69d6c708f3d942578b4567.jpg"
						className="center "
						alt="..."
					/>
				</div>
				<div className="carousel-item">
					<img src="https://t2.kn3.net/taringa/1/D/9/A/0/5/Marcc333/8BD.jpg" className="center " alt="..." />
				</div>
				<div className="carousel-item">
					<img
						src="http://tecnobitt.com/wp-content/uploads/2013/12/electronica.jpg"
						className="center "
						alt="..."
					/>
				</div>
			</div>
			<a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
				<span className="carousel-control-prev-icon" aria-hidden="true" />
				<span className="sr-only">Previous</span>
			</a>
			<a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
				<span className="carousel-control-next-icon" aria-hidden="true" />
				<span className="sr-only">Next</span>
			</a>
		</div>
	);
};
