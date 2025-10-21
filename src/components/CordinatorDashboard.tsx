import { useNavigate } from "react-router-dom";
import StatCard from "./StatCard";

export default function CoordinatorDashboard({
  salasDisponibles,
  reservas,
}: {
  salasDisponibles: number;
  reservas: { pendientes: number; aprobadas: number; rechazadas: number };
}) {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Salas Disponibles"
          value={salasDisponibles}
          icon={
            <svg
              className="w-6 h-6 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />{" "}
            </svg>
          }
        />
        <StatCard
          title="Pendientes"
          value={reservas.pendientes}
          icon={
            <svg
              className="w-6 h-6 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />{" "}
            </svg>
          }
        />
        <StatCard
          title="Aprobadas"
          value={reservas.aprobadas}
          icon={
            <svg
              className="w-6 h-6 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />{" "}
            </svg>
          }
        />
        <StatCard
          title="Rechazadas"
          value={reservas.rechazadas}
          icon={
            <svg
              className="w-6 h-6 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />{" "}
            </svg>
          }
        />
      </div>

      <div className="group rounded-2xl border border-border bg-card p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
        <div className="mb-5 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-secondary group-hover:bg-accent/10 transition-colors">
          {" "}
          <svg
            className="w-10 h-10 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />{" "}
          </svg>{" "}
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3">
          Aprobaciones
        </h3>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          Gestiona solicitudes de reservas como coordinador de área.
        </p>
        <button
          onClick={() => navigate("/coordinador")}
          className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
        >
          Ir a Coordinador
        </button>
      </div>
    </div>
  );
}
