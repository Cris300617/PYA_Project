import styled from "styled-components";

export function AntecedentesHallazgos({ hallazgos, setHallazgos }) {
  const controlAsociado = [
    "Vehículos, Camiones, Maquinarias",
    "Condiciones Básicas de Trabajo",
    "Delimitación de Zona de Trabajo",
    "Documentación en Terreno",
    "Elementos de Protección Personal",
    "Equipos y Herramientas",
    "Equipos Dielectricos",
    "Manejo de Sustancias y Residuos",
    "Condiciones Externas",
    "Línea Roja - Falta Administrativa",
    "Línea Roja - Actividad",
    "Trabajos en Altura",
    "Trabajos con Tensión",
    "Espacios Confinados",
    "Manipulación de Carga",
    "Excavaciones",
    "Condiciones Climáticas",
    "5 Reglas de Oro",
  ];

  const agregarHallazgo = () => {
    setHallazgos([
      ...hallazgos,
      {
        id: crypto.randomUUID(),
        descripcion: "",
        estado: "",
        paralizacion: "",
        potencializacion: "",
        tipo_hallazgo: "",
        evidencia: null,
        clasificacion: "",
        control_asociado: "",
        fecha_cierre: "",
        medida_correctiva: "",
        tipo_evidencia_cierre: "",
        e_documental_cierre_hallazgo: "",
        e_fotografica_cierre_hallazgo: "",
      },
    ]);
  };

  const eliminarHallazgo = (id) => {
    setHallazgos(hallazgos.filter((h) => h.id !== id));
  };

  const actualizarCampo = (id, campo, value) => {
    setHallazgos(
      hallazgos.map((h) =>
        h.id === id ? { ...h, [campo]: value } : h
      )
    );
  };

  const handleSubmit = (e) => {
    if (!e.currentTarget.checkValidity()) {
      e.preventDefault();
      e.currentTarget.reportValidity();
      return;
    }

    e.preventDefault();
    console.log("Formulario válido ✅", hallazgos);
    // aquí va tu lógica de guardado
  };

  return (
      <Container>
        {hallazgos.map((h, index) => (
          <div key={`${h.id}-${index}`} className="hallazgo">
            <div className="header">
              <h4>Hallazgo #{index + 1}</h4>
              {hallazgos.length > 1 && (
                <button
                  type="button"
                  className="delete"
                  onClick={() => eliminarHallazgo(h.id)}
                >
                  Eliminar
                </button>
              )}
            </div>

            <textarea
              className="full"
              placeholder="Describe el hallazgo"
              value={h.descripcion}
              onChange={(e) =>
                actualizarCampo(h.id, "descripcion", e.target.value)
              }
            />

            <div className="grid">
              <div>
                <label>Estado</label>
                <select
                  required
                  value={h.estado}
                  onChange={(e) =>
                    actualizarCampo(h.id, "estado", e.target.value)
                  }
                >
                  <option value="" disabled hidden>
                    Seleccionar opción
                  </option>
                  <option value="Abierto">Abierto</option>
                  <option value="Cerrado">Cerrado</option>
                  <option value="RIS">RIS</option>
                </select>
              </div>

              <div>
                <label>Paralización</label>
                <select
                  required
                  value={h.paralizacion}
                  onChange={(e) =>
                    actualizarCampo(h.id, "paralizacion", e.target.value)
                  }
                >
                  <option value="" disabled hidden>
                    Seleccionar opción
                  </option>
                  <option value="Si">Si</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label>Potencialidad</label>
                <select
                  required
                  value={h.potencializacion}
                  onChange={(e) =>
                    actualizarCampo(h.id, "potencializacion", e.target.value)
                  }
                >
                  <option value="" disabled hidden>
                    Seleccionar opción
                  </option>
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>

              <div>
                <label>Tipo Hallazgo</label>
                <select
                  required
                  value={h.tipo_hallazgo}
                  onChange={(e) =>
                    actualizarCampo(h.id, "tipo_hallazgo", e.target.value)
                  }
                >
                  <option value="" disabled hidden>
                    Seleccionar opción
                  </option>
                  <option value="Seguridad y Salud">Seguridad y Salud</option>
                  <option value="Medio Ambiente">Medio Ambiente</option>
                  <option value="Linea Roja de Seguridad">
                    Linea Roja de Seguridad
                  </option>
                </select>
              </div>

              <div>
                <label>Evidencia (Foto)</label>
                <label className="file-input">
                  {h.evidencia ? h.evidencia.name : "Seleccionar archivo"}
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) =>
                      actualizarCampo(h.id, "evidencia", e.target.files[0])
                    }
                  />
                </label>


                {h.evidencia && (
                  <small style={{ fontSize: "0.7rem", color: "#64748b" }}>
                    Archivo: {h.evidencia.name}
                  </small>
                )}
              </div>


              <div>
                <label>Clasificación</label>
                <select
                  required
                  value={h.clasificacion}
                  onChange={(e) =>
                    actualizarCampo(h.id, "clasificacion", e.target.value)
                  }
                >
                  <option value="" disabled hidden>
                    Seleccionar opción
                  </option>
                  <option value="Accion Subestandar">
                    Accion Subestandar
                  </option>
                  <option value="Condicion Subestandar">
                    Condicion Subestandar
                  </option>
                </select>
              </div>

              <div>
                <label>Control Asociado</label>
                <select
                  required
                  value={h.control_asociado}
                  onChange={(e) =>
                    actualizarCampo(h.id, "control_asociado", e.target.value)
                  }
                >
                  <option value="" disabled hidden>
                    Seleccionar opción
                  </option>
                  {controlAsociado.map((control) => (
                    <option key={control} value={control}>
                      {control}
                    </option>
                  ))}
                </select>
              </div>

              {h.estado === "Cerrado" && (
                <>
                  <div>
                    <label>Fecha Cierre</label>
                    <input
                      required
                      type="date"
                      value={h.fecha_cierre}
                      onChange={(e) =>
                        actualizarCampo(
                          h.id,
                          "fecha_cierre",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div>
                    <label>Medida Correctiva</label>
                    <input
                      required
                      type="text"
                      value={h.medida_correctiva}
                      onChange={(e) =>
                        actualizarCampo(
                          h.id,
                          "medida_correctiva",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div>
                    <label>Tipo Evidencia Cierre</label>
                    <input
                      required
                      type="text"
                      value={h.tipo_evidencia_cierre}
                      onChange={(e) =>
                        actualizarCampo(
                          h.id,
                          "tipo_evidencia_cierre",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div>
                    <label>Doc. Cierre</label>
                    <input
                      required
                      type="text"
                      value={h.e_documental_cierre_hallazgo}
                      onChange={(e) =>
                        actualizarCampo(
                          h.id,
                          "e_documental_cierre_hallazgo",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div>
                    <label>Foto Cierre</label>
                    <input
                      required
                      type="text"
                      value={h.e_fotografica_cierre_hallazgo}
                      onChange={(e) =>
                        actualizarCampo(
                          h.id,
                          "e_fotografica_cierre_hallazgo",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}

        <button type="button" className="add" onClick={agregarHallazgo}>
          Agregar hallazgo
        </button>
      </Container>
  );
}

const Container = styled.div`
  display: grid;
  flex-direction: column;
  gap: 24px;


  .file-input {
  max-width: 180px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  font-size: 0.85rem;
  background: #fff;
  color: #334155;
  cursor: pointer;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  transition: border-color 0.2s, box-shadow 0.2s;
}


  .file-input:hover {
    background: #41a978;
  }

  .file-input:focus-within {
    border-color: #15e47c;
    box-shadow: 0 0 0 2px rgba(21, 228, 124, 0.2);
  }

  .file-input input {
    display: none;
  }


  .hallazgo {
    background: #ffffff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h4 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }

  .grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}


  .grid > div {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }

  .full {
    width: 100%;
    min-height: 100px;
  }

  label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #475569;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #cbd5e1;
    font-size: 0.85rem;
    background: #fff;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    border-color: #15e47c;
    box-shadow: 0 0 0 2px rgba(21, 228, 124, 0.2);
  }

  select:focus {
    outline: none;
    border-color: #15e47c;
    box-shadow: 0 0 0 2px rgba(21, 228, 124, 0.2);
  }

  textarea {
    resize: vertical;
  }

  textarea:focus {
    outline: none;
    border-color: #15e47c;
    box-shadow: 0 0 0 2px rgba(21, 228, 124, 0.2);
  }

  .delete {
    background: #ef4444;
    color: white;
    border: none;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 0.75rem;
    cursor: pointer;
    white-space: nowrap;
  }

  .add {
  cursor: pointer;
  background: #22c55e;
  color: #064e3b;
  border: none;
  padding: 10px 18px;
  border-radius: 999px;
  font-weight: 600;

  justify-self: start; 
  width: fit-content;    
}


  @media (min-width: 641px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    min-width:400px;
  }
}

@media (min-width: 0px) {
  .grid {
    min-width: 200px;
  }
}



`;


