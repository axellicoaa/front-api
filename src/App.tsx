import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import type { JSX } from "react";
import Salas from "./pages/Salas";
import MisReservas from "./pages/MisReservas";
import SalaDetalle from "./pages/SalaDetalle";
import CrearSalas from "./pages/CrearSalas";
import Coordinador from "./pages/Coordinador";
import Reportes from "./pages/Reportes";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Páginas públicas */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Páginas privadas */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/salas"
            element={
              <PrivateRoute>
                <Salas />
              </PrivateRoute>
            }
          />
          <Route
            path="/mis-reservas"
            element={
              <PrivateRoute>
                <MisReservas />
              </PrivateRoute>
            }
          />
          <Route
            path="/salas/:id"
            element={
              <PrivateRoute>
                <SalaDetalle />
              </PrivateRoute>
            }
          />
          <Route
            path="/salas/crear-salas"
            element={
              <PrivateRoute>
                <CrearSalas />
              </PrivateRoute>
            }
          />
          <Route
            path="/coordinador"
            element={
              <PrivateRoute>
                <Coordinador />
              </PrivateRoute>
            }
          />
          <Route
            path="/reportes"
            element={
              <PrivateRoute>
                <Reportes />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
