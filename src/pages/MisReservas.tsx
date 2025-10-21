import { useEffect, useState } from "react";
import { getReservasByUsuario } from "../service/api";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MisReservas() {
  const { user } = useAuth(); // 👈 usuario logueado
  const [reservas, setReservas] = useState<any[]>([]);

  useEffect(() => {
    if (user?.id) {
      getReservasByUsuario(user.id)
        .then(setReservas)
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <main className="flex-1 max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Mis Reservas</h2>

        {reservas.length === 0 ? (
          <p className="text-gray-600">No tienes reservas registradas.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservas.map((r) => (
              <div
                key={r.id}
                className="p-6 bg-white rounded shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {r.salaNombre}
                </h3>
                <p className="text-sm text-gray-600">
                  Fecha: {r.fecha} | Hora: {r.horaInicio} - {r.horaFin}
                </p>
                <p className="mt-2">
                  Estado:{" "}
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      r.estado === "APROBADA"
                        ? "bg-green-600"
                        : r.estado === "PENDIENTE"
                        ? "bg-yellow-500"
                        : "bg-red-600"
                    }`}
                  >
                    {r.estado}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer pegado abajo */}
      <Footer />
    </div>
  );
}
