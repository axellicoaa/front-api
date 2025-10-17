export const API_URL = "http://localhost:8080";

export async function getSalas() {
  const response = await fetch(`${API_URL}/salas`);
  if (!response.ok) throw new Error("Error al obtener salas");
  return response.json();
}
