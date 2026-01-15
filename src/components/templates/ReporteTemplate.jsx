import { useState, useEffect } from "react";
import styled from "styled-components";
import { Sidebar, AntecedentesObra, AntecedentesInspeccion, AntecedentesActividad, AntecedentesColaboradores, AntecedentesEmpresa, AntecedentesHallazgos, AntecedentesResponsableFaena, AntecedentesUbicacion } from "../../index";
import { supabase } from "../../supabase/supabase.config";

const componentMap = {
  antecedentes_obra: AntecedentesObra,
  antecedentes_inspeccion: AntecedentesInspeccion,
  antecedentes_actividad: AntecedentesActividad,
  antecedentes_colaboradores: AntecedentesColaboradores,
  antecedentes_empresa: AntecedentesEmpresa,
  antecedentes_hallazgos: AntecedentesHallazgos,
  antecedentes_responsable_faena: AntecedentesResponsableFaena,
  antecedentes_ubicacion: AntecedentesUbicacion,
};

export function ReporteTemplate() {
  const [template, setTemplate] = useState(null);
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

      <section className="btn-crear">
        <button onClick={() => setOpen(true)}>➕ Crear Reporte</button>
      </section>

      {open && (
        <Modal>
          <div className="modal">
            <h3>Formulario de Reporte</h3>

            {/* Render dinámico según template */}
            {Object.keys(componentMap).map((key) => {
              if (!template[key]) return null;

              const Component = componentMap[key];

              switch (key) {
                case "antecedentes_obra":
                  return (
                    <Component
                      key={key}
                      data={obraData}
                      setData={setObraData}
                    />
                  );

                case "antecedentes_inspeccion":
                  return (
                    <Component
                      key={key}
                      data={inspeccionData}
                      setData={setInspeccionData}
                    />
                  );

                  case "antecedentes_empresa":
                  return (
                    <Component
                      key={key}
                      data={empresaData}
                      setData={setEmpresaData}
                    />
                  );
                  case "antecedentes_actividad":
                  return (
                    <Component
                      key={key}
                      data={actividadData}
                      setData={setActividadData}
                    />
                  );
                  case "antecedentes_responsable_faena":
                  return (
                    <Component
                      key={key}
                      data={faenaData}
                      setData={setFaenaData}
                    />
                  );
                  case "antecedentes_ubicacion":
                  return (
                    <Component
                      key={key}
                      data={ubicacionData}
                      setData={setUbicacionData}
                    />
                  );

                // más casos después
                default:
                  return null;
              }
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


