import { useState, useEffect } from "react";
import styled from "styled-components";
import { Sidebar, createUser } from "../../index";
import { supabase } from "../../supabase/supabase.config";
import image from "./pya.png";

export function DatosTemplate() {
  const [openModal, setOpenModal] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formUser, setFormUser] = useState({
    email: "",
    password: "",
    nombre: "",
    username: "",
    rol: "user",
  });

  async function cargarUsuarios() {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, rol, username, nombre, created_at");
    if (!error) setUsuarios(data || []);
    setLoading(false);
  }

  useEffect(() => {
    cargarUsuarios();
  }, []);

  async function teUser() {
    if (submitting) return; // evita doble submit
    setSubmitting(true);

    try {
      await createUser(formUser);

      alert("Usuario creado correctamente");
      setOpenModal(false);

      // reset completo de formulario
      setFormUser({
        email: "",
        password: "",
        nombre: "",
        username: "",
        rol: "user",
      });

      cargarUsuarios();
    } catch (err) {
      console.error(err);
      alert(err.message || "Error al crear usuario");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container>
      <Sidebar />

      <TableSection>
        <TableHeader>
          <TitleGroup>
            <h2>Usuarios</h2>
            <span>Crea, edita y elimina usuarios</span>
          </TitleGroup>

          <button
            onClick={() => setOpenModal(true)}
            style={{
              padding: "12px 22px",
              borderRadius: "999px",
              background: "linear-gradient(90deg,#1c576e,#15e47c)",
              color: "white",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            + Nuevo usuario
          </button>
        </TableHeader>

        <TableCard>
          <TableWrapper>
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th>Creado</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <strong>{u.username}</strong>
                        <span>{u.nombre}</span>
                      </td>
                      <td>
                        <RoleBadge role={u.rol}>{u.rol}</RoleBadge>
                      </td>
                      <td>{new Date(u.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </TableWrapper>
        </TableCard>
      </TableSection>

      {openModal && (
        <Modal>
          <div className="modal">
            <img src={image} alt="logo" />
            <h3>Crear usuario</h3>

            <input
              placeholder="Nombre de usuario (ej: CPICARTE)"
              value={formUser.username}
              onChange={(e) =>
                setFormUser({ ...formUser, username: e.target.value.toUpperCase() })
              }
            />

            <input
              placeholder="Email"
              value={formUser.email}
              onChange={(e) => setFormUser({ ...formUser, email: e.target.value })}
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={formUser.password}
              onChange={(e) => setFormUser({ ...formUser, password: e.target.value })}
            />

            <input
              placeholder="Nombre"
              value={formUser.nombre}
              onChange={(e) => setFormUser({ ...formUser, nombre: e.target.value })}
            />

            <select
              value={formUser.rol}
              onChange={(e) => setFormUser({ ...formUser, rol: e.target.value })}
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>

            <div className="actions">
              <button className="cancel" onClick={() => setOpenModal(false)}>
                Cancelar
              </button>
              <button className="create" onClick={teUser} disabled={submitting}>
                {submitting ? "Creando..." : "Crear usuario"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </Container>
  );
}



const Container = styled.div`
  min-height: 100vh;
  background: #ffffff;
  padding-left: 72px;
  font-family: "Poppins", sans-serif;

  @media (max-width: 1024px) {
    padding-left: 0;
  }
`;

const TableSection = styled.section`
  padding: 30px;
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h2 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #0f172a;
    padding-left: 14px;
    position: relative;
  }

  h2::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 70%;
    border-radius: 4px;
    background: linear-gradient(180deg, #15e47c, #1c576e);
  }

  span {
    font-size: 0.85rem;
    color: #64748b;
  }
`;

const TableCard = styled.div`
  margin-top: 30px;
  max-width: 900px;
  background: white;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  padding: 20px;
`;

const TableWrapper = styled.div`
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }

  thead {
    background: #f1f5f9;
  }

  th {
    padding: 14px;
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #475569;
    font-weight: 700;
  }

  td {
    padding: 14px;
    border-top: 1px solid #e5e7eb;
    vertical-align: middle;
  }

  td strong {
    display: block;
    font-weight: 600;
    color: #0f172a;
  }

  td span {
    font-size: 0.75rem;
    color: #64748b;
  }

  tbody tr:hover {
    background: #f8fafc;
  }
`;

const RoleBadge = styled.span`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;

  background: ${({ role }) =>
    role === "admin"
      ? "rgba(34,197,94,.15)"
      : "rgba(59,130,246,.15)"};

  color: ${({ role }) =>
    role === "admin" ? "#166534" : "#1e40af"};
`;

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;

  .modal {
    background: white;
    padding: 32px;
    border-radius: 18px;
    width: 100%;
    max-width: 520px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  img {
    max-width: 200px;
  }

  input,
  select {
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #cbd5e1;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }

  .cancel {
    background: #e5e7eb;
    padding: 12px 20px;
    border-radius: 999px;
    border: none;
    cursor: pointer;
  }

  .create {
    background: linear-gradient(90deg, #22c55e, #4ade80);
    padding: 12px 20px;
    border-radius: 999px;
    border: none;
    font-weight: 600;
    cursor: pointer;
  }
`;
