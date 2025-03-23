import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { Category } from "./pages/Category";
import { ItemDescription } from "./pages/ItemDescription";
import { Signup } from "./pages/Signup/Signup";
import { Login } from "./pages/Login/Login";


export const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={ <Layout /> } errorElement={ <h1>Not found!</h1> } >
      <Route index element={ <Home /> } />
      <Route path="/:clases" element={ <Category /> }/>
      <Route path="/:clases/:id" element={ <ItemDescription/> }/>
      <Route path="/signup" element={ <Signup /> }/>
      <Route path="/login" element={ <Login /> }/>
    </Route>
  )
);