import React from "react";

export const Product = () => {
	return (
		<div className="container">
			<section className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">Nuevo Producto</h3>
				</div>
				<div className="panel-body">
					<form action="designer-finish.html" className="form-horizontal" role="form">
						<div className="form-group">
							<label htmlFor="name" className="col-sm-3 control-label">
								Nombre del Producto
							</label>
							<div className="col-sm-9">
								<input
									type="text"
									className="form-control"
									name="name"
									id="name"
									placeholder="Ingrese aquí"
								/>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="tech" className="col-sm-3 control-label">
								Categoría
							</label>
							<div className="col-sm-3">
								<select className="form-control">
									<option value="">Hogar</option>
									<option value="texnolog2">Salud</option>
									<option value="texnolog3">Deportes</option>
								</select>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="about" className="col-sm-3 control-label">
								Descripción
							</label>
							<div className="col-sm-9">
								<textarea className="form-control" placeholder="Ingrese una breve descripción" />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="qty" className="col-sm-3 control-label">
								Precio
							</label>
							<div className="col-sm-3">
								<input type="text" className="form-control" name="qty" id="qty" placeholder="$$$" />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="name" className="col-sm-3 control-label">
								Fotografía
							</label>
							<div className="col-sm-3">
								<label className="control-label small" htmlFor="file_img">
									Formato de imagen (jpg/png):
								</label>{" "}
								<input type="file" name="file_img" />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="tech" className="col-sm-3 control-label">
								Estado del artículo
							</label>
							<div className="col-sm-3">
								<select className="form-control">
									<option value="">Nuevo</option>
									<option value="texnolog2">Usado</option>
									<option value="texnolog3">Como nuevo</option>
								</select>
							</div>
						</div>
						<hr />
						<div className="form-group">
							<div className="col-sm-offset-3 col-sm-9">
								<button type="submit" className="btn btn-primary">
									Publicar
								</button>
							</div>
						</div>
					</form>
				</div>
			</section>
		</div>
	);
};
