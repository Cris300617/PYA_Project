import styled from "styled-components";
import { FcApproval, FcUpload, FcPrivacy } from "react-icons/fc";

export function BtnCierreReporte({ onClick, estado = "abierto" }) {
  const config = {
    abierto: {
      label: "Editar",
      icon: <FcUpload size={18} />,
    },
    cerrado: {
      label: "Cerrado",
      icon: <FcApproval size={18} />,
    },
    ris: {
      label: "RIS",
      icon: <FcPrivacy size={18} />,
    },
  };

  const { label, icon } = config[estado] || config.abierto;

  return (
    <BtnCierre onClick={onClick} estado={estado}>
      {icon}
      {label}
    </BtnCierre>
  );
}


const BtnCierre = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;

  color: #2684db;

  border: none;
  border-radius: 10px;
  padding: 10px 18px;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
  transition: all 0.25s ease;

  &:hover {
    background: linear-gradient(135deg, #26dc6c, #71f888);
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
