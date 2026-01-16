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
        <Sidebar />

        <header className="header-home">
          D-<span>Project</span>
        </header>

        <section className="head-forms">
          <p className="title-forms">Mis formularios</p>
        </section>
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
            <div className="total-register">
              <Registro/>
            </div>
          </div>

        </section>

        <section className="btn-crear">
          <button onClick={() => setOpen(true)}>
            ➕ Crear Formulario
          </button>
        </section>

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
                <button className="create" type="submit">
                  Subir
                </button>
              </div>
            </div>
          </Form>
          
          
        )}

      </Container>
 
  );
}


const Container = styled.div`
  min-height: 100vh;
  background: #ffffff;
  padding-left: 72px;
  font-family: "Poppins", sans-serif;


  .head-forms{
    background-color: #ffffff;
  }

  .title-forms{
    color: black;
    font-size: 23px;
    font-family: sans-serif;

  }

.content-forms {
  max-width: 1500px;
  margin: 0 ;
  padding: 40px 30px;
}



.table-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 32px;
  width: 100%;
  align-items: start;
}


.table-container {
  flex: 1;
  min-width: 0;
  min-width: 0;
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}


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


.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.data-table thead {
  background: #f5f7fa;
}

.data-table th {
  text-align: left;
  padding: 14px 16px;
  color: #1e2a3a;
  font-weight: 00;
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

.total-register {
  width: 100%;
  max-width: 340px;
  border-radius: 16px;
  padding: 24px;
}


@media (max-width: 1024px) {
  .table-layout {
    flex-direction: column;
  }

  .table-container {
    width: 100%;
  }

  .total-register {
    width: 100%;
    min-width: 340px;
    position: relative;
    top: auto;
  }
}


  
.map-container {
  height: 500px;
  width: 50%;
  border: 2px solid black;
  border-radius: 20px;
}


.header-home {
  position: relative;
  margin-left: -72px;   
  padding-left: 72px;   
  background-color: rgb(236, 238, 248);
  color: #53eb67;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  padding-top: 20px;
  padding-bottom: 20px;

  span {
    color: #00ffc3;
  }
}

  .btn-crear {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 100;

    button {
      background: linear-gradient(90deg, #1c576e, #15e47c);
      border: none;
      padding: 14px 28px;
      border-radius: 30px;
      color: #002b36;
      font-size: 1rem;
      cursor: pointer;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(0,0,0,.2);

      &:hover {
        transform: translateY(-2px);
      }
    }
  }

  .search{
    margin: 20px 0
  }

  .reg {
  display: grid;
  grid-template-columns: 1fr 230px 349px ;
  gap: 32px;
  padding: 40px;


  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.checked{
  display: "flex";
  align-items: center;
  gap: "8px"; 
  color: black;
}

  
`;

const Form = styled.form`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;

  .modal {
    background: white;
    padding: 30px;
    border-radius: 16px;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 14px;

    h3 {
      text-align: center;
      margin-bottom: 10px;
      color: black;
    }

    .sub-txt{
        color: #5a5555;
    }

    input {
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 0.95rem;
    }

    .actions {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;

      button {
        padding: 10px 18px;
        border-radius: 20px;
        border: none;
        cursor: pointer;
      }

      .cancel {
        background: #eee;
      }

      .create {
        background: #4ac8a5;
        color: white;
      }
    }
  }

`;

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;

  .modal {
    background: white;
    padding: 30px;
    border-radius: 16px;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 14px;

    h3 {
      text-align: center;
      margin-bottom: 10px;
      color: black;
    }

    .sub-txt{
        color: #5a5555;
    }

    input {
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 0.95rem;
    }

    .actions {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;

      button {
        padding: 10px 18px;
        border-radius: 20px;
        border: none;
        cursor: pointer;
      }

      .cancel {
        background: #eee;
      }

      .create {
        background: #4ac8a5;
        color: white;
      }
    }
  }
`;


