import styled from "styled-components";
import { Icon } from "@iconify/react";
import image from "./pya.png";
import { useAuth } from "../../../index";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";



export function Sidebar() {
  const { cerrarSesion } = useAuth();

  return (
    <SidebarContainer>
      <Top>
        <img src={image} alt="logo" className="logo" />

        <Menu>
          <Item to="/">
            <Icon icon="solar:home-2-outline" />
            <span>Inicio</span>
          </Item>

          <Item to="/formulario">
            <Icon icon="solar:chart-outline" />
            <span>Formularios</span>
          </Item>

          <Item to="/reporte">
            <Icon icon="solar:pulse-outline" />
            <span>Reportes</span>
          </Item>

          <Item to="/dates">
            <Icon icon="solar:settings-outline" />
            <span>Datos</span>
          </Item>

          <Item to="/activity">
            <Icon icon="solar:bell-outline" />
            <span>Notificaciones</span>
          </Item>
        </Menu>
      </Top>

      <Bottom>
        <Item to="/login" onClick={cerrarSesion}>
          <Icon icon="solar:skip-previous-outline" />
          <span>Cerrar Sesión</span>
        </Item>
      </Bottom>
    </SidebarContainer>
  );
}



const SidebarContainer = styled.aside`
  position: fixed;
  inset: 0 auto 0 0;
  width: 72px;
  height: 100vh;

  background: linear-gradient(180deg, #0f2027, #203a43);
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  overflow: hidden;
  z-index: 100;

  transition: width 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    width: 220px;
    box-shadow: 8px 0 25px rgba(0, 0, 0, 0.45);
  }

  &:hover span {
    opacity: 1;
    transform: translateX(0);
  }

  /* 📱 MOBILE */
  @media (max-width: 768px) {
    width: 64px;

    &:hover {
      width: 180px;
    }
  }

  .logo {
  width: 100%;
  max-width: 160px;
  align-self: center;
}
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 20px;
`;

const Bottom = styled.div`
  padding-bottom: 20px;
`;





const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;


const Item = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 22px;

  color: #cfd8dc;
  text-decoration: none;
  white-space: nowrap;

  transition: background 0.25s ease, color 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50px;
    color: #4ac8a5;
  }

  svg {
    font-size: 22px;
    min-width: 22px;
  }

  span {
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.25s ease;
  }

  &.active {
    background: rgba(74, 200, 165, 0.18);
    color: #4ac8a5;
  }
`;

