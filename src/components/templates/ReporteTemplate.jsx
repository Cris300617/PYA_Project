import { useState, useEffect } from "react";
import styled from "styled-components";
import { Sidebar,FormSection, AntecedentesObra, AntecedentesInspeccion, AntecedentesActividad, AntecedentesColaboradores, AntecedentesEmpresa, AntecedentesHallazgos, AntecedentesResponsableFaena, AntecedentesUbicacion, Btnexcel, BtnPdfReporte } from "../../index";
import { supabase } from "../../supabase/supabase.config";
import image from "./pya.png";
import * as XLSX from 'xlsx';


const componentMap = {
  antecedentes_obra: AntecedentesObra,
  antecedentes_inspeccion: AntecedentesInspeccion,
  
  antecedentes_empresa: AntecedentesEmpresa,
  
  antecedentes_responsable_faena: AntecedentesResponsableFaena,
  antecedentes_actividad: AntecedentesActividad,
  antecedentes_ubicacion: AntecedentesUbicacion,
  antecedentes_hallazgos: AntecedentesHallazgos,
  antecedentes_colaboradores: AntecedentesColaboradores,
  
  
};

const crearHallazgo = () => ({
  id: crypto.randomUUID(),
  descripcion: "",
  estado: "Pendiente",
  paralizacion: "",
  potencializacion: "",
  tipo_hallazgo: "",
  evidencia: "",
  clasificacion: "",
  control_asociado: "",
  fecha_cierre: "",
  medida_correctiva: "",
  tipo_evidencia_cierre: "",
  e_documental_cierre_hallazgo: "",
  e_fotografica_cierre_hallazgo: "",
});


export function ReporteTemplate() {
  const [template, setTemplate] = useState(null);
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hallazgos, setHallazgos] = useState([crearHallazgo()]);

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    empresa: "",
    region: "",
    actividad: "",
  });

  const [visibleColumns, setVisibleColumns] = useState({
  id: true,
  tipo_obra: true,
  codigo_obra: true,
  fecha_ids: true,
  empresa: true,
  region: true,
  actividad: true,
  responsable: true,
  latitud: true,
});

