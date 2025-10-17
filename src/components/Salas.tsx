import { useEffect, useState } from "react";
import { getSalas } from "../service/api";

interface Sala {
  id: number;
  nombreSala: string;
  capacidadMaxima: number;
  equipamientos: string[];
}

export default function Salas() {
  const [salas, setSalas] = useState<Sala[]>([]);

  useEffect(() => {
    getSalas().then(setSalas).catch(console.error);
  }, []);

return (
  <div className="grid grid-cols-3 gap-4">
    {salas.map((sala) => (
      <div key={sala.id} className="border p-4 rounded shadow">
        <h2 className="text-xl font-bold">{sala.nombreSala}</h2>
        <p>Capacidad: {sala.capacidadMaxima} personas</p>
        <p>
          Equipamiento:{" "}
          {sala.equipamientos && sala.equipamientos.length > 0
            ? sala.equipamientos.map((eq: any) => eq.tipoEquipo).join(", ")
            : "Ninguno"}
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">
          Reservar
        </button>
      </div>
    ))}
  </div>
);

}
