import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  ProtectedRoute,
  UserAuth,
  Dates,
  Formulario,
  Reporte
} from "../index";

import { DashboardLayout } from "../index";

export function MyRoutes() {
  const { user } = UserAuth();

  return (
    <Routes>
      {/* 🔒 Rutas protegidas */}
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        {/* 🧱 Layout con Sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/reporte" element={<Reporte />} />
          <Route path="/dates" element={<Dates />} />
        </Route>
      </Route>

      {/* 🌍 Rutas públicas */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
