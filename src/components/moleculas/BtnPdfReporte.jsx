import styled from "styled-components";
import { FaFilePdf } from "react-icons/fa";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { supabase } from "../../supabase/supabase.config";

export function BtnPdfReporte({ reporteId }) {

  const generarPDF = async () => {
    if (!reporteId) return;

    const { data, error } = await supabase
      .from("v_registro_completo") 
      .select("*")
      .eq("reporte_id", reporteId)
      .single();

    if (error || !data) {
      console.error("Error cargando datos PDF", error);
      return;
    }

    const pdf = new jsPDF("p", "mm", "a4");

    pdf.setFontSize(16);
    pdf.text("Reporte de Inspección", 14, 18);

    pdf.setFontSize(11);
    pdf.text(`Numero de Registro: ${data.record_number}`, 14, 28);

    autoTable(pdf, {
      startY: 36,
      head: [["Campo", "Valor"]],
      body: [
        ["Tipo Obra", data.tipo_obra],
        ["Código Obra", data.codigo_obra],
        ["Fecha IDS", data.fecha_ids],
        ["Empresa", data.nombre_empresa],
        ["Región", data.region],
        ["Actividad", data.tipo_actividad],
        ["Responsable", data.nombre_responsable],
      ],
      styles: { fontSize: 9 },
      headStyles: { fillColor: [28, 87, 110] },
    });

    if (data.hallazgos?.length) {
      autoTable(pdf, {
        startY: pdf.lastAutoTable.finalY + 8,
        head: [["Descripción", "Estado", "Clasificación", "ID de Hallazgo"]],
        body: data.hallazgos.map(h => [
          h.descripcion,
          h.estado,
          h.clasificacion,
          h.correlativo,
        ]),
        styles: { fontSize: 8 },
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

  @media (max-width: 640px) {
    padding: 12px;
    .label {
      display: none;
    }
  }
`;
