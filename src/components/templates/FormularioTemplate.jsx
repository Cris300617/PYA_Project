import { useState, useEffect } from "react";
import styled from "styled-components";
import { Sidebar, Search, Registro, TablaInforme, AntecedentesObra} from "../../index";
import image from "./pya.png";
import { supabase } from "../../supabase/supabase.config";
import { Icon } from "@iconify/react";


export function FormularioTemplate() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);


const [form, setForm] = useState({
  autor: "",
  form: "",
  antecedentes_obra: false,
  antecedentes_empresa: false,
});


    useEffect(() => {
      obtenerDatos();
    }, []);
  
    async function obtenerDatos() {
      const { data, error } = await supabase
        .from("forms")
        .select("*")
        .order("id", { ascending: true }); 
      if (error) {
        console.error("Error al obtener datos:", error);
      } else {
        setData(data);
      }
    }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("forms")
      .insert([form]);

    if (error) {
      console.error("Error al insertar:", error);
      return;
    }

    setForm({
      autor: "",
      form: "",
    });

    setOpen(false);
  }

  return (
      <Container>
        <TableSection>
          <TableHeader>
            <TitleGroup>
              <h2>Formularios</h2>
              <span>Listado de formularios</span>
            </TitleGroup>

          </TableHeader>
          
        <section className="content-forms">
          <div className="table-layout">

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Creado por</th>
                    <th>Formulario</th>
                    <th>Fecha de creación</th>
                    <th>Última actualización</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.autor}</td>
                      <td>{item.form}</td>
                      <td>{item.created}</td>
                      <td>{item.update}</td>

                      <td>
                        <div className="row-actions">
                          <Icon icon="majesticons:eye-line" className="eye"/>
                          <Icon icon="majesticons:edit-pen-2-line" className="edit"/>
                          <Icon icon="majesticons:delete-bin-line" className="delete"/>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </section>

        <FabCrear onClick={() => setOpen(true)}>
        <span className="icon">＋</span>
        <span className="label">Crear formulario</span>
      </FabCrear>

        {open && (
          <Form onSubmit={handleSubmit}>
            <div className="modal">
              <img src={image} alt="logo" />
              <h3>Nuevo Informe</h3>
              <span className="sub-txt">
                Rellena los campos con la información necesaria
              </span>

              <input
                name="autor"
                value={form.autor}
                placeholder="Usuario"
                onChange={handleChange}
              />
              <input
                name="form"
                value={form.form}
                placeholder="Formulario"
                onChange={handleChange}
              />

              <p style={{color:"red"}}>¿Que contendra tu formulario?</p>
              
              <label className="checked">
                <input
                  type="checkbox"
                  checked={form.antecedentes_obra}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      antecedentes_obra: e.target.checked,
                    })
                  }
                />
                Antecedentes de obra
              </label>

              <label className="checked">
                <input
                  type="checkbox"
                  checked={form.antecedentes_empresa}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      antecedentes_empresa: e.target.checked,
                    })
                  }
                />
                Antecedentes de la empresa
              </label>



              <div className="actions">
                <button
                  type="button"
                  className="cancel"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </button>
                <button className="submit" type="submit">
                  Subir
                </button>
              </div>
            </div>
          </Form>
          
          
        )}

        </TableSection>
        

      </Container>
 
  );
}


const Container = styled.div`
  min-height: 100vh;
  background: #ffffff;
  font-family: "Poppins", sans-serif;

  .content-forms {
    max-width: 1500px;
    padding: 32px;
  }

  .table-layout {
    display: block;
  }

  .table-container {
    background: #ffffff;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
    overflow-x: auto;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  }

  .data-table thead {
    background: #f5f7fa;
  }

  .data-table th {
    padding: 14px 16px;
    font-weight: 600;
    color: #1e2a3a;
    border-bottom: 2px solid #e5e9f0;
  }

  .data-table td {
    padding: 14px 16px;
    border-bottom: 1px solid #eef1f6;
    color: #4a5568;
  }

  .data-table tbody tr:hover {
    background: #f9fbfd;
  }

  .row-actions {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .row-actions svg {
    font-size: 22px;
    cursor: pointer;
    transition: transform 0.2s ease, color 0.2s ease;
    color: #6b7280;
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

  @media (max-width: 768px) {
  .content-forms {
    padding: 16px;
    background: #f8fafc;
  }

  .table-container {
    padding: 14px;
    border-radius: 20px;
    background: #f1f5f9;
  }

  .data-table {
    border-collapse: separate;
    border-spacing: 0 16px;
  }

  .data-table thead {
    display: none;
  }

  .data-table tr {
    display: block;
    background: linear-gradient(
      180deg,
      #f8fafc 0%,
      #ffffff 100%
    );
    border-radius: 18px;
    padding: 14px 16px;
    box-shadow: 0 8px 22px rgba(15, 23, 42, 0.08);
    border-left: 4px solid #63f187;
  }

  .data-table td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    padding: 10px 0;
    color: #0f172a;
    font-size: 0.85rem;
  }

  .data-table td:not(:last-child) {
    border-bottom: 1px dashed #e2e8f0;
  }

  .data-table td::before {
    content: attr(data-label);
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #63f192;
    letter-spacing: 0.04em;
  }

  .data-table td:last-child {
    justify-content: flex-end;
    padding-top: 14px;
  }

  .row-actions {
    justify-content: flex-end;
    gap: 14px;
  }
}

`;


const FabCrear = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 120;

  display: flex;
  align-items: center;
  gap: 10px;

  padding: 14px 22px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #1c576e, #15e47c);
  color: #022c22;

  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;

  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
  transition: transform 0.2s ease;

  .icon {
    font-size: 1.2rem;
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
  }

  &:hover {
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    padding: 14px;
    border-radius: 50%;

    .label {
      display: none;
    }
  }
`;


const Form = styled.form`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  color: black;

  .modal {
    background: #ffffff;
    padding: 28px;
    border-radius: 18px;
    width: 420px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  img {
  align-self: center; 
  max-width: 240px;       
  width: 100%;
  height: auto;
  object-fit: contain;
  opacity: 0.95;
}

  h2 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 700;
    color: #0f172a; 
    text-align: center;
  }

  input {
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    font-size: 0.9rem;
    outline: none;

    &:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
    }
  }

  .actions {
    display: flex;
    gap: 10px;
    margin-top: 12px;

    button {
      flex: 1;
      padding: 12px;
      border-radius: 10px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .cancel {
      background: #e5e7eb;
      color: #1e293b;

      &:hover {
        background: #cbd5f5;
      }
    }

    .submit {
      background: #6366f1;
      color: white;

      &:hover {
        background: #4f46e5;
      }
    }
  }

  @media (max-width: 480px) {
    .modal {
      width: 90%;
      padding: 22px;
    }
  }
`;





const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 40px;
  margin-left: 50px;

  h2 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #0f172a;
    position: relative;
    padding-left: 14px;
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


const TableSection = styled.section`
  text-align: center;
  padding: 16px;
  @media (max-width: 768px) {
    padding: 16px;
  }
`;



