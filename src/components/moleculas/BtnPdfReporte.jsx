import styled from "styled-components";
import { FaFilePdf } from "react-icons/fa";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { supabase } from "../../supabase/supabase.config";
import image from "./pya.png";

export function BtnPdfReporte({ reporteId }) {
  const generarPDF = async () => {
    if (!reporteId) return;

    const { data, error } = await supabase
      .from("v_registro_completo2")
      .select("*")
      .eq("reporte_id", reporteId)
      .single();

    if (error || !data) {
      console.error("Error cargando datos PDF", error);
      return;
    }

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();


    const imgWidth = 60;
    const imgHeight = 20;
    const imgX = 14;
    const imgY = 10;

    pdf.addImage(image, "PNG", imgX, imgY, imgWidth, imgHeight);

    const spaceAfterImage = 10;
    const titleY = imgY + imgHeight + spaceAfterImage;

    pdf.setFontSize(16);
    pdf.text("Reporte de Inspección", pageWidth / 2, titleY, {
      align: "center",
    });

    pdf.setFontSize(11);
    pdf.text(
      `Número de Registro: ${data.record_number}`,
      14,
      titleY + 10
    );

    let currentY = titleY + 20;


    const addSectionTitle = (title) => {
      if (currentY + 15 > pageHeight) {
        pdf.addPage();
        currentY = 20;
      }

      pdf.setFontSize(18);
      pdf.text(title, pageWidth / 2, currentY, { align: "center" });
      currentY += 6;
    };

    const tableConfig = {
      styles: { fontSize: 9 },
      columnStyles: { 0: { fontStyle: "bold" } },
      headStyles: { fillColor: [28, 87, 110] },
    };


    addSectionTitle("Antecedentes de Inspección");
    autoTable(pdf, {
      startY: currentY,
      head: [["Campo", "Valor"]],
      body: [
        ["Fecha IDS", data.fecha_ids],
        ["Hora IDS", data.hora_ids],
        ["División", data.division],
        ["Hora inicio faena", data.hora_inicio_faena],
        ["Hora término faena", data.hora_termino_faena],
        ["Auditoría de inicio", data.auditoria_inicio],
      ],
      ...tableConfig,
    });

    currentY = pdf.lastAutoTable.finalY + 16;

    addSectionTitle("Antecedentes de Ubicación");
    autoTable(pdf, {
      startY: currentY,
      head: [["Campo", "Valor"]],
      body: [
        ["Región", data.region],
        ["Zona", data.zona],
        ["Delegación", data.delegacion],
        ["Dirección", data.direccion],
        ["Latitud", data.geo_latitud],
        ["Longitud", data.geo_longitud],
        ["Altitud", data.geo_altitud],
      ],
      ...tableConfig,
    });

    currentY = pdf.lastAutoTable.finalY + 16;

    addSectionTitle("Antecedentes de Obra");
    autoTable(pdf, {
      startY: currentY,
      head: [["Campo", "Valor"]],
      body: [
        ["Tipo de obra", data.tipo_obra],
        ["Código de obra", data.codigo_obra],
      ],
      ...tableConfig,
    });

    currentY = pdf.lastAutoTable.finalY + 16;

    addSectionTitle("Antecedentes de Empresa");
    autoTable(pdf, {
      startY: currentY,
      head: [["Campo", "Valor"]],
      body: [
        ["RUT empresa", data.rut_empresa],
        ["Nombre empresa", data.nombre_empresa],
      ],
      ...tableConfig,
    });

    currentY = pdf.lastAutoTable.finalY + 16;

    addSectionTitle("Responsable Faena y/o Actividad");
    autoTable(pdf, {
      startY: currentY,
      head: [["Campo", "Valor"]],
      body: [
        ["RUT responsable", data.run_responsable],
        ["Nombre responsable", data.nombre_responsable],
        ["Persona acreditada", data.acreditado],
        ["Cargo", data.cargo_acreditado],
        ["Empresa acreditadora", data.empresa_acreditadora],
        ["Fuerza de trabajo", data.fuerza_de_trabajo],
      ],
      ...tableConfig,
    });

    currentY = pdf.lastAutoTable.finalY + 16;

    if (data.colaboradores?.length) {
      addSectionTitle("Colaboradores");
      autoTable(pdf, {
        startY: currentY,
        head: [["RUT", "Nombre", "Cargo", "Empresa", "ID"]],
        body: data.colaboradores.map((c) => [
          c.rut_colaborador,
          c.nombre_colaborador,
          c.cargo_colaborador,
          c.empresa_colaborador,
          c.correlativo,
        ]),
        styles: { fontSize: 9 },
        headStyles: { fillColor: [28, 87, 110] },
      });

      currentY = pdf.lastAutoTable.finalY + 16;
    }

    addSectionTitle("Antecedentes de Actividad");
    autoTable(pdf, {
      startY: currentY,
      head: [["Campo", "Valor"]],
      body: [
        ["Tipo de actividad", data.tipo_actividad],
        ["CGE", data.sociedad_cge],
        ["Emergencia", data.emergencia],
        ["IDS efectiva", data.ids_efectiva],
        ["Descripción", data.descripcion_actividad],
        ["IDS con hallazgos", data.ids_con_hallazgo],
      ],
      ...tableConfig,
    });

    currentY = pdf.lastAutoTable.finalY + 16;

    if (data.hallazgos?.length) {
      addSectionTitle("Hallazgos");
      autoTable(pdf, {
        startY: currentY,
        head: [["Descripción", "Estado", "Clasificación", "ID"]],
        body: data.hallazgos.map((h) => [
          h.descripcion,
          h.estado,
          h.clasificacion,
          h.correlativo,
        ]),
        styles: { fontSize: 9 },
        headStyles: { fillColor: [28, 87, 110] },
      });
    }

    pdf.save(`reporte_${data.reporte_id}.pdf`);
  };

  return (
    <PdfButton onClick={generarPDF}>
      <FaFilePdf size={18} />
    </PdfButton>
  );
}


const PdfButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;

  background: linear-gradient(135deg, #b91c1c, #ef4444);
  color: #ffffff;

  border: none;
  border-radius: 10px;
  padding: 10px 18px;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
  transition: all 0.25s ease;

  &:hover {
    background: linear-gradient(135deg, #dc2626, #f87171);
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.97);
  }

  svg {
    color: #fee2e2;
  }
`;
