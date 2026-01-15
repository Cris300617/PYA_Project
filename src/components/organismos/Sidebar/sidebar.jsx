import styled from "styled-components";
import { Icon } from "@iconify/react";
import image from "./pya.png";
import { useAuth } from "../../../index";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";



export function Sidebar() {
const {cerrarSesion} = useAuth();
const navigate = useNavigate();

const handleClick = () =>{
  navigate('/reporte')
}


  return (
    <SidebarContainer>
      <Menu>
        <img src={image} alt="logo" className="logo"/>
        <Item to="/">
          <Icon icon="solar:home-2-outline" />
          <span>Inicio</span>
        </Item>

        <Item to="/formulario">
            <Icon icon="solar:chart-outline" />
            <span>Formularios</span>
        
        </Item>

        <Item to= "/reporte">
          <Icon icon="solar:pulse-outline" />
          <span>Reportes</span>
        </Item>

        <Item to= "/dates">
          <Icon icon="solar:settings-outline" />
          <span>Datos</span>
        </Item>

        <Item to= "/activity">
          <Icon icon="solar:bell-outline" />
          <span>Notificaciones</span>
        </Item>


      </Menu>
        <Item to="/login" className="out" onClick={cerrarSesion}>
          <Icon icon="solar:skip-previous-outline" />
          <span>Cerrar Sesion</span>
        </Item>
    </SidebarContainer>
  );
}


const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 72px;
  background: linear-gradient(180deg, #0f2027, #203a43);
  overflow: hidden;
  transition: width 0.35s ease, box-shadow 0.35s ease;
  z-index: 100;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  box-shadow: none;

  &:hover {
    width: 220px;
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    box-shadow: 8px 0 25px rgba(0, 0, 0, 0.45);
  }

  &:hover span {
    opacity: 1;
    transform: translateX(0);
  }
.out{
    margin-top: 460px;
  }
  .logo {
  position: flex;
  top: 20px;
  display: fixed;
  justify-content: center;
  width: 400px;
  max-width: 100%;
  margin-bottom: 20px;
}
`;


const Menu = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
`;

const Item = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 22px;
  color: #cfd8dc;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;

  transition: background 0.25s ease, color 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50px;
    color: #4ac8a5;
  }

  svg {
    font-size: 22px;
    min-width: 22px;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
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
