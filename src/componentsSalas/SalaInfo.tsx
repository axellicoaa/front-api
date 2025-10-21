interface SalaInfoProps {
  imagen: string;
  nombre: string;
  ubicacion: string;
  capacidad: number;
}

export default function SalaInfo({
  imagen,
  nombre,
  ubicacion,
  capacidad,
}: SalaInfoProps) {
  return (
    <div className="lg:col-span-2 bg-white rounded shadow p-6">
      <img
        src={imagen}
        className="rounded-lg mb-6 w-full h-64 object-cover aspect-[16/9]"
      />
      <h2 className="text-2xl font-bold mb-2">{nombre}</h2>
      <p className="text-sm text-gray-500 mb-4">{ubicacion}</p>
      <p className="mb-3">
        <span className="font-semibold">Capacidad:</span> {capacidad} personas
      </p>
    </div>
  );
}
