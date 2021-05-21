import React from "react";
import { Link } from "react-router-dom";

export const Footer1 = () => (
	<footer className="footer mt-auto py-3 text-center">
		<span>
			<a href="https://www.facebook.com/">
				<i className="fab fa-facebook f1" />
			</a>
		</span>
		<span>
			<a href="https://www.instagram.com/">
				<i className="fab fa-instagram f1" />
			</a>
		</span>
		<span>
			<a href="https://www.twitter.com/">
				<i className="fab fa-twitter f1" />
			</a>
		</span>
		<span>
			<a href="https://api.whatsapp.com/send?phone=+506">
				<i className="fab fa-whatsapp f1" />
			</a>
		</span>
		<br />
		<p>Desarrollado por:</p>
		<a color="black" href="https://www.linkedin.com/in/carlos-espinoza-89a6411b2/">
			&lt;Carlos Espinoza /&gt;
		</a>
		<a href="https://www.linkedin.com/in/sof%C3%ADa-camacho-ruiz-01656220b/">&lt;Sofia Camacho /&gt;</a>
		<a href="https://www.linkedin.com/in/luis-gabriel-corrales-mora-88223a14b/">&lt;Luis Corrales /&gt;</a>
		<p id="globalfooter-copyright" className="t-12 t-black--light t-normal text-align-left clear-both">
			Global Market © 2021
		</p>
	</footer>
);
