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
import { AdminProfesores } from "./pages/AdminProfesores";
import { AdminSolicitudes } from "./pages/AdminSolicitudes";
import { ProfesoresProfile } from "./pages/ProfesoresProfile";
import { AdminProfile } from "./pages/AdminProfile";
import { ProfesoresAlumnosNotas } from "./pages/ProfesoresAlumnosNotas";
import { ProfesoresAlumnosAsistencia } from "./pages/ProfesoresAlumnosAsistencia";
import { ProfesoresHorario } from "./pages/ProfesoresHorario";
import { AlumnosNotas } from "./pages/AlumnosNotas";
import { AlumnosHorario } from "./pages/AlumnosHorario";
import { LoginLayout } from "./pages/LoginLayout";
import { SignupLayout } from "./pages/SignupLayout";
import PrivateRoute from "./components/PrivateRoute";
import { AdminDashboardLayout } from "./pages/AdminDashboardLayout";
import { AlumnosDashboardLayout } from "./pages/AlumnosDashboardLayout";
import { ProfesoresDashboardLayout } from "./pages/ProfesoresDashboardLayout";
import SolicitarToken from "./pages/SolicitarToken.jsx";
import { NuevaContrasena } from "./pages/NuevaContrasena";
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<h1>Not found!</h1>} >

      <Route path="/login/admin" element={<Admin />} />
      <Route path="/" element={<LoginLayout />} errorElement={<h1>Not found!</h1>}>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<SolicitarToken />} />
        <Route path="/reset-password/:token" element={<NuevaContrasena />} />
      </Route>
      <Route path="/signup" element={<SignupLayout />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/alumno" element={<StudenSignup />} />
        <Route path="/signup/profesor" element={<TeacherSignup />} />
      </Route>
      <Route path="/admin/dashboard" element={
        <PrivateRoute>
          <AdminDashboardLayout />
        </PrivateRoute>
      }>
        <Route path="/admin/dashboard/profile" element={<AdminProfile />} />
        {/* <Route path="/admin/dashboard/alumnos/notas" element={<AdminAlumnosNotas />} /> */}
        {/* <Route path="/admin/dashboard/alumnos/asistencia" element={<AdminAlumnosAsistencia />} /> */}
        {/* <Route path="/admin/dashboard/profesores" element={<AdminProfesores />} /> */}
        <Route path="/admin/dashboard/solicitudes" element={<AdminSolicitudes />} />
      </Route>
      <Route path="/teacher/dashboard" element={
        <PrivateRoute>
          <ProfesoresDashboardLayout />
        </PrivateRoute>
      }>
        <Route path="/teacher/dashboard/profile" element={<ProfesoresProfile />} />
        <Route path="/teacher/dashboard/alumnos/notas" element={<ProfesoresAlumnosNotas />} />
        <Route path="/teacher/dashboard/alumnos/asistencia" element={<ProfesoresAlumnosAsistencia />} />
        <Route path="/teacher/dashboard/horario" element={<ProfesoresHorario />} />
      </Route>
      <Route path="/student/dashboard" element={
        <PrivateRoute>
          <AlumnosDashboardLayout />
        </PrivateRoute>
      }>
        <Route path="/student/dashboard/profile" element={<AlumnosProfile />} />
        <Route path="/student/dashboard/notas" element={<AlumnosNotas />} />
        <Route path="/student/dashboard/horario" element={<AlumnosHorario />} />
      </Route>

    </Route>
  )
);