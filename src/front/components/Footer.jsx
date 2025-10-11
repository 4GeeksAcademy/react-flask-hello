import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer mt-auto pt-3 text-center">
		<div className="back-color-2 font-color-3 py-4">
			<div className="row">
				<div className="col-lg-3 col-12 ">Marca</div>
				<div className="col-lg-2 col-3 d-flex flex-column justify-content-center align-items-end">
					<div className="border-white border-end border-3 pe-2">
						<i class="fs-1 fa-regular fa-envelope">
						</i> <p className="fs-4">Contact</p>
					</div>
				</div>
				<div className="col-lg-2 col-3 d-flex  flex-column justify-content-center align-items-start">
					<ul className="p-0" style={{ "listStyle": "none" }}>
						<li ><p className="text-start m-0 fw-semibold">facuscrollinic@gmail.com</p></li>
						<li><p className="text-start m-0 fw-semibold">facuscrollinic</p></li>
					</ul>

				</div>
				<div className="col-lg-2 col-3 d-flex flex-column justify-content-center align-items-end">
					<div className="border-white border-3 border-end pe-2">

					<i class="fs-1 fa-solid fa-sailboat"></i>
					 <p className="fs-4">Navigate</p>
					 
					 </div>
					</div>
				<div className="col-lg-2 col-3 d-flex  flex-column justify-content-center align-items-start">
					<ul className="p-0" style={{ "listStyle": "none" }}>
						<li>
							<Link to="/" className="text-decoration-none"> 
							<p className="text-start m-0 fw-semibold font-color-3">Home</p>
							</Link>
						</li>
						<li>
							<Link to="/auth/todo-panel" className="text-decoration-none"> 
							<p className="text-start m-0 fw-semibold font-color-3">Missions</p>
								</Link>
							</li>
						<li>
							<Link to="/auth/dashboard" className="text-decoration-none"> 
							<p className="text-start m-0 fw-semibold font-color-3">My dashboard</p>
								</Link>
							</li>
						<li>
							<Link to="/about-us" className="text-decoration-none"> 
							<p className="text-start m-0 fw-semibold font-color-3">About us</p>
							</Link>
							</li>
					</ul>
					</div>
			</div>
		</div>
		<div className="footer-filled back-color-1">
		</div>
	</footer>
);
