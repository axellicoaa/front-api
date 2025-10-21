import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-primary-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="font-semibold text-lg text-foreground">
            Sistema de Reservas
          </span>
        </div>
        {/* ✅ Nav solo si está logueado */}
        {user && (
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <button
              onClick={() => navigate("/dashboard")}
              className="hover:text-slate-900"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/salas")}
              className="hover:text-slate-900"
            >
              Salas
            </button>
            <button
              onClick={() => navigate("/mis-reservas")}
              className="hover:text-slate-900"
            >
              Mis Reservas
            </button>
            {user.rol === "COORDINADOR" && (
              <>
                <button
                  onClick={() => navigate("/coordinador")}
                  className="hover:text-slate-900"
                >
                  Coordinador
                </button>
                <button
                  onClick={() => navigate("/reportes")}
                  className="hover:text-slate-900"
                >
                  Reportes
                </button>
              </>
            )}
          </nav>
        )}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => navigate("/register")}
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Registrarse
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
