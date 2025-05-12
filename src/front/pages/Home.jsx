import React from "react";
import { Link } from "react-router-dom";
import ImageCarousel from "../components/ImageCarousel";
import logo from "../assets/img/logo.png";

export const Home = () => (
	<div
		style={{
			minHeight: "100vh",
			background: "linear-gradient(to right, #ffe0f1, #e0f7ff)",
		}}
	>
		{/* Hero */}
		<section className="py-5 text-center">
			<div className="container">
				<img
					src={logo}
					alt="Sip & Search logo"
					className="rounded-circle mb-4 shadow"
					style={{ width: 200, height: 200, objectFit: "cover", border: "4px solid #FF1493" }}
				/>

				<h1 className="display-4 fw-bold mb-3" style={{ color: "#333" }}>
					Welcome to Sip &amp; Search
				</h1>
				<p className="lead text-secondary mb-4">
					The best place to discover your next favorite cocktail—and find the
					nearest spot to enjoy it.
				</p>

			</div>
		</section>

		{/* Feature cards */}
		<section className="py-4">
			<div className="container">
				<div className="row gy-4 justify-content-center">
					{/*
            Quick Search Card
          */}
					<div className="col-12 col-md-6">
						<div
							className="p-4 rounded shadow-sm h-100 text-center"
							style={{ background: "rgba(255,20,147,0.05)", border: "1px solid rgba(255,20,147,0.2)" }}
						>
							<h4 className="mb-2">Quick Cocktail Search</h4>
							<p className="text-muted mb-3">
								Type any drink name to pull up recipes, ingredients, and glassware details.
							</p>
							<Link
								to="/search"
								className="btn"
								style={{
									background: "#FF1493",
									borderColor: "#FF1493",
									color: "#fff",
								}}
							>
								Search Cocktails
							</Link>
						</div>
					</div>

					{/*
            Customize Ingredients Card
          */}
					<div className="col-12 col-md-6">
						<div
							className="p-4 rounded shadow-sm h-100 text-center"
							style={{ background: "rgba(0,191,255,0.05)", border: "1px solid rgba(0,191,255,0.2)" }}
						>
							<h4 className="mb-2">Customize by Ingredients</h4>
							<p className="text-muted mb-3">
								Select what’s in your pantry and get tailored cocktail matches—no extra shopping required.
							</p>
							<Link
								to="/custom"
								className="btn"
								style={{
									background: "#FF1493",
									borderColor: "#FF1493",
									color: "#fff",
								}}
							>
								Customize Ingredients
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>

		{/* Carousel */}
		<main className="py-5">
			<div className="container" style={{ maxWidth: 900 }}>
				<ImageCarousel />
			</div>
		</main>
	</div>
);
