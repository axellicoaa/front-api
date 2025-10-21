import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAprobaciones } from "../service/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Aprobacion {
  id: number;
  estado: string;
  salaNombre: string;
  usuarioSolicitante: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
}

export default function Reportes() {
  const { user } = useAuth();
  const [aprobaciones, setAprobaciones] = useState<Aprobacion[]>([]);

  useEffect(() => {
    if (user?.rol === "COORDINADOR") {
      getAprobaciones().then(setAprobaciones).catch(console.error);
    }
  }, [user]);

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen bg-background">
        <main className="flex-1 max-w-6x12 mx-auto p-6">
          <h2 className="text-2xl font-bold mb-6">Historial de Aprobaciones</h2>

          {aprobaciones.length === 0 ? (
            <p className="text-gray-600">
              No existen aprobaciones registradas.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aprobaciones.map((a) => (
                <div
                  key={a.id}
                  className="p-6 bg-white rounded-lg shadow hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold">{a.salaNombre}</h3>
                    <span
                      className={`px-3 py-1 rounded text-white ${
                        a.estado === "APROBADA"
                          ? "bg-green-600"
                          : a.estado === "RECHAZADA"
                          ? "bg-red-600"
                          : "bg-gray-500"
                      }`}
                    >
                      {a.estado}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Solicitante:{" "}
                    <span className="font-medium">{a.usuarioSolicitante}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    {a.fecha} | {a.horaInicio} - {a.horaFin}
                  </p>
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
