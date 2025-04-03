import React from "react";

const Navbar = () => {
	const modalStyle = {
		backgroundColor: '#CAD2C5',
	  };
	
	  const buttonStyle = {
		backgroundColor: 'rgba(121, 185, 135, 0.7)',
	  };
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#354F52" }}>
		<div className="container-fluid d-flex justify-content-between align-items-center px-3">

			{/* LOGO */}
			<div className="d-flex align-items-center">
				<a className="navbar-brand border border-dark rounded-circle px-3 py-1" href="#">
					FLOW
				</a>

				{/* DROPDOWN PARA NAVEGAR */}
				<div className="dropdown">
					<button className="btn btn-outline-dark fw-bold text-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: "rgba(121, 185, 135, 0.7)" }}>
					DROPDOWN PARA NAVEGAR
					</button>
					<ul className="dropdown-menu">
						<li><a className="dropdown-item" href="#">Opción 1</a></li>
						<li><a className="dropdown-item" href="#">Opción 2</a></li>
						<li><a className="dropdown-item" href="#">Opción 3</a></li>
					</ul>
				</div>
			</div>

			{/* BOTÓN "PROBLEMAS" (Al centro) */}
			<div className="d-flex justify-content-center flex-grow-1">
				<button type="button" className="btn btn-outline-dark fw-bold text-dark" data-bs-toggle="modal" data-bs-target="#problemasModal" style={{ backgroundColor: "#E07A5F" }}>
					PROBLEMAS
				</button>
			</div>

			{/* DROPDOWN DE USUARIO (A la derecha) */}
			<div className="d-flex justify-content-end">
				<div className="dropdown">
					<button className="btn fw-bold text-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: "rgba(121, 185, 135, 0.7)" }}>
					USUARIO LOGEADO
					</button>
					<ul className="dropdown-menu">
					<li><a className="dropdown-item" href="#">Nombre Usuario</a></li>
					<li><a className="dropdown-item" href="#">Logout</a></li>
					</ul>
				</div>
			</div>

		</div>

		{/* MODAL "PROBLEMAS" */}
		<div className="modal fade" id="problemasModal" tabindex="-1" aria-labelledby="problemasModalLabel" aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content" style={{ backgroundColor: "#CAD2C5" }}>
					<div className="modal-header" style={{ backgroundColor: "#354F52" }}>
						<h5 className="modal-title fw-bold" id="problemasModalLabel">Problemas</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
					</div>
					<div className="modal-body d-flex flex-column align-items-center p-4">
						<div className="border border-dark rounded-3 p-3 w-100">
							<button className="btn btn-light border border-dark rounded-3 w-100 mb-2 fw-bold" style={{ backgroundColor: "#E07A5F" }}>
								ERRORES EXTERNOS A LA APLICACIÓN
							</button>
							<button className="btn btn-light border border-dark rounded-3 w-100 mb-2 fw-bold" style={{ backgroundColor: "#E07A5F" }}>
								ERRORES EXTERNOS A LA APLICACIÓN
							</button>
							<button className="btn btn-light border border-dark rounded-3 w-100 mb-2 fw-bold" style={{ backgroundColor: "#E07A5F" }}>
								ERRORES EXTERNOS A LA APLICACIÓN
							</button>
							<button className="btn btn-light border border-dark rounded-3 w-100 fw-bold" style={{ backgroundColor: "#E07A5F" }}>
								ERRORES EXTERNOS A LA APLICACIÓN
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

	</nav>

  );
};

export default Navbar;