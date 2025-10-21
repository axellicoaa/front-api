import { useEffect, useState } from "react";
import { getAreas, registerUser } from "../service/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

export default function Register() {
  const [areas, setAreas] = useState<any[]>([]);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    ruc_ci: "",
    rol: "USER",
    password: "",
    areaId: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    getAreas().then(setAreas).catch(console.error);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(form);
      toast.success("✅ Usuario registrado con éxito");
      navigate("/login");
    } catch (err: any) {
      if (err.message.includes("400")) toast.error("❌ Datos inválidos");
      else toast.error("⚠️ Error inesperado al registrar usuario");
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md w-96 space-y-4"
        >
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-gray-600 hover:text-black"
          >
            <ArrowLeft size={18} /> Volver
          </button>
          <h2 className="text-xl font-bold">Registro de Usuario</h2>

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="ruc_ci"
            placeholder="RUC/CI"
            value={form.ruc_ci}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          {/* Select Rol */}
          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="USER">Usuario</option>
            <option value="COORDINADOR">Coordinador</option>
          </select>

          {/* Select Área */}
          <select
            name="areaId"
            value={form.areaId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value={0}>Seleccione un área</option>
            {areas.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nombreArea}
              </option>
            ))}
          </select>

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 w-full"
          >
            Registrar
          </button>
        </form>
      </div>
    </>
  );
}
