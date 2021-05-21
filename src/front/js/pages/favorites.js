import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritosCard } from "../component/favoritoscard";
import { Context } from "../store/appContext";

export const Favoritos = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<div className="container-fluid">
				<div className="categoriaspage row">
					<h1 className="promo1 h2 mx-auto py-4 font-weight-light">
						<strong>Favoritos</strong>
					</h1>
					<div className="col-lg-12 productos">
						{store.favorites
							? store.favorites.map((item, index) => {
									console.log("favorites", item);

									return (
										<div key={index}>
											<FavoritosCard
												id={item.id}
												price={item.product.price}
												product_name={item["product.product_name"]}
												image={item["product.image"]}
												category={item["product.category"]}
											/>
										</div>
									);
							  })
							: "No favorites here"}
					</div>
				</div>
			</div>
		</>
	);
};
