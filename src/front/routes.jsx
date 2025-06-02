// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Login } from "./pages/Home";
import { Admin } from "./pages/AdminLogin";
import { AlumnosProfile } from "./pages/AlumnosProfile";
import { Signup } from "./pages/ChangeSingup";
import { StudenSignup } from "./pages/StudentSignup";
import { TeacherSignup } from "./pages/TeacherSignup";
import { AdminAlumnosNotas } from "./pages/AdminAlumnosNotas";
import { AdminAlumnosAsistencia } from "./pages/AdminAlumnosAsistencia";
import { AdminAlumnosPagos } from "./pages/AdminAlumnosPagos";
import { AdminProfesores } from "./pages/AdminProfesores";
import { AdminSolicitudes } from "./pages/AdminSolicitudes";
import { ProfesoresProfile } from "./pages/ProfesoresProfile";
import { AdminProfile } from "./pages/AdminProfile";
import { ProfesoresAlumnosNotas } from "./pages/ProfesoresAlumnosNotas";
import { ProfesoresAlumnosAsistencia } from "./pages/ProfesoresAlumnosAsistencia";
import { ProfesoresHorario } from "./pages/ProfesoresHorario";
import { AlumnosNotas } from "./pages/AlumnosNotas";
import { AlumnosHorario } from "./pages/AlumnosHorario";
import { AlumnosPagos } from "./pages/AlumnosPagos";
import { LoginLayout } from "./pages/LoginLayout";
import { SignupLayout } from "./pages/SignupLayout";
import { AdminDashboardLayout } from "./pages/AdminDashboardLayout";
import { AlumnosDashboardLayout } from "./pages/AlumnosDashboardLayout";
import { ProfesoresDashboardLayout } from "./pages/ProfesoresDashboardLayout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/" errorElement={<h1>Not found!</h1>} >

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/login/admin" element={<Admin />} />
      <Route path="/" element={<LoginLayout />} errorElement={<h1>Not found!</h1>}>
        <Route path="/" element={<Login />} />
      </Route>
      <Route path="/signup" element={<SignupLayout />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/alumno" element={<StudenSignup />} />
        <Route path="/signup/profesor" element={<TeacherSignup />} />
      </Route>
      <Route path="/admin/dashboard" element={<AdminDashboardLayout />}>
        <Route path="/admin/dashboard/profile" element={<AdminProfile />} />
        <Route path="/admin/dashboard/alumnos/notas" element={<AdminAlumnosNotas />} />
        <Route path="/admin/dashboard/alumnos/asistencia" element={<AdminAlumnosAsistencia />} />
        <Route path="/admin/dashboard/alumnos/pagos" element={<AdminAlumnosPagos />} />
        <Route path="/admin/dashboard/profesores" element={<AdminProfesores />} />
        <Route path="/admin/dashboard/solicitudes" element={<AdminSolicitudes />} />
      </Route>
      <Route path="/teacher/dashboard" element={<ProfesoresDashboardLayout />}>
        <Route path="/teacher/dashboard/profile" element={<ProfesoresProfile />} />
        <Route path="/teacher/dashboard/alumnos/notas" element={<ProfesoresAlumnosNotas />} />
        <Route path="/teacher/dashboard/alumnos/asistencia" element={<ProfesoresAlumnosAsistencia />} />
        <Route path="/teacher/dashboard/horario" element={<ProfesoresHorario />} />
      </Route>
      <Route path="/student/dashboard" element={<AlumnosDashboardLayout />}>
        <Route path="/student/dashboard/profile" element={<AlumnosProfile />} />
        <Route path="/student/dashboard/notas" element={<AlumnosNotas />} />
        <Route path="/student/dashboard/horario" element={<AlumnosHorario />} />
        <Route path="/student/dashboard/pagos" element={<AlumnosPagos />} />
      </Route>
    </Route>
  )
);