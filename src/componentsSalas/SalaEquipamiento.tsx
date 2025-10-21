interface SalaEquipamientoProps {
  items: string[];
}

export default function SalaEquipamiento({ items }: SalaEquipamientoProps) {
  return (
    <>
      <h4 className="font-semibold mb-2">Equipamiento Disponible</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="px-3 py-1 text-xs bg-gray-100 rounded-md border"
          >
            {item}
          </span>
        ))}
      </div>
    </>
  );
}
