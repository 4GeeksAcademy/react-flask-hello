export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<div className="back-color-2 font-color-3 py-4">
			<div className="row">
				<div className="col-md-3 col-12 ">Marca</div>
				<div className="col-md-2 col-6 d-flex flex-column justify-content-center align-items-end">
					<div className="border-white border-end border-3 pe-2">
						<i class="fs-1 fa-regular fa-envelope">
						</i> <p className="fs-4">Contact</p>
					</div>
				</div>
				<div className="col-md-2 col-6 d-flex  flex-column justify-content-center align-items-start">
					<ul className="p-0" style={{ "listStyle": "none" }}>
						<li ><p className="text-start m-0 fw-semibold">facuscrollinic@gmail.com</p></li>
						<li><p className="text-start m-0 fw-semibold">facuscrollinic</p></li>
					</ul>

				</div>
				<div className="col-md-2 col-6 d-flex  flex-column justify-content-center align-items-end">
					<div className="border-white border-3 border-end pe-2">

					<i class="fs-1 fa-solid fa-sailboat"></i>
					 <p className="fs-4">Contact</p>
					 
					 </div>
					</div>
				<div className="col-md-2 col-6 d-flex  flex-column justify-content-center align-items-start">
					<ul className="p-0" style={{ "listStyle": "none" }}>
						<li ><p className="text-start m-0 fw-semibold">Home</p></li>
						<li><p className="text-start m-0 fw-semibold">Todo's</p></li>
						<li><p className="text-start m-0 fw-semibold">My dashboard</p></li>
						<li><p className="text-start m-0 fw-semibold">About us</p></li>
					</ul>
					</div>
			</div>
		</div>
	</footer>
);
