export async function createUser({ email, password, nombre, rol, username }) {
  const res = await fetch("http://localhost:3001/create-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, nombre, rol, username }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error creando usuario");
  }

  return await res.json();
}
