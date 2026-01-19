import styled from "styled-components";
import * as XLSX from "xlsx";
import { useEffect, useState, useRef } from "react";
import {
  FaFileExcel,
  FaChartBar,
  FaHardHat,
  FaChevronDown,
} from "react-icons/fa";
import { supabase } from "../../supabase/supabase.config";

export function Btnexcel() {
  const [datasets, setDatasets] = useState({});
  const [vistaSeleccionada, setVistaSeleccionada] = useState("resumen");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    cargarDatasets();

    // cerrar dropdown al clickear fuera
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function cargarDatasets() {
    setLoading(true);

    const [resumen, obra] = await Promise.all([
      supabase.from("v_reportes_resumen").select("*"),
      supabase.from("v_antecedentes_obra").select("*"),
    ]);

    setDatasets({
      resumen: resumen.data || [],
      obra: obra.data || [],
    });

    setLoading(false);
  }

  const exportarExcel = () => {
    const data = datasets[vistaSeleccionada];
    if (!data || !data.length) return;

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, vistaSeleccionada);
    XLSX.writeFile(workbook, `export_${vistaSeleccionada}.xlsx`);
  };

  const opciones = {
    resumen: {
      label: "Reportes Resumen",
      icon: <FaChartBar size={14} />,
    },
    obra: {
      label: "Antecedentes de Obra",
      icon: <FaHardHat size={14} />,
    },
  };

  return (
    <Toolbar>
      {/* ===== Dropdown selector ===== */}
      <Dropdown ref={dropdownRef}>
        <DropdownButton onClick={() => setOpen(!open)}>
          <div className="label">
            {opciones[vistaSeleccionada].icon}
            {opciones[vistaSeleccionada].label}
          </div>
          <FaChevronDown
            size={12}
            className={open ? "rotate" : ""}
          />
        </DropdownButton>

        {open && (
          <DropdownMenu>
            {Object.entries(opciones).map(([key, opt]) => (
              <DropdownItem
                key={key}
                active={vistaSeleccionada === key}
                onClick={() => {
                  setVistaSeleccionada(key);
                  setOpen(false);
                }}
              >
                {opt.icon}
                {opt.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </Dropdown>

      {/* ===== Botón Excel ===== */}
      <ExcelButton
        onClick={exportarExcel}
        disabled={!datasets[vistaSeleccionada]?.length || loading}
      >
        <FaFileExcel size={18} />
        {loading ? "Cargando..." : "Exportar Excel"}
      </ExcelButton>
    </Toolbar>
  );
}





const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
`;

/* ===== Dropdown ===== */
const Dropdown = styled.div`
  position: relative;
`;

/* Botón principal */
const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  min-width: 220px;

  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;

  background: #ffffff;
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;

  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

  transition: all 0.2s ease;

  .label {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  svg.rotate {
    transform: rotate(180deg);
  }

  &:hover {
    border-color: #cbd5e1;
  }

  
`;

/* Menú desplegable */
const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;

  width: 100%;
  background: #ffffff;

  border-radius: 14px;
  border: 1px solid #e2e8f0;

  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: 50;
`;

/* Item */
const DropdownItem = styled.button`
  width: 100%;
  padding: 12px 14px;
  

  display: flex;
  align-items: center;
  gap: 10px;

  background: ${({ active }) =>
    active ? "#f0fdf4" : "transparent"};

  color: ${({ active }) =>
    active ? "#166534" : "#334155"};

  font-size: 13px;
  font-weight: 600;

  border: none;
  cursor: pointer;

  transition: background 0.15s ease;

  &:hover {
    background: #f8fafc;
  }

  svg {
    color: ${({ active }) =>
      active ? "#16a34a" : "#94a3b8"};
  }
`;

/* ===== Botón Excel ===== */
const ExcelButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  

  background: linear-gradient(135deg, #1d6f42, #107c41);
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
    background: linear-gradient(135deg, #218c50, #149454);
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
    box-shadow: none;
  }

  svg {
    color: #e6f4ea;
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
