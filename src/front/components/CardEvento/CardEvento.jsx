import { notifyError, notifySuccess } from "../../utils/Notifications";
import { backendUrl } from '../../utils/Config';
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

export const CardEvento = ({ item, isUser }) => {

  const { dispatch } = useGlobalReducer()


  const deleteEvent = async (event) => {
    //quitar esto si no queremos confirmacion de
    const confirmarEliminar = window.confirm("¿estas seguro de eliminar?")
    if(!confirmarEliminar) return;

    try {
      const respuesta = await fetch(backendUrl + `events/${event.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await respuesta.json();

      
      if (respuesta.ok) {

        notifySuccess(data.message);

        dispatch({
        type: "deleteEvent",
        payload: event
      })

      } else {
        notifyError(data.message || "No tienes eventos disponibles");
      }
    } catch (error) {
      notifyError("Error al cargar los eventos");
    }
  };

  return (
    <article className="dest-card mb 1rem" style={{margin: "1rem"}}>
      {
        item.portada ? (
          <div className="img-container">
            <img src={item.portada} alt={item.titulo} className="img-card" />
          </div>
        ) : (
          <div className="img-container">

          </div>
        )
      }

      <div className="meta">
        <h3 className="title">{item.titulo}</h3>
       {/* <p className="country">{item.precio}</p>*/}
      </div>

      {
        isUser && (
          <div className="container-btns">
            <Link to={`/crear-evento/${item.id}`}>
              <button className="btn btn-chip ml-[1px]" style={{marginBottom: '1rem',}}>Actualizar</button>
            </Link>
            <button onClick={() => deleteEvent(item)} className="btn btn-chip ">Eliminar</button>
          </div>
        )
      }
    </article>
  );
}