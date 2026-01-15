import styled from "styled-components";
import { AntecedentesObra } from "../../../index";

export function FormularioDinamico({ config, onClose }) {

  if (!config) return null;

  return (
    <Modal>
      <div className="modal">
        <h3>{config.form}</h3>

        {config.antecedentes_obra && <AntecedentesObra />}

        <button onClick={onClose}>Cerrar</button>
      </div>
    </Modal>
  );
}

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;

  .modal {
    background: white;
    padding: 30px;
    border-radius: 16px;
    width: 600px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;
