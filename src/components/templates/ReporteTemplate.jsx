import { useState, useEffect } from "react";
import styled from "styled-components";
import { Sidebar,FormSection, AntecedentesObra, AntecedentesInspeccion, AntecedentesActividad, AntecedentesColaboradores, AntecedentesEmpresa, AntecedentesHallazgos, AntecedentesResponsableFaena, AntecedentesUbicacion } from "../../index";
import { supabase } from "../../supabase/supabase.config";
import image from "./pya.png";


const componentMap = {
  antecedentes_obra: AntecedentesObra,
  antecedentes_inspeccion: AntecedentesInspeccion,
  
  antecedentes_empresa: AntecedentesEmpresa,
  
  antecedentes_responsable_faena: AntecedentesResponsableFaena,
  antecedentes_actividad: AntecedentesActividad,
  antecedentes_ubicacion: AntecedentesUbicacion,
  antecedentes_colaboradores: AntecedentesColaboradores,
  antecedentes_hallazgos: AntecedentesHallazgos,
  
};

export function ReporteTemplate() {
  const [template, setTemplate] = useState(null);
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hallazgos, setHallazgos] = useState([
  { descripcion: "" }
]);

  const [obraData, setObraData] = useState({
    tipo_obra: "",
    codigo_obra: "",
  });
  const [inspeccionData, setInspeccionData] = useState({
    fecha_ids: "",
    hora_ids: "",
    division: "",
    hora_inicio_faena:"",
    hora_termino_faena:"",
    auditoria_inicio:"",
  });

  const [empresaData, setEmpresaData] = useState({
    rut_empresa: "",
    nombre_empresa: "",
  });

  const [faenaData, setFaenaData] = useState({
    run_responsable: "",
    nombre_responsable: "",
    acreditado: "",
    cargo_acreditado: "",
    empresa_acreditadora: "",
    fuerza_de_trabajo: "",
  });

  const [actividadData, setActividadData] = useState({
    tipo_actividad: "",
    sociedad_cge: "",
    emergencia: "",
    ids_efectiva: "",
    descripcion: "",
    ids_con_hallazgo: "",
  });

  const [ubicacionData, setUbicacionData] = useState({
    region: "",
    zona: "",
    delegacion: "",
    direccion: "",
    geo_latitud: "",
    geo_longitud: "",
    geo_altitud: "",
  });
  
  

  {/**const [_Data, set_Data] = useState({
    __: "",
    __: "",
  }); */}
  
  const [open, setOpen] = useState(false);

  useEffect(() => {
    obtenerTemplate();
    obtenerReportes();
  }, []);

  async function obtenerTemplate() {
    const { data, error } = await supabase
      .from("forms")
      .select("*")
      .limit(1)
      .single();

    if (error) {
      console.error("Error al obtener template:", error);
    } else {
      setTemplate(data);
    }
  }

  async function obtenerReportes() {
    setLoading(true);

    const { data, error } = await supabase
      .from("v_reportes_resumen")
      .select("*")
      .order("reporte_id", { ascending: false });

      console.log(data);
      console.log(reportes);



    if (!error) setReportes(data);
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!template) return;

    try {
      const { data: reporte, error: reporteError } = await supabase
        .from("forms_ids_2026")
        .insert([
          {
            form_id: template.id,
          },
        ])
        .select()
        .single();


      if (reporteError) throw reporteError;

      if (template.antecedentes_obra) {
        const { error: obraError } = await supabase
          .from("antecedentes_obra")
          .insert([
            {
              reporte_id: reporte.id,
              tipo_obra: obraData.tipo_obra || null,
              codigo_obra: obraData.codigo_obra || null,
            },
          ]);

        if (obraError) throw obraError;
      }
            if (template.antecedentes_inspeccion) {
        const { error: inspeccionError } = await supabase
          .from("antecedentes_inspeccion")
          .insert([
            {
              reporte_id: reporte.id,
              fecha_ids: inspeccionData.fecha_ids || null,
              hora_ids: inspeccionData.hora_ids || null,
              division: inspeccionData.division || null,
              hora_inicio_faena: inspeccionData.hora_inicio_faena || null,
              hora_termino_faena: inspeccionData.hora_termino_faena || null,
              auditoria_inicio: inspeccionData.auditoria_inicio || null,
            },
          ]);

        if (inspeccionError) throw inspeccionError;
      }

      if (template.antecedentes_actividad) {
        const { error: actividadError } = await supabase
          .from("antecedentes_actividad")
          .insert([
            {
              reporte_id: reporte.id,
              tipo_actividad: actividadData.tipo_actividad || null,
              sociedad_cge: actividadData.sociedad_cge || null,
              emergencia: actividadData.emergencia || null,
              ids_efectiva: actividadData.ids_efectiva || null,
              descripcion: actividadData.descripcion || null,
              ids_con_hallazgo: actividadData.ids_con_hallazgo || null,
            },
          ]);

        if (actividadError) throw actividadError;
      }

      if (template.antecedentes_responsable_faena) {
        const { error: faenaError } = await supabase
          .from("antecedentes_responsable_faena")
          .insert([
            {
              reporte_id: reporte.id,
              run_responsable: faenaData.run_responsable|| null,
              nombre_responsable: faenaData.nombre_responsable || null,
              acreditado: faenaData.acreditado || null,
              cargo_acreditado: faenaData.cargo_acreditado || null,
              empresa_acreditadora: faenaData.empresa_acreditadora || null,
              fuerza_de_trabajo: faenaData.fuerza_de_trabajo || null,
            },
          ]);

        if (faenaError) throw faenaError;
      }

      if (template.antecedentes_empresa) {
        const { error: empresaError } = await supabase
          .from("antecedentes_empresa")
          .insert([
            {
              reporte_id: reporte.id,
              rut_empresa: empresaData.rut_empresa || null,
              nombre_empresa: empresaData.nombre_empresa || null,
            },
          ]);

        if (empresaError) throw empresaError;
      }

      if (template.antecedentes_ubicacion) {
        const { error: ubicacionError } = await supabase
          .from("antecedentes_ubicacion")
          .insert([
            {
              reporte_id: reporte.id,
              region: ubicacionData.region || null,
              zona: ubicacionData.zona || null,
              delegacion: ubicacionData.delegacion || null,
              direccion: ubicacionData.direccion || null,
              geo_latitud: ubicacionData.geo_latitud || null,
              geo_longitud: ubicacionData.geo_longitud || null,
              geo_altitud: ubicacionData.geo_altitud || null,
            },
          ]);

        if (ubicacionError) throw ubicacionError;
      }

      // ================= HALLAZGOS =================
    if (template.antecedentes_hallazgos && actividadData.ids_con_hallazgo === "Si") {

      // 1️⃣ crear antecedente de hallazgos
      const { data: antecedenteHallazgos, error: antecedenteError } =
        await supabase
          .from("antecedentes_hallazgos")
          .insert([
            {
              reporte_id: reporte.id,
            },
          ])
          .select()
          .single();

      if (antecedenteError) throw antecedenteError;

      // 2️⃣ insertar hallazgos (si existen)
      const descripciones = hallazgos
        .map(h => h.descripcion)
        .filter(d => d && d.trim() !== "");

      if (descripciones.length > 0) {
        const { data, error } = await supabase.rpc(
  "crear_antecedente_y_hallazgos",
  {
    p_reporte_id: reporte.id,
    p_descripciones: descripciones,
  }
);

console.log("RPC crear_antecedente_y_hallazgos:", data, error);
      }
    }



      setOpen(false);
      setObraData({ tipo_obra: "", codigo_obra: "" });
      setInspeccionData({ fecha_ids: "", hora_ids: "", division: "" , hora_inicio_faena: "" , hora_termino_faena: "" , auditoria_inicio: "" });
      setEmpresaData({ rut_empresa: "",
    nombre_empresa: "",});
      setFaenaData({ run_responsable: "",
    nombre_responsable: "",
    acreditado: "",
    cargo_acreditado: "",
    empresa_acreditadora: "",
    fuerza_de_trabajo: "",});
      setActividadData({ tipo_actividad: "",
    sociedad_cge: "",
    emergencia: "",
    ids_efectiva: "",
    descripcion: "",
    ids_con_hallazgo: "",});
      setUbicacionData({ region: "",
    zona: "",
    delegacion: "",
    direccion: "",
    geo_latitud: "",
    geo_longitud: "",
    geo_altitud: "",});

    setHallazgos([{ descripcion: "" }]);

      
      {/**AQUIIIIIII PONEEER INFOOOOOOO */}

      

    } catch (err) {
      console.error("Error al guardar reporte:", err);
    }
  }

  if (!template) return null;

  return (
    <Container>
      <Sidebar />

      <header className="header-home">
        D-<span>Project</span>
      </header>
      {/* ================= TABLA RESUMEN ================= */}
      <TableWrapper>
        {loading ? (
          <p>Cargando reportes...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo Obra</th>
                <th>Código</th>
                <th>Fecha</th>
                <th>Empresa</th>
                <th>Región</th>
                <th>Actividad</th>
                <th>Responsable</th>
              </tr>
            </thead>
            <tbody>
              {reportes.map((r) => (
                <tr key={r.reporte_id}>
                  <td>{r.reporte_id}</td>
                  <td>{r.tipo_obra}</td>
                  <td>{r.codigo_obra}</td>
                  <td>{r.fecha_ids}</td>
                  <td>{r.nombre_empresa}</td>
                  <td>{r.region}</td>
                  <td>{r.tipo_actividad}</td>
                  <td>{r.nombre_responsable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </TableWrapper>

      <section className="btn-crear">
        <button onClick={() => setOpen(true)}>➕ Crear Reporte</button>
      </section>

      {open && (
        <Modal>
          <div className="modal">
            
              <img src={image} alt="logo" />
            

            <h3>Formulario de Reporte</h3>
            

            {/* Render dinámico según template */}
            {Object.keys(componentMap).map((key, index) => {
              if (!template[key]) return null;

              const Component = componentMap[key];

              const titles = {
                antecedentes_obra: "Antecedentes de la Obra",
                antecedentes_inspeccion: "Antecedentes de Inspección",
                antecedentes_empresa: "Antecedentes de la Empresa",
                antecedentes_responsable_faena: "Antecedentes del Responsable de Faena y/o Actividad",
                antecedentes_actividad: "Antecedentes de Actividad",
                antecedentes_ubicacion: "Antecedentes de Ubicación",
              };

              return (
                <FormSection
                  key={key}
                  title={titles[key]}
                  index={index}
                >
                  <Component
                    {...(key === "antecedentes_hallazgos"
                      ? {
                          hallazgos,
                          setHallazgos,
                        }
                      : {
                          data:
                            key === "antecedentes_obra" ? obraData :
                            key === "antecedentes_inspeccion" ? inspeccionData :
                            key === "antecedentes_empresa" ? empresaData :
                            key === "antecedentes_responsable_faena" ? faenaData :
                            key === "antecedentes_actividad" ? actividadData :
                            ubicacionData,
                          setData:
                            key === "antecedentes_obra" ? setObraData :
                            key === "antecedentes_inspeccion" ? setInspeccionData :
                            key === "antecedentes_empresa" ? setEmpresaData :
                            key === "antecedentes_responsable_faena" ? setFaenaData :
                            key === "antecedentes_actividad" ? setActividadData :
                            setUbicacionData,
                        })}
                  />
                </FormSection>
              );
            })}



            <div className="actions">
              <button className="cancel" onClick={() => setOpen(false)}>
                Cancelar
              </button>
              <button className="create" onClick={handleSubmit}>
                Guardar
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
    width: 90%;
    max-width: 900px;   
    max-height: 90vh;
    overflow-y: auto;

    background: white;
    padding: 32px 36px;
    border-radius: 18px;

    display: flex;
    flex-direction: column;
    gap: 24px;

    img {
  align-self: flex-start; 
  max-width: 240px;       
  width: 100%;
  height: auto;
  object-fit: contain;
  opacity: 0.95;
}




    h3 {
      text-align: center;
      font-size: 1.5rem;
      font-weight: 600;
      color: #0f172a;
    }


    input {
      width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  font-size: 0.9rem;
  background: white;
    }

    .actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;

  button {
    padding: 12px 22px;
    border-radius: 999px;
    border: none;
    font-weight: 600;
    cursor: pointer;
  }

  .cancel {
    background: #e5e7eb;
    color: #334155;
  }

  .create {
    background: linear-gradient(90deg, #22c55e, #4ade80);
    color: #064e3b;
  }
}}

`;

const TableWrapper = styled.div`
  padding: 30px;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: #ffffff;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    font-size: 0.9rem;
  }

  thead {
    background: linear-gradient(90deg, #1c576e, #15e47c);
  }

  th {
    color: white;
    text-align: left;
    padding: 14px 16px;
    font-weight: 600;
    letter-spacing: 0.03em;
    white-space: nowrap;
  }

  tbody tr {
    transition: background 0.2s ease, transform 0.1s ease;
  }

  tbody tr:nth-child(even) {
    background: #f8fafc;
  }

  tbody tr:hover {
    background: #eef6f4;
    transform: scale(1.002);
  }

  td {
    padding: 14px 16px;
    border-bottom: 1px solid #e5e7eb;
    color: #1f2933;
    max-width: 220px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Columna id */
  td:first-child {
    font-family: monospace;
    font-size: 0.8rem;
    color: #475569;
    max-width: 160px;
  }

  /* ultima fila sin borde */
  tbody tr:last-child td {
    border-bottom: none;
  }

  /* Responsive */
  @media (max-width: 900px) {
    table {
      font-size: 0.85rem;
    }

    th, td {
      padding: 12px;
    }
  }
`;


