// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import { SingleProduct } from "../components/singleProduct";
import { useEffect, useState } from "react";


// Define and export the Single component which displays individual item details.
export const Single = props => {
  // Access the global state using the custom hook.
  const { store } = useGlobalReducer()
  // Retrieve the 'theId' URL parameter using useParams hook.
  const { theId } = useParams()
  const [producto, setProducto] = useState()
  useEffect(() => {
    if (store.producto) {
      let myProds = store.producto.filter(el => el.id == theId)
      if (myProds[0]) return setProducto(myProds[0])
    }
    let globals = store.productos_generales.filter(el => el.id == theId)

    if (globals) return setProducto(globals[0])
  }, [])


  return (
    <div className="container text-center">
      <SingleProduct producto={producto} />
    </div>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
Single.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};
