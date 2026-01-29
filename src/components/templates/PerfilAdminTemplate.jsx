import { useState, useEffect } from "react";
import styled from "styled-components";
import { Sidebar, createUser } from "../../index";
import { supabase } from "../../supabase/supabase.config";
import image from "./pya.png";
import { Icon } from "@iconify/react";

export function PerfilAdminTemplate() {
  const [openModal, setOpenModal] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
   const [currentUser, setCurrentUser] = useState(null);


  const [formUser, setFormUser] = useState({
    email: "",
    password: "",
    nombre: "",
    username: "",
    rol: "user",
  });

    async function cargarUsuarioActual() {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user) return;

    const { data } = await supabase
      .from("profiles")
      .select("id, email, nombre, username, rol")
      .eq("id", auth.user.id)
      .single();

    setCurrentUser(data);
  }


  async function cargarUsuarios() {
    setLoading(true);
    const { data } = await supabase
      .from("profiles")
      .select("id, rol, username, nombre, created_at");

    setUsuarios(data || []);
    setLoading(false);
  }

  useEffect(() => {
    cargarUsuarioActual();
    cargarUsuarios();
  }, []);

  async function teUser() {
    if (submitting) return; 
    setSubmitting(true);

    try {
      await createUser(formUser);

      alert("Usuario creado correctamente");
      setOpenModal(false);

  
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

  async function actualizarUsuario() {
  if (!editUser) return;

  const confirmar = confirm("¿Deseas guardar los cambios del usuario?");
  if (!confirmar) return;

  const { error } = await supabase
    .from("profiles")
    .update({
      nombre: editUser.nombre,
      username: editUser.username,
      rol: editUser.rol,
    })
    .eq("id", editUser.id);

  if (error) {
    alert("Error al actualizar usuario");
    return;
  }

  alert("Usuario actualizado correctamente");
  setEditUser(null);
  cargarUsuarios();
}


async function eliminarUsuario(user) {
  const confirmar = confirm(
    `¿Seguro que deseas eliminar al usuario ${user.username}?`
  );

  if (!confirmar) return;

  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", user.id);

  if (error) {
    alert("Error al eliminar usuario");
    return;
  }

  alert("Usuario eliminado correctamente");
  cargarUsuarios();
}


  return (
    <Container>
      <TableSection>
        <TableHeader>
          <TitleGroup>
            <h2>Usuarios</h2>
            <span>Crea, edita y elimina usuarios</span>
          </TitleGroup>
            {currentUser && (
              <RightHeader>
                {currentUser.rol === "admin" && (
                  <button onClick={() => setOpenModal(true)}>
                    <Icon icon="humbleicons:user-add" width="30" />
                  </button>
                )}
                <UserInfo>
                  <div className="avatar">
                    {currentUser.username?.charAt(0)}
                  </div>

                  <div className="text">
                    <strong>{currentUser.nombre}</strong>
                    <span>{currentUser.email}</span>
                  </div>

                  <RoleBadge role={currentUser.rol}>
                    {currentUser.rol}
                  </RoleBadge>
                </UserInfo>

                
              </RightHeader>
            )}
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
                    {currentUser?.rol === "admin" && <th />}
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u) => (
                    <tr key={u.id}>
                      <td data-label="Usuario">
                        <strong>{u.username}</strong>
                        <span>{u.nombre}</span>
                      </td>

                      <td data-label="Rol">
                        <RoleBadge role={u.rol}>{u.rol}</RoleBadge>
                      </td>

                      <td data-label="Creado">
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>

                      {currentUser?.rol === "admin" && (
                        <td className="actions" data-label="Acciones">
                          <div className="row-actions">
                            <Icon
                              icon="majesticons:edit-pen-2-line"
                              className="edit"
                              onClick={() => setEditUser(u)}
                            />

                            <Icon
                              icon="majesticons:delete-bin-line"
                              className="delete"
                              onClick={() => eliminarUsuario(u)}
                            />
                          </div>
                        </td>
                      )}
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

      {editUser && (
  <Modal>
    <div className="modal">
      <h3>Editar usuario</h3>

      <input
        value={editUser.username}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            username: e.target.value.toUpperCase(),
          })
        }
      />

      <input
        value={editUser.nombre}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            nombre: e.target.value,
          })
        }
      />

      <select
        value={editUser.rol}
        onChange={(e) =>
          setEditUser({
            ...editUser,
            rol: e.target.value,
          })
        }
      >
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>

      <div className="actions">
        <button className="cancel" onClick={() => setEditUser(null)}>
          Cancelar
        </button>
        <button className="create" onClick={actualizarUsuario}>
          Guardar cambios
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
  font-family: "Poppins", sans-serif;
  color: black;

  .row-actions {
  display: flex;
  gap: 20px;
  align-items: center;
}

.row-actions svg {
  font-size: 22px;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;
}

.row-actions .eye:hover {
  color: #e6d114;
  transform: scale(1.15);
}

.row-actions .edit:hover {
  color: #00b894;
  transform: scale(1.15);
}

.row-actions .delete:hover {
  color: #e61515;
  transform: scale(1.15);
}

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
  margin-left: 30px;

  @media (max-width: 1024px) {
    margin-left: 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  @media (max-width: 468px) {
  button {
    align-self: center;
  }
}
`;


const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  margin-top: 26px;

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
  width: 100%;
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

  .row-actions {
    display: flex;
    gap: 12px;
  }

  .row-actions svg {
    font-size: 20px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    table,
    tbody,
    tr,
    td {
      display: block;
      width: 100%;
    }

    thead {
      display: none;
    }

    tbody tr {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 14px;
      padding: 12px;
      margin-bottom: 14px;
    }

    td {
      border: none;
      padding: 8px 0;
    }

    td::before {
      content: attr(data-label);
      display: block;
      font-size: 0.7rem;
      text-transform: uppercase;
      font-weight: 600;
      color: #64748b;
      margin-bottom: 2px;
    }

    td.actions {
      margin-top: 10px;
    }

    td.actions::before {
      display: none;
    }

    .row-actions {
      margin-right: 25px;
      justify-content: flex-end;
      gap: 16px;
    }
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




const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 10px 14px;
  border-radius: 999px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #15e47c, #1c576e);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }

  .text {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
  }

  span {
    font-size: 0.75rem;
    color: #64748b;
  }
`;


const RightHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  @media (max-width: 468px){
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
  }

  button {
    padding: 12px 22px;
    border-radius: 999px;
    background: linear-gradient(90deg, #1c576e, #15e47c);
    color: white;
    font-weight: 600;
    border: none;
    cursor: pointer;

    @media (max-width: 468px){
      display: flex;
      width:100px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`;