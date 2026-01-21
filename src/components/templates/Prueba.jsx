import { useState,useEffect } from "react";
import styled from "styled-components";
import { jsPDF } from "jspdf";
import { Sidebar, Search, Registro, TablaInforme } from "../../index";
import image from "./pya.png";
import { supabase } from "../../supabase/supabase.config";
import {Map,Marker,} from "@vis.gl/react-google-maps";


export function DatosTemplate() {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    rut: "",
    correo: "",
    telefono: "",
    profesion: "",
  });


  const obtenerUbicacion = () => {
    if (!navigator.geolocation) {
      setError("La geolocalización no es compatible.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError(null);
      },
      () => {
        setError("No se pudo obtener la ubicación.");
        setLocation(null);
      }
    );
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("tablaprueba1")
      .insert([form]);

    if (error) {
      console.error("Error al insertar:", error);
      return;
    }

    setForm({
      nombre: "",
      rut: "",
      correo: "",
      telefono: "",
      profesion: "",
    });

    setOpen(false);
  }

  const generarPDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("Informe de Postulante", 20, 20);

    pdf.setFontSize(12);
    pdf.text(`Nombre: ${form.nombre}`, 20, 40);
    pdf.text(`RUT: ${form.rut}`, 20, 50);
    pdf.text(`Correo: ${form.correo}`, 20, 60);
    pdf.text(`Teléfono: ${form.telefono}`, 20, 70);
    pdf.text(`Profesión: ${form.profesion}`, 20, 80);

    pdf.save(`Reporte_${form.nombre}.pdf`);
    setOpen(false);
  };

  return (
      <Container>

        <header className="header-home">
          D-<span>Project</span>
        </header>

        <section>
          <button onClick={obtenerUbicacion}>
            Obtener mi ubicación
          </button>

          {location ? (
            <p style={{color: "red"}}>
              Latitud: {location.lat} | Longitud: {location.lng}
            </p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <p style={{color: "red"}}>Presiona el botón para mostrar el mapa</p>
          )}

          {location && (
            <div className="map-container">
              <Map style={{ borderRadius: "20px" }} 
              defaultZoom={13}
              defaultCenter={location} 
              gestureHandling={"greedy"} 
              disableDefaultUI
              >
                <Marker position={location} />
              </Map>
            </div>
          )}
        </section>

        <section className="search">
          <Search />
        </section>

        <section className="reg">
          <TablaInforme />
          <Registro />
        </section>

        <section className="btn-crear">
          <button onClick={() => setOpen(true)}>
            ➕ Crear Reporte
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
                name="nombre"
                value={form.nombre}
                placeholder="Nombre completo"
                onChange={handleChange}
              />
              <input
                name="rut"
                value={form.rut}
                placeholder="RUT"
                onChange={handleChange}
              />
              <input
                name="correo"
                value={form.correo}
                placeholder="Correo"
                onChange={handleChange}
              />
              <input
                name="telefono"
                value={form.telefono}
                placeholder="Teléfono"
                onChange={handleChange}
              />
              <input
                name="profesion"
                value={form.profesion}
                placeholder="Profesión"
                onChange={handleChange}
              />

              <div className="actions">
                <button
                  type="button"
                  className="cancel"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="create"
                  onClick={generarPDF}
                >
                  Generar PDF
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

.lat{
  color: red;
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


