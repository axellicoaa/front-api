import { useEffect, useState } from "react";
import {
  crearSala,
  agregarEquipamientos,
  getEquipamientos,
} from "../service/api";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CrearSala() {
  const [nombreSala, setNombreSala] = useState("");
  const [capacidadMaxima, setCapacidadMaxima] = useState<number>(0);
  const [equipamientos, setEquipamientos] = useState<number[]>([]);
  const [listaEquipos, setListaEquipos] = useState<
    { id: number; tipoEquipo: string }[]
  >([]);

  // 👇 cargar equipos desde el backend
  useEffect(() => {
    getEquipamientos()
      .then(setListaEquipos)
      .catch(() => toast.error("⚠️ No se pudieron cargar los equipamientos"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1️⃣ Crear la sala
      const nuevaSala = await crearSala({
        nombreSala,
        capacidadMaxima,
      });

      // 2️⃣ Asignar equipamientos seleccionados
      if (equipamientos.length > 0) {
        await agregarEquipamientos(nuevaSala.id, equipamientos);
      }

      toast.success("✅ Sala creada correctamente");
      setNombreSala("");
      setCapacidadMaxima(0);
      setEquipamientos([]);
    } catch (err: any) {
      toast.error("⚠️ Error al crear la sala");
    }
  };

  const toggleEquipamiento = (id: number) => {
    setEquipamientos((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen bg-background">
        <main className="flex-1 max-w-5xl mx-auto p-6">
          <h2 className="text-2xl font-bold mb-6">Crear Nueva Sala</h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-6 rounded shadow"
          >
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium">
                Nombre de la Sala
              </label>
              <input
                type="text"
                value={nombreSala}
                onChange={(e) => setNombreSala(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Capacidad */}
            <div>
              <label className="block text-sm font-medium">
                Capacidad Máxima
              </label>
              <input
                type="number"
                value={capacidadMaxima}
                onChange={(e) => setCapacidadMaxima(Number(e.target.value))}
                className="w-full border p-2 rounded"
                min={1}
                required
              />
            </div>

            {/* Equipamientos dinámicos */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Equipamientos
              </label>
              <div className="flex gap-4 flex-wrap">
                {listaEquipos.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No hay equipamientos disponibles
                  </p>
                ) : (
                  listaEquipos.map((eq) => (
                    <label key={eq.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={equipamientos.includes(eq.id)}
                        onChange={() => toggleEquipamiento(eq.id)}
                      />
                      {eq.tipoEquipo}
                    </label>
                  ))
                )}
              </div>
            </div>

            <button
              type="submit"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 w-full"
            >
              Crear Sala
            </button>
          </form>
        </main>
        <Footer />
      </div>
    </>
  );
}
