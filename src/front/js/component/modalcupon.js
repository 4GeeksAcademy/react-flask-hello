import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Table } from "react-bootstrap";
import { Context } from "../store/appContext";

export function Modal2() {
	const { store, actions } = useContext(Context);
	console.log();
	//Agregar a favoritos por evento---------------------------------------------------------------->//

	const OnClickEvent = e => {
		const Id_Producto = props.id;
		console.log(store.favorites.filter(Dif_Id_Producto => Dif_Id_Producto === Id_Producto));
		if (store.favorites.filter(Dif_Id_Producto => Dif_Id_Producto === Id_Producto).length > 0) {
			//
			//Al ser Dif_Id_Producto distinto de Id_Producto, filter no lo retorna.
			console.log("No se agrega");
		} else {
			actions.AgregarFavoritos(Id_Producto, props.product_name);
			//De lo contrario, agregar producto.
			console.log("Se agrega" + props.id);

			var myHeaders = new Headers();
			myHeaders.append("Authorization", sessionStorage.getItem("my_token"));
			//myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify({
				username: "123",
				product: props.id
			});

			var requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow"
			};

			fetch("https://3001-moccasin-pigeon-4ixmcu8a.ws-us04.gitpod.io/", requestOptions)
				.then(response => response.text())
				.then(result => console.log(result))
				.catch(error => console.log("error", error));
		}
	};

	//Inicio codigo de modal React-Bootstrap//

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Button variant="btn btn-outline-success float-right" onClick={handleShow} style={{ marginInline: "10px" }}>
				Ver detalles
			</Button>
			<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>
						<a href="https://qrco.de/bc8BH0">
							<img
								src="https://api.qr-code-generator.com/v1/create?access-token=VDQbMtg8gNeNlftKcrwSXn9p8IuapxlileYHxKghNQ5yhGRMNmYw4HOjercdSv9S&frame_name=no-frame&image_format=PNG&image_width=500&qr_code_id=23119307&rnd=1621142329926"
								className="card-img-top"
								alt="..."
							/>
						</a>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Table responsive="sm">
						<thead>
							<tr>
								<th>Presente este cupon al cajero</th>
							</tr>
						</thead>
					</Table>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
