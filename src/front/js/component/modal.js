import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export function Modal1(props) {
	const { store, actions } = useContext(Context);
	console.log();
	//Agregar a favoritos por evento---------------------------------------------------------------->//

	const OnClickEvent = e => {
		const Id_Producto = props.id;
		//console.log(store.favorites.filter(Dif_Id_Producto => Dif_Id_Producto === Id_Producto));
		if (store.favorites.filter(Dif_Id_Producto => Dif_Id_Producto === Id_Producto).length > 0) {
			//
			//Al ser Dif_Id_Producto distinto de Id_Producto, filter no lo retorna.
			console.log("No se agrega");
		} else {
			actions.AgregarFavoritos(Id_Producto, props.product_name);
			//De lo contrario, agregar producto.
			console.log("Se agrega" + props.id);
			//store.actions.loadFavorites();

			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

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

			fetch("https://3001-moccasin-pigeon-4ixmcu8a.ws-us04.gitpod.io/api/cart", requestOptions)
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
			{store.login && (
				<Button
					variant="btn btn-outline-success float-right"
					onClick={handleShow}
					style={{ marginInline: "10px" }}>
					Ver detalles
				</Button>
			)}
			{store.login && (
				<button type="button" className="btn btn-outline-success float-right">
					<i className="fas fa-heart" onClick={e => OnClickEvent(e)} />
				</button>
			)}
			<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>
						<img src={props.image} className="card-img-top" alt="..." />
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Table responsive="sm">
						<thead>
							<tr>
								<th>Nombre del producto:</th>
								<th>{props.product_name}</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Supermercado:</td>
								<td>{props.market_name}</td>
							</tr>
							<tr>
								<td>Localización:</td>
								<td>{props.location}</td>
							</tr>
							<tr>
								<td>Unidades:</td>
								<td>1 ud</td>
							</tr>
							<tr>
								<td>Categoría:</td>
								<td>{props.category}</td>
							</tr>
							<tr>
								<td>Precio:</td>
								<td>₡{props.price}</td>
							</tr>
						</tbody>
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

Modal1.propTypes = {
	image: PropTypes.string,
	product_name: PropTypes.string,
	market_name: PropTypes.string,
	location: PropTypes.string,
	category: PropTypes.string,
	price: PropTypes.number,
	id: PropTypes.number
};
