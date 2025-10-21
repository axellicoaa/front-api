export const API_URL = "http://localhost:8080";

// GET Salas
export async function getSalas() {
  const response = await fetch(`${API_URL}/salas`);
  if (!response.ok) throw new Error("Error al obtener salas");
  return response.json();
}
export async function getSalaById(id: number) {
  const response = await fetch(`${API_URL}/salas/${id}`);
  if (!response.ok) throw new Error("Error al obtener la sala");
  return response.json();
}

// GET Áreas
export async function getAreas() {
  const response = await fetch(`${API_URL}/areas`);
  if (!response.ok) throw new Error("Error al obtener áreas");
  return response.json();
}

// POST Registro de usuario con área
export async function registerUser(userData: {
  nombre: string;
  email: string;
  ruc_ci: string;
  rol: string;
  password: string;
  areaId: number;
}) {
  // 👇 aquí ajustamos para que incluya "/usuarios"
  const response = await fetch(`${API_URL}/usuarios/area/${userData.areaId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: userData.nombre,
      email: userData.email,
      ruc_ci: userData.ruc_ci,
      rol: userData.rol,
      password: userData.password,
    }),
  });

  if (!response.ok) throw new Error("Error al registrar usuario");
  return response.json();
}
// GET Reservas por usuario
export async function getReservasByUsuario(userId: number) {
  const response = await fetch(`${API_URL}/reservas/usuario/${userId}`);
  if (!response.ok) throw new Error("Error al obtener reservas del usuario");
  return response.json();
}

// Validar Login (consulta todos los usuarios y compara email + password)

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Credenciales incorrectas");

  return response.json(); // devuelve UsuarioDTO
}
//GET Reportes
export async function getSalasDisponibles() {
  const response = await fetch(`${API_URL}/salas/disponibilidad`);
  if (!response.ok) throw new Error("Error al obtener salas");
  return response.json();
}
//GET Reportes
export async function getReservasResumen() {
  const response = await fetch(`${API_URL}/reservas/resumen`);
  if (!response.ok) throw new Error("Error al obtener resumen");
  return response.json();
}

//POST DE CREACIÓN DE RESERVA
export async function crearReserva(reserva: {
  usuarioId: number;
  salaId: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  proposito: string;
}) {
  const response = await fetch(`${API_URL}/reservas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reserva),
  });

  if (!response.ok) throw new Error("Error al crear reserva");
  return response.json();
}
// POST Crear sala
export async function crearSala(sala: {
  nombreSala: string;
  capacidadMaxima: number;
}) {
  const response = await fetch(`${API_URL}/salas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sala),
  });

  if (!response.ok) throw new Error("Error al crear sala");
  return response.json();
}

// POST Agregar varios equipamientos a una sala
export async function agregarEquipamientos(
  idSala: number,
  idsEquipos: number[]
) {
  const response = await fetch(`${API_URL}/salas/${idSala}/equipamientos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(idsEquipos),
  });

  if (!response.ok) throw new Error("Error al asignar equipamientos");
  return response.json();
}

// GET Equipamientos
export async function getEquipamientos() {
  const response = await fetch(`${API_URL}/equipamiento`);
  if (!response.ok) throw new Error("Error al obtener equipamientos");
  return response.json();
}

// GET reservas pendientes
export async function getReservasPendientes() {
  const response = await fetch(`${API_URL}/reservas/pendientes`);
  if (!response.ok) throw new Error("Error al obtener reservas pendientes");
  return response.json();
}

// Aprobar reserva
export async function aprobarReserva(reservaId: number, coordId: number) {
  const response = await fetch(
    `${API_URL}/aprobaciones/reserva/${reservaId}/coordinador/${coordId}/aprobar`,
    { method: "POST" }
  );
  if (!response.ok) throw new Error("Error al aprobar reserva");
  return response.json();
}

// Rechazar reserva
export async function rechazarReserva(reservaId: number, coordId: number) {
  const response = await fetch(
    `${API_URL}/aprobaciones/reserva/${reservaId}/coordinador/${coordId}/rechazar`,
    { method: "POST" }
  );
  if (!response.ok) throw new Error("Error al rechazar reserva");
  return response.json();
}

// GET historial de aprobaciones
export async function getAprobaciones() {
  const response = await fetch(`${API_URL}/aprobaciones`);
  if (!response.ok) throw new Error("Error al obtener aprobaciones");
  return response.json();
}

// PUT actualizar sala
export async function updateSala(
  idSala: number,
  data: { capacidadMaxima: number; equipamientosIds: number[] }
) {
  const response = await fetch(`${API_URL}/salas/${idSala}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Error al actualizar la sala");
  return response.json();
}
