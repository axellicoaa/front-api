import { useEffect, useState } from "react";
import { getReservasByUsuario } from "../service/api";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MisReservas() {
  const { user } = useAuth();
  const [reservas, setReservas] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reservasPorPagina = 5;

  useEffect(() => {
    if (user?.id) {
      getReservasByUsuario(user.id)
        .then((data) => {
          const ordenadas = [...data].sort((a, b) => {
            const fechaHoraA = new Date(`${a.fecha}T${a.horaInicio}`);
            const fechaHoraB = new Date(`${b.fecha}T${b.horaInicio}`);
            return fechaHoraA.getTime() - fechaHoraB.getTime();
          });
          setReservas(ordenadas);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  // Calcular paginación
  const totalPaginas = Math.ceil(reservas.length / reservasPorPagina);
  const startIndex = (currentPage - 1) * reservasPorPagina;
  const reservasPagina = reservas.slice(
    startIndex,
    startIndex + reservasPorPagina
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Mis Reservas</h2>

        {reservas.length === 0 ? (
          <p className="text-gray-600">No tienes reservas registradas.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2">Sala</th>
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Hora</th>
                  <th className="px-4 py-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {reservasPagina.map((r) => (
                  <tr key={r.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{r.salaNombre}</td>
                    <td className="px-4 py-2">{r.fecha}</td>
                    <td className="px-4 py-2">
                      {r.horaInicio} - {r.horaFin}
                    </td>
                    <td className="px-4 py-2">
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
