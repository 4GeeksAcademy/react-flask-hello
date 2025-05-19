import useGlobalReducer from "../hooks/useGlobalReducer";

export const Profile = () => {
  const { store } = useGlobalReducer();
  return (
    <div className="container">
      <h2>Perfil de usuario</h2>
      {store.user && <p>Email: {store.user.email}</p>}
    </div>
  );
};