import { useParams } from "react-router-dom";
import { crearReserva, getSalaById } from "../service/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SalaInfo from "../componentsSalas/SalaInfo";
import SalaEquipamiento from "../componentsSalas/SalaEquipamiento";
import SalaReservaForm from "../componentsSalas/SalaReservaForm";
import { useState, useEffect } from "react";
import SalaEdit from "../componentsSalas/SalasEdit";

export default function SalaDetalle() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [showEdit, setShowEdit] = useState(false);
  const [sala, setSala] = useState<any>(null);

  const fallbacks = [
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200",
    "https://images.unsplash.com/photo-1599008634004-75c9c8a7d0f5?q=80&w=1200",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
  ];

  // ✅ Traer sala desde el backend
  useEffect(() => {
    if (id) {
      getSalaById(Number(id))
        .then(setSala)
        .catch(() => toast.error("⚠️ No se pudo cargar la sala"));
    }
  }, [id]);

  const handleReserva = async (data: {
    fecha: string;
    horaInicio: string;
    horaFin: string;
    proposito: string;
  }) => {
    if (!user) {
      toast.error("Debes iniciar sesión");
      return;
    }

    try {
      await crearReserva({
        usuarioId: user.id,
        salaId: Number(id),
        ...data,
      });
      toast.success("✅ Reserva creada correctamente");
    } catch (err) {
      toast.error("⚠️ No se pudo crear la reserva (posiblemente ocupada)");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="relative lg:col-span-2 bg-white rounded shadow p-6">
            {/* 👇 Botón Editar solo para COORDINADOR */}
            {user?.rol === "COORDINADOR" && sala && (
              <button
                onClick={() => setShowEdit(true)}
                className="absolute top-4 right-4 px-3 py-1 text-black text-sm rounded hover:bg-amber-50"
              >
                ✏️ Editar
              </button>
            )}

            {sala ? (
              <>
                <SalaInfo
                  imagen={fallbacks[0]} // o sala.imagen si luego agregas campo en BD
                  nombre={sala.nombreSala}
                  ubicacion="Ubicación pendiente"
                  capacidad={sala.capacidadMaxima}
                />
                <SalaEquipamiento
                  items={
                    sala.equipamientos?.map((e: any) => e.tipoEquipo) || []
                  }
                />
              </>
            ) : (
              <p className="text-gray-500">Cargando sala...</p>
            )}
          </div>

          {/* Formulario de reserva */}
          <SalaReservaForm onSubmit={handleReserva} />
        </div>
      </main>
      <Footer />

      {/* 👇 Modal de edición */}
      {showEdit && sala && (
        <SalaEdit
          sala={sala}
          onClose={() => setShowEdit(false)}
          onUpdated={() => window.location.reload()}
        />
      )}
    </div>
  );
}
