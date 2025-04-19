//import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
  const { store } = useGlobalReducer();

  return (
    <div className="text-center mt-5">
      <h1 className="display-4">Bienvenido a LevelUp</h1>
      <p className="lead">Proyecto final fullstack de 4Geeks Academy</p>
      <img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" style={{ maxWidth: 150 }} alt="Logo" />
      {store.user && <p className="text-success">Sesión iniciada como: {store.user.email}</p>}
    </div>
  );
};
