import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { getSalasDisponibles, getReservasResumen } from "../service/api";
import UserDashboard from "../components/UserDashboard";
import CoordinatorDashboard from "../components/CordinatorDashboard";
import Footer from "../components/Footer";

export default function Dashboard() {
  const { user } = useAuth();
  const [salasDisponibles, setSalasDisponibles] = useState(0);
  const [reservas, setReservas] = useState({
    pendientes: 0,
    aprobadas: 0,
    rechazadas: 0,
  });

  useEffect(() => {
    getSalasDisponibles().then((data) => {
      const disponibles = data.filter((s: any) => s.disponible).length;
      setSalasDisponibles(disponibles);
    });

    getReservasResumen().then(setReservas);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Bienvenido, {user?.nombre}
          </h2>
          <p className="text-muted-foreground">
            Gestiona tus reservas y espacios desde tu panel de control
          </p>
        </div>

        {user?.rol === "USER" && <UserDashboard />}
        {user?.rol === "COORDINADOR" && (
          <CoordinatorDashboard
            salasDisponibles={salasDisponibles}
            reservas={reservas}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
