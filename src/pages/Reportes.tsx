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
  const [currentPage, setCurrentPage] = useState(1);
  const aprobacionesPorPagina = 5;

  useEffect(() => {
    if (user?.rol === "COORDINADOR") {
      getAprobaciones()
        .then((data) => {
          const ordenadas = [...data].sort((a, b) => {
            const fechaHoraA = new Date(`${a.fecha}T${a.horaInicio}`);
            const fechaHoraB = new Date(`${b.fecha}T${b.horaInicio}`);
            return fechaHoraA.getTime() - fechaHoraB.getTime(); // ascendente
          });
          setAprobaciones(ordenadas);
        })
        .catch(console.error);
    }
  }, [user]);

  // Paginación
  const totalPaginas = Math.ceil(aprobaciones.length / aprobacionesPorPagina);
  const startIndex = (currentPage - 1) * aprobacionesPorPagina;
  const pageData = aprobaciones.slice(
    startIndex,
    startIndex + aprobacionesPorPagina
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Historial de Aprobaciones</h2>

        {aprobaciones.length === 0 ? (
          <p className="text-gray-600">No existen aprobaciones registradas.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2">Sala</th>
                  <th className="px-4 py-2">Solicitante</th>
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Hora</th>
                  <th className="px-4 py-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((a) => (
                  <tr key={a.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{a.salaNombre}</td>
                    <td className="px-4 py-2">{a.usuarioSolicitante}</td>
                    <td className="px-4 py-2">{a.fecha}</td>
                    <td className="px-4 py-2">
                      {a.horaInicio} - {a.horaFin}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          a.estado === "APROBADA"
                            ? "bg-green-600"
                            : a.estado === "RECHAZADA"
                            ? "bg-red-600"
                            : "bg-gray-500"
                        }`}
                      >
                        {a.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Paginación */}
            <div className="flex justify-center items-center gap-2 p-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="text-sm">
                Página {currentPage} de {totalPaginas}
              </span>
              <button
                disabled={currentPage === totalPaginas}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
