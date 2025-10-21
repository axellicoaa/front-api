import { useEffect, useState } from "react";
import { getEquipamientos, updateSala } from "../service/api";
import { toast } from "react-toastify";

interface SalaEditProps {
  sala: {
    id: number;
    nombreSala: string;
    capacidadMaxima: number;
    equipamientos: { id: number; tipoEquipo: string }[];
  };
  onClose: () => void;
  onUpdated: () => void; // callback para refrescar la lista o detalles
}

export default function SalaEdit({ sala, onClose, onUpdated }: SalaEditProps) {
  const [capacidad, setCapacidad] = useState(sala.capacidadMaxima);
  const [equipamientos, setEquipamientos] = useState<number[]>(
    sala.equipamientos.map((e) => e.id)
  );
  const [todosEquipos, setTodosEquipos] = useState<
    { id: number; tipoEquipo: string }[]
  >([]);

  useEffect(() => {
    getEquipamientos()
      .then(setTodosEquipos)
      .catch(() => toast.error("⚠️ No se pudieron cargar los equipamientos"));
  }, []);

  const toggleEquipamiento = (id: number) => {
    setEquipamientos((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSala(sala.id, {
        capacidadMaxima: capacidad,
        equipamientosIds: equipamientos, // 👈 aquí mandamos los IDs correctos
      });
      toast.success("✅ Sala actualizada correctamente");
      onUpdated();
      onClose();
    } catch (err) {
      toast.error("⚠️ Error al actualizar la sala");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Editar Sala</h2>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Nombre bloqueado */}
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              value={sala.nombreSala}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          {/* Capacidad */}
          <div>
            <label className="block text-sm font-medium">
              Capacidad Máxima
            </label>
            <input
              type="number"
              value={capacidad}
              onChange={(e) => setCapacidad(Number(e.target.value))}
              className="w-full border p-2 rounded"
              min={1}
              required
            />
          </div>

          {/* Equipamientos */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Equipamientos
            </label>
            <div className="flex flex-wrap gap-2">
              {todosEquipos.map((eq) => (
                <label key={eq.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={equipamientos.includes(eq.id)}
                    onChange={() => toggleEquipamiento(eq.id)}
                  />
                  {eq.tipoEquipo}
                </label>
              ))}
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 "
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
