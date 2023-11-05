import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/login_register.css";

const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  return (
    <div className="container ">
      <div className="body d-md-flex align-items-center justify-content-between border-0">
        <div className="box-1 mt-md-0 mt-5">
          <img
            src="https://cdn.pixabay.com/photo/2021/01/21/15/54/books-5937716_1280.jpg"
            className="imagen"
            style={{ height: "600px" }}
            alt=""
          />
        </div>
        <div className=" box-2 d-flex flex-column h-100">
          <form
            className="form col-md-11 p-1"
            onSubmit={(e) => actions.handleSubmitLogin(e, navigate)}
          >
            <div className="container">
              <label htmlFor="logForm" className="text-dark">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="correo"
                placeholder="Email"
                name="email"
                autoComplete="off"
                value={store.email}
                onChange={(e) => actions.handleChangeLogin(e)}
              />
            </div>
            <div className="container">
              <label htmlFor="inputPassword2" className=" text-dark">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword2"
                placeholder="Password"
                name="password"
                value={store.password}
                onChange={(e) => actions.handleChangeLogin(e)}
              />
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <button
                type="submit"
                className="buttonLogin btn btn-primary ms-2 p-2"
              >
                Iniciar Sesión
              </button>
            </div>
            <div className="text-center mt-2">
              <Link to="/register">Registrarse</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="container">
  //     <form
  //       className="form"
  //       onSubmit={(e) => actions.handleSubmitLogin(e, navigate)}
  //     >
  //       <div className="container">
  //         <label htmlFor="logForm" className="text-dark">
  //           Email
  //         </label>
  //         <input
  //           type="email"
  //           className="form-control m-3"
  //           id="correo"
  //           placeholder="Email"
  //           name="email"
  //           /* value={store.currentUser ? store.currentUser.email : ""} //value={store.email} */
  //           value={store.email}
  //           // onChange={() => actions.handleChangeLogin}
  //           onChange={actions.handleChangeLogin}
  //           autoComplete="off"
  //         />
  //       </div>
  //       <div className="container">
  //         <label htmlFor="inputPassword2" className=" text-dark">
  //           Password
  //         </label>
  //         <input
  //           type="password"
  //           className="form-control m-3"
  //           id="inputPassword2"
  //           placeholder="Password"
  //           name="password"
  //           value={store.password}
  //           // value={store.currentUser ? store.currentUser.password : ""} //value={store.password}
  //           // onChange={() => actions.handleChangeLogin()}
  //           onChange={actions.handleChangeLogin} //onChange={()=>actions.handleChangeLogin()}
  //         />
  //       </div>
  //       <div className="d-flex justify-content-center">
  //         <button type="submit" className="btn btn-primary ">
  //           Iniciar Sesión
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );
};

export default Login;
