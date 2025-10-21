import { useEffect, useState } from "react";
import { getSalas } from "../service/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Sala {
  id: number;
  nombreSala: string;
  capacidadMaxima: number;
  equipamientos: { id: number; tipoEquipo: string }[];
  imagen?: string;
}

export default function Salas() {
  const [salas, setSalas] = useState<Sala[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getSalas().then(setSalas).catch(console.error);
  }, []);
  // Fallbacks realistas (todas de Unsplash con tema "meeting room")
  const fallbacks = [
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop", // sala ejecutiva
    "https://images.unsplash.com/photo-1599008634004-75c9c8a7d0f5?q=80&w=1200&auto=format&fit=crop", // sala de conferencias
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop", // coworking / reunión moderna
  ];

  let fallbackIndex = 0;

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Salas de Reuniones
            </h1>
            <p className="text-muted-foreground">
              Explora y gestiona las salas disponibles
            </p>
          </div>
          {user?.rol === "COORDINADOR" && (
            <button
              onClick={() => navigate("/salas/crear-salas")}
              className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              + Nueva Sala
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {salas.map((sala) => (
            <div
              key={sala.id}
              className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition-all"
            >
              <img
                src={fallbacks[0]}
                className="rounded-lg mb-6 w-full h-64 object-cover aspect-[16/9]"
                onError={(e) => {
                  // Cambia secuencialmente de fallback
                  const next =
                    fallbacks[++fallbackIndex] ??
                    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"; // último seguro
                  e.currentTarget.src = next;
                }}
              />

              <div className="p-5">
                <h2 className="text-lg font-semibold mb-1">
                  {sala.nombreSala}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  Capacidad: {sala.capacidadMaxima} personas
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {sala.equipamientos.map((e) => (
                    <span
                      key={e.id}
                      className="px-2 py-1 text-xs bg-gray-100 rounded-md border"
                    >
                      {e.tipoEquipo}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => navigate(`/salas/${sala.id}`)}
                  className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 w-full "
                >
                  Ver Detalles {user?.rol === "USER" && <b> y Reservar </b>}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
