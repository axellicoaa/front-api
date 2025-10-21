import { useEffect, useState } from "react";
import {
  getReservasPendientes,
  aprobarReserva,
  rechazarReserva,
} from "../service/api";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

interface Reserva {
  id: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  salaNombre: string;
  usuarioNombre: string;
}

export default function Coordinador() {
  const { user } = useAuth();
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    cargarPendientes();
  }, []);

  const cargarPendientes = () => {
    getReservasPendientes()
      .then(setReservas)
      .catch(() => toast.error("⚠️ No se pudieron cargar las reservas"));
  };

  const handleAprobar = async (id: number) => {
    if (!user) return;
    try {
      await aprobarReserva(id, user.id);
      toast.success("✅ Reserva aprobada");
      cargarPendientes();
    } catch {
      toast.error("⚠️ Error al aprobar");
    }
  };

  const handleRechazar = async (id: number) => {
    if (!user) return;
    try {
      await rechazarReserva(id, user.id);
      toast.info("❌ Reserva rechazada");
      cargarPendientes();
    } catch {
      toast.error("⚠️ Error al rechazar");
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen bg-background">
        <main className="flex-1 max-w-6xl mx-auto p-6">
          <h2 className="text-2xl font-bold mb-6">Reservas Pendientes</h2>

          {reservas.length === 0 ? (
            <p className="text-gray-600">No hay reservas pendientes.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reservas.map((r) => (
                <div
                  key={r.id}
                  className="p-6 bg-white rounded-lg shadow hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {r.salaNombre}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Solicitante:{" "}
                    <span className="font-medium">{r.usuarioNombre}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    {r.fecha} | {r.horaInicio} - {r.horaFin}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleAprobar(r.id)}
                      className="rounded-lg border border-border bg-card px-7 py-3.5 text-base font-medium text-foreground hover:bg-secondary transition-colors"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => handleRechazar(r.id)}
                      className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      Rechazar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