const [openColumns, setOpenColumns] = useState(false);




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
      
      if (!error) setReportes(data);
      setLoading(false);
    }

    const reportesFiltrados = reportes.filter((r) => {
      const searchMatch =
        search === "" ||
        Object.values(r)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());

      const empresaMatch =
        !filters.empresa ||
        r.nombre_empresa?.toLowerCase().includes(filters.empresa.toLowerCase());

      const regionMatch =
        !filters.region ||
        r.region?.toLowerCase().includes(filters.region.toLowerCase());

      const actividadMatch =
        !filters.actividad ||
        r.tipo_actividad?.toLowerCase().includes(filters.actividad.toLowerCase());

      return searchMatch && empresaMatch && regionMatch && actividadMatch;
    });


    const exportarExcel = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(reportes);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos de Tabla');
        XLSX.writeFile(workbook, 'datos_tabla.xlsx'); 
        console.log("hola")
      };

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

    if (template.antecedentes_hallazgos && actividadData.ids_con_hallazgo === "Si") {

      
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

      
      const hallazgosValidos = hallazgos.filter(
        h => h.descripcion && h.descripcion.trim() !== ""
      );

      if (hallazgosValidos.length > 0) {
        const { error } = await supabase.rpc(
          "crear_info_hallazgos",
          {
            p_reporte_id: reporte.id,
            p_hallazgos: hallazgosValidos
          }
        );

        if (error) {
          console.error("Error insertando hallazgos:", error);
          throw error;
        }
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

    setHallazgos([{ descripcion: "", estado:"", paralizacion:"",
    potencializacion:"",
    tipo_hallazgo:"",
    evidencia:"",
    clasificacion:"",
    control_asociado:"",
    fecha_cierre:"",
    medida_correctiva:"",
    tipo_evidencia_cierre:"",
    e_documental_cierre_hallazgo:"",
    e_fotografica_cierre_hallazgo:"", }]);

      
      {/**AQUIIIIIII PONEEER INFOOOOOOO */}

      

    } catch (err) {
      console.error("Error al guardar reporte:", err);
    }
  }

  if (!template) return null;

  return (
    <Container>
      <Sidebar />


      <TableSection>
  <TableHeader>
  <TitleGroup>
    <h2>Reportes</h2>
    <span>Listado general de inspecciones</span>
  </TitleGroup>


  <Btnexcel />
</TableHeader>

<TableControls>
  <FiltersBar>
    <input
      type="text"
      placeholder="Buscar en todos los campos..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </FiltersBar>

  <ColumnDropdown>
    <button
      className="toggle"
      onClick={() => setOpenColumns(!openColumns)}
    >
      Columnas ▾
    </button>

    {openColumns && (
      <div className="menu">
        {Object.keys(visibleColumns).map((col) => (
          <label key={col}>
            <input
              type="checkbox"
              checked={visibleColumns[col]}
              onChange={() =>
                setVisibleColumns({
                  ...visibleColumns,
                  [col]: !visibleColumns[col],
                })
              }
            />
            {col.replace("_", " ")}
          </label>
        ))}
      </div>
    )}
  </ColumnDropdown>
</TableControls>




  <TableWrapper>
    {loading ? (
      <p>Cargando reportes...</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo Obra</th>
            <th>Código Obra</th>
            <th>Fecha IDS</th>
            <th>Empresa</th>
            <th>Región</th>
            <th>Actividad</th>
            <th>Responsable</th>
            <th>Latitud</th>
          </tr>
        </thead>
        <tbody>
          {reportesFiltrados.map((r) => (
            <tr key={r.reporte_id}>
              {visibleColumns.id && <td>{r.reporte_id}</td>}
              {visibleColumns.tipo_obra && <td>{r.tipo_obra}</td>}
              {visibleColumns.codigo_obra && <td>{r.codigo_obra}</td>}
              {visibleColumns.fecha_ids && <td>{r.fecha_ids}</td>}
              {visibleColumns.empresa && <td>{r.nombre_empresa}</td>}
              {visibleColumns.region && <td>{r.region}</td>}
              {visibleColumns.actividad && <td>{r.tipo_actividad}</td>}
              {visibleColumns.responsable && <td>{r.nombre_responsable}</td>}
              {visibleColumns.latitud && <td>{r.geo_latitud}</td>}
              <td>
                <BtnPdfReporte reporteId={r.reporte_id} />
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    )}
  </TableWrapper>
</TableSection>


      

      <FabCrear onClick={() => setOpen(true)}>
        <span className="icon">＋</span>
        <span className="label">Crear Reporte</span>
      </FabCrear>

      {open && (
        <Modal>
          <div className="modal">
            
              <img src={image} alt="logo" />
            

            <h3>Formulario de Reporte</h3>
            

            {/* Render dinámico según template*/}
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
                antecedentes_hallazgos: "Antecedentes de Hallazgos",
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

  @media (max-width: 1024px) {
    padding-left: 0; /* 👈 sidebar colapsado */
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

  .btnexcel{
    display: flex;

  }
`;

const FabCrear = styled.button`
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 120;

  display: flex;
  align-items: center;
  gap: 10px;

  padding: 14px 22px;
  border-radius: 999px;
  border: none;

  background: linear-gradient(135deg, #1c576e 0%, #15e47c 100%);
  color: #022c22;

  font-family: "Poppins", sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.02em;

  cursor: pointer;
  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.18),
    inset 0 0 0 1px rgba(255, 255, 255, 0.15);

  transition: 
    transform 0.18s ease,
    box-shadow 0.18s ease,
    filter 0.18s ease;

  .icon {
    font-size: 1.2rem;
    line-height: 1;
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    font-weight: 700;
  }

  &:hover {
    transform: translateY(-3px);
    filter: brightness(1.05);
    box-shadow:
      0 18px 40px rgba(0, 0, 0, 0.22),
      0 0 0 6px rgba(21, 228, 124, 0.15);
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
    box-shadow:
      0 10px 22px rgba(0, 0, 0, 0.2);
  }

  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 4px rgba(21, 228, 124, 0.35);
  }

  @media (max-width: 640px) {
    bottom: 16px;
    right: 16px;
    padding: 12px 16px;
    font-size: 0.85rem;

    .label {
      display: none;
    }
  }
`;

const TableSection = styled.section`
  padding: 30px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;


const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h2 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: 0.02em;
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
    font-weight: 500;
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
    width: 100%;
    max-width: 1024px;  
    max-height: 90vh;
    overflow-y: auto;

    background: white;
    padding: 32px 36px;
    border-radius: 18px;

    display: flex;
    flex-direction: column;
    gap: 24px;

    @media (max-width: 1024px) {
    max-width: 100%;
  }

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

      @media (max-width: 480px) {
        font-size: 1.15rem;
      }
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

    @media (max-width: 480px) {
          width: 100%;
        }
  }

  .cancel {
    background: #e5e7eb;
    color: #334155;
  }

  .create {
    background: linear-gradient(90deg, #22c55e, #4ade80);
    color: #064e3b;
  }

  @media (max-width: 480px) {
        flex-direction: column;
      }
}}

@media (max-width: 768px) {
      padding: 20px;
      border-radius: 14px;
    }

    @media (max-width: 480px) {
      padding: 16px;
    }

`;

const TableWrapper = styled.div`
  padding: 30px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: #ffffff;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    font-size: 0.9rem;
    min-width: 900px; 
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
  @media (max-width: 768px) {
    padding: 12px;

    table {
      font-size: 0.85rem;
    }
  }
`;


const FiltersBar = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  input {
    padding: 10px 14px;
    border-radius: 999px;
    border: 1px solid #cbd5e1;
    font-size: 0.85rem;
    min-width: 180px;
  }
`;

const ColumnDropdown = styled.div`
  position: relative;

  .toggle {
    padding: 10px 18px;
    border-radius: 999px;
    border: 1px solid #cbd5e1;
    background: white;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    color: #334155;

    &:hover {
      background: #f8fafc;
    }
  }

  .menu {
    position: absolute;
    top: 120%;
    right: 0;
    min-width: 220px;
    background: white;
    border-radius: 14px;
    padding: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,.15);
    z-index: 100;

    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  label {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 0.8rem;
    color: #334155;
    cursor: pointer;

    input {
      cursor: pointer;
    }
  }
`;

const TableControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  margin: 20px 25px 5px 25px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

