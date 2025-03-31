import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import {  } from "";
import {  } from "";
import {  } from "";
import {  } from "";

export const router = createBrowserRouter(
    createRoutesFromElements(

      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        <Route path= "/" element={""} />
        <Route path="" element={""} />  
        <Route path="" element={""} />
      </Route>
    )
);