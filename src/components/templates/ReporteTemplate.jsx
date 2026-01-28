import { useState, useEffect } from "react";
import styled from "styled-components";
import { Sidebar,FormSection, AntecedentesObra, AntecedentesInspeccion, AntecedentesActividad, AntecedentesColaboradores, AntecedentesEmpresa, AntecedentesHallazgos, AntecedentesResponsableFaena, AntecedentesUbicacion, Btnexcel, BtnPdfReporte, BtnCierreReporte } from "../../index";
import { supabase } from "../../supabase/supabase.config";
import image from "./pya.png";


const componentMap = {
  antecedentes_inspeccion: AntecedentesInspeccion,
  antecedentes_ubicacion: AntecedentesUbicacion,
  antecedentes_obra: AntecedentesObra,
  antecedentes_empresa: AntecedentesEmpresa,
  antecedentes_responsable_faena: AntecedentesResponsableFaena,
  antecedentes_colaboradores: AntecedentesColaboradores,
  antecedentes_actividad: AntecedentesActividad,
  antecedentes_hallazgos: AntecedentesHallazgos,
  
  
  
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

const crearColaborador = () => ({
  id: crypto.randomUUID(),
  rut_colaborador: "",
  nombre_colaborador: "",
  cargo_colaborador: "",
  acreditado_colaborador: "",
  empresa_colaborador: "",
});


// const crearColaborador = () => ({
//   id: crypto.randomUUID(),
//   rut: "",
//   acreditado_colaborador: "",
//   cargo_colaborador: "",
//   empresa_colaborador: "",
//   observaciones_colaborador: "",
// });


export function ReporteTemplate() {
  const [template, setTemplate] = useState(null);
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hallazgos, setHallazgos] = useState([crearHallazgo()]);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [columnas, setColumnas] = useState([]);
  const [modo, setModo] = useState("crear");
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
  const [colaboradores, setColaboradores] = useState([
  crearColaborador(),
]);


  // const [colaborador, setColaborador] = useState([crearColaborador()]);

  const [search, setSearch] = useState("");

  const [visibleColumns, setVisibleColumns] = useState({
  reporte_id: true,
  username: true,
  record_number: true,
  tipo_obra: true,
  codigo_obra: true,
  fecha_ids: true,
  hora_ids: true,
  division: true,
  hora_inicio_faena: true,
  hora_termino_faena: true,
  auditoria_inicio: true,
  rut_empresa: true,
  nombre_empresa: true,
  region: true,
  zona: true,
  delegacion: true,
  direccion: true,
  geo_latitud: true,
  geo_longitud: true,
  geo_altitud: true,
  tipo_actividad: true,
  sociedad_cge: true,
  emergencia: true,
  ids_efectiva: true,
  descripcion_actividad: true,
  ids_con_hallazgo: true,
  run_responsable: true,
  nombre_responsable: true,
  acreditado: true,
  cargo_acreditado: true,
  empresa_acreditadora: true,
  fuerza_de_trabajo: true,
  
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
    rut: "",
    nombre: "",
    acreditado: "",
    cargo: "",
    empresa_acreditadora: "",
    fuerza_de_trabajo: "",
  });

  const [actividadData, setActividadData] = useState({
    tipo_actividad: "",
    sociedad_cge: "",
    emergencia: "",
    ids_efectiva: "",
    descripcion_actividad: "",
    ids_con_hallazgo: "",
  });

  const [ubicacionData, setUbicacionData] = useState({
    region: "",
    zona: "",
    delegacion: "",
    direccion: "",
    geo_latitud: "",
    geo_longitud: "",
    geo_altitud: "0",
  });
  
  

  {/**const [_Data, set_Data] = useState({
    __: "",
    __: "",
  }); */}
  
  

  async function cargarUsuarioActual() {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user) return;

    const { data } = await supabase
      .from("profiles")
      .select("id, email, nombre, username, rol")
      .eq("id", auth.user.id)
      .single();

    setUser(data);
  }

  useEffect(() => {
    obtenerTemplate();
    obtenerReportes();
    cargarUsuarioActual();
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
      .from("v_registro_completo2")
      .select("*")
      .order("record_number", { ascending: true });
      
      if (!error) setReportes(data);
      setLoading(false);
    }

    const reportesFiltrados = !user
  ? []
  : reportes
      .filter((r) => {
        if (user.rol === "admin") return true;

        return r.username === user.username;
      })

      .filter((r) => {
        if (!search) return true;

        return Object.values(r)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });



  async function handleSubmit(e) {
    e.preventDefault();
    if (!template) return;

    try {
      const { data: reporte, error: reporteError } = await supabase
        .from("forms_ids_2026")
        .insert([
          {
            form_id: template.id,
            username: user.username,
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
              descripcion_actividad: actividadData.descripcion_actividad || null,
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

    if (template.antecedentes_colaboradores) {
  const colaboradoresValidos = colaboradores.filter(
    c => c.rut_colaborador && c.rut_colaborador.trim() !== ""
  );

  if (colaboradoresValidos.length > 0) {
    const { error } = await supabase
      .from("colaboradores_ids")
      .insert(
        colaboradoresValidos.map(c => ({
          reporte_id: reporte.id,
          rut_colaborador: c.rut_colaborador,
          nombre_colaborador: c.nombre_colaborador,
          cargo_colaborador: c.cargo_colaborador,
          acreditado_colaborador: c.acreditado_colaborador,
          empresa_colaborador: c.empresa_colaborador
        }))
      );

    if (error) throw error;
  }
}



      setOpen(false);
      setObraData({ tipo_obra: "", codigo_obra: "" });
      setInspeccionData({ fecha_ids: "", hora_ids: "", division: "" , hora_inicio_faena: "" , hora_termino_faena: "" , auditoria_inicio: "" });
      setEmpresaData({ rut_empresa: "",
    nombre_empresa: "",});
      setFaenaData({ rut: "",
    nombre: "",
    acreditado: "",
    cargo: "",
    empresa_acreditadora: "",
    fuerza_de_trabajo: "",});
      setActividadData({ tipo_actividad: "",
    sociedad_cge: "",
    emergencia: "",
    ids_efectiva: "",
    descripcion_actividad: "",
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

    setColaboradores([{
      rut_colaborador:"",
      nombre_colaborador:"",
      cargo_colaborador:"",
      acreditado_colaborador:"",
      empresa_colaborador:"",
    }])

    // setColaborador({ rut: "",
    //   acreditado_colaborador: "",
    //   cargo_colaborador: "",
    //   empresa_colaborador: "",
    //   observaciones_colaborador: "",});

      
      {/**AQUIIIIIII PONEEER INFOOOOOOO */}

      

    } catch (err) {
      console.error("Error al guardar reporte:", err);
    }
  }

function renderCell(value) {
  if (value === null || value === undefined) return "-";

  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  if (Array.isArray(value)) {
    return `${value.length} ítems`;
  }

  if (typeof value === "object") {
    return "Ver detalle";
  }

  return "-";
}


useEffect(() => {
  if (reportes.length > 0) {
    const keys = Object.keys(reportes[0]);
    setColumnas(keys);
  }
}, [reportes]);


const columnasVisibles = columnas.filter(
  col => visibleColumns[col] !== false
);


  return (
    <Container>
      <MainContent>
        {(!template || loading) ? (
          <PageLoader>
            <Spinner />
            <LoaderText>Cargando...</LoaderText>
          </PageLoader>
        ) : (
          <>
      
      <TableSection>
  <TableHeader>
  <TitleGroup>
    <h2>Reportes</h2>
    <span>Listado general de inspecciones</span>
  </TitleGroup>

  <div className="pos-excel">
    <Btnexcel />
  </div>
  
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
            <th>Status</th>
            <th>PDF</th>
            {columnasVisibles.map(col => (
              <th key={col}>
                {col.replace(/_/g, " ")}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
  {reportesFiltrados.map((r) => (
    <tr key={r.record_number}>
      <td><BtnCierreReporte/></td>
      <td>
        <BtnPdfReporte reporteId={r.reporte_id} />
      </td>
      {columnasVisibles.map(col => (
        <td key={`${r.record_number}-${col}`}>
        {renderCell(r[col])}
      </td>

      ))}
      
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

            {/* Render dinámico según template */}
            {Object.keys(componentMap).map((key, index) => {
              if (!template[key]) return null;

              if (
                key === "antecedentes_hallazgos" &&
                actividadData?.ids_con_hallazgo !== "Si"
              ) {
                return null;
              }

              const Component = componentMap[key];

              const titles = {
                antecedentes_obra: "Antecedentes de la Obra",
                antecedentes_inspeccion: "Antecedentes de Inspección",
                antecedentes_empresa: "Antecedentes de la Empresa",
                antecedentes_responsable_faena:
                  "Antecedentes del Responsable de Faena y/o Actividad",
                antecedentes_actividad: "Antecedentes de Actividad",
                antecedentes_ubicacion: "Antecedentes de Ubicación",
                antecedentes_hallazgos: "Antecedentes de Hallazgos",
                antecedentes_colaboradores: "Antecedentes de Colaboradores",
              };

              return (
                <FormSection
                  key={key}
                  title={titles[key]}
                  index={index}
                  defaultOpen={index === 0}
                >
                  <Component
                    {...(key === "antecedentes_hallazgos"
                      ? {
                          hallazgos,
                          setHallazgos,
                        }
                      : key === "antecedentes_colaboradores"
                      ? {
                          colaboradores,
                          setColaboradores,
                        }
                      : {
                          data:
                            key === "antecedentes_obra"
                              ? obraData
                              : key === "antecedentes_inspeccion"
                              ? inspeccionData
                              : key === "antecedentes_empresa"
                              ? empresaData
                              : key === "antecedentes_responsable_faena"
                              ? faenaData
                              : key === "antecedentes_actividad"
                              ? actividadData
                              : ubicacionData,
                          setData:
                            key === "antecedentes_obra"
                              ? setObraData
                              : key === "antecedentes_inspeccion"
                              ? setInspeccionData
                              : key === "antecedentes_empresa"
                              ? setEmpresaData
                              : key === "antecedentes_responsable_faena"
                              ? setFaenaData
                              : key === "antecedentes_actividad"
                              ? setActividadData
                              : setUbicacionData,
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
          </>
        )}
      </MainContent>
    </Container>
  );
}


const Container = styled.div`
  min-height: 100vh;
  background: #ffffff;
  font-family: "Poppins", sans-serif;
  overflow-x: hidden; 
  max-width: 100%;

  @media (max-width: 1024px) {
    padding-left: 0;
  }

  .btn-crear {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 100;

    
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

  .pos-excel{
    @media (max-width: 1900px) {
    margin-right: 200px;
  }
  }

  @media (max-width: 1024px) {
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

     @media (max-width: 768px) {
    .modal {
      max-width: 100%;
      height: 100vh;
      max-height: 100vh;
      border-radius: 0;
      padding: 20px;
    }
  }

  @media (max-width: 480px) {
    .modal {
      padding: 16px;
    }
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

  @media (max-width: 768px) {
      max-width: 100%;
      height: 100vh;
      border-radius: 0;
      padding: 20px;
    }

    @media (max-width: 480px) {
      padding: 16px;
    }
  }
}

`;

const TableWrapper = styled.div`
  padding: 30px;
  width: 100%;
  max-width:1600px;
  max-height: 600px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  table {
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

  td:first-child {
    font-family: monospace;
    font-size: 0.8rem;
    color: #475569;
    max-width: 160px;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

   @media (max-width: 1024px) {
    table {
      font-size: 0.85rem;
    }
  }

  @media (max-width: 768px) {
    padding: 10px;
    table {
      font-size: 0.8rem;
      min-width: 500px;
    }
  }

  @media (max-width: 480px) {
    table {
      font-size: 0.75rem;
      min-width: 400px;
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

    @media (max-width: 1900px) {

      margin-right:200px;
    }
  }

  .menu {
  position: absolute;
  top: 120%;          
  right: 0;           

  min-width: 220px;
  max-width: calc(100vw - 24px);

  background: white;
  border-radius: 14px;
  padding: 12px;

  box-shadow: 0 10px 30px rgba(0,0,0,.15);
  z-index: 100;

  overflow-y: auto;
  max-height: 400px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  transform: translateX(0);

  @media (max-width: 1900px) {

      margin-right:200px;
    }
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
    gap: 10px;
  }
`;


const PageLoader = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  background: #ffffff;
`;

const Spinner = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 4px solid rgba(21, 228, 124, 0.25);
  border-top-color: #15e47c;
  animation: spin 0.9s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoaderText = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #64748b;
  letter-spacing: 0.02em;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 30px;
  position: relative;
  max-width: 100vw;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;



