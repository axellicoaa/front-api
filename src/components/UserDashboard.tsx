import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Salas Disponibles */}
        <div className="group rounded-2xl border border-border bg-card p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="mb-5 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-secondary group-hover:bg-accent/10 transition-colors">
            <svg
              className="w-10 h-10 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-3">
            Salas Disponibles
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            Consulta y reserva salas de reunión fácilmente.
          </p>
          <button
            onClick={() => navigate("/salas")}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
          >
            Ver Salas
          </button>
        </div>

        {/* Mis Reservas */}
        <div className="group rounded-2xl border border-border bg-card p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="mb-5 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-secondary group-hover:bg-accent/10 transition-colors">
            <svg
              className="w-10 h-10 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-3">
            Mis Reservas
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            Revisa el estado de tus solicitudes y reservas activas.
          </p>
          <button
            onClick={() => navigate("/mis-reservas")}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
          >
            Ver Reservas
          </button>
        </div>
      </div>
    </div>
  );
}
