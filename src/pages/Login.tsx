import { useState } from "react";
import { loginUser } from "../service/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // usamos el contexto

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
      login(user); // guardamos en el contexto
      toast.success(`👋 Bienvenido ${user.nombre}`);
      navigate("/dashboard"); // redirige al dashboard
    } catch (err: any) {
      if (err.message.includes("401")) toast.error("❌ Contraseña incorrecta");
      else if (err.message.includes("404"))
        toast.error("🙁 Usuario no encontrado");
      else toast.error("⚠️ Error al iniciar sesión");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow w-96 space-y-4  border border-border  hover:shadow-md transition-all"
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-black"
          >
            <ArrowLeft size={18} /> Volver
          </button>

          <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>

          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 w-full"
          >
            Iniciar Sesión
          </button>

          <p className="text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-primary">
              Registrate
            </a>
          </p>
        </form>
      </div>
    </>
  );
}
