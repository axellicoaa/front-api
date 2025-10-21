import { useState } from "react";

interface SalaReservaFormProps {
  onSubmit: (data: {
    fecha: string;
    horaInicio: string;
    horaFin: string;
    proposito: string;
  }) => void;
}

export default function SalaReservaForm({ onSubmit }: SalaReservaFormProps) {
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [proposito, setProposito] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ fecha, horaInicio, horaFin, proposito });
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Reservar Sala</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">Hora de Inicio</label>
            <input
              type="time"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Hora de Fin</label>
            <input
              type="time"
              value={horaFin}
              onChange={(e) => setHoraFin(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Propósito</label>
          <textarea
            value={proposito}
            onChange={(e) => setProposito(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 w-full"
        >
          Solicitar Reserva
        </button>
      </form>
    </div>
  );
}
