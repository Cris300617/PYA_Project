import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  ProtectedRoute,
  UserAuth,
  Profile,
  Formulario,
  Reporte
} from "../index";

import { DashboardLayout } from "../index";

export function MyRoutes() {
  const { user } = UserAuth();

  return (
    <Routes>
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>

        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/reporte" element={<Reporte />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
