import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-6xl px-6 pt-24 pb-16 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-8">
        <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
        Optimiza la gestión de espacios
      </div>

      <h1 className="text-6xl md:text-7xl font-bold text-balance leading-tight mb-6">
        Gestiona las Reservas
        <br />
        <span className="text-foreground/80">de Salas de Reuniones</span>
      </h1>

      <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Sistema completo para solicitar, aprobar y gestionar reservas de
        espacios de reunión en tu empresa de manera eficiente y organizada.
      </p>

      <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
        <button
          onClick={() => navigate("/register")}
          className="rounded-lg bg-primary px-7 py-3.5 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
        >
          Comenzar Ahora
        </button>
        <button
          onClick={() => navigate("/login")}
          className="rounded-lg border border-border bg-card px-7 py-3.5 text-base font-medium text-foreground hover:bg-secondary transition-colors"
        >
          Iniciar Sesión
        </button>
      </div>
    </section>
  );
}
