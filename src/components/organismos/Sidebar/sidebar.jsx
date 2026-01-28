import styled from "styled-components";
import { Icon } from "@iconify/react";
import image from "./pya.png";
import { useAuth } from "../../../index";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";



export function Sidebar() {
  const { cerrarSesion } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Hamburger onClick={() => setOpen(o => !o)}>
        <Icon icon="solar:hamburger-menu-outline" />
      </Hamburger>

      <Overlay $open={open} onClick={() => setOpen(false)} />

      <SidebarContainer $open={open}>
        <Top>
          <img src={image} alt="logo" className="logo" />

          <Menu>
            <Item to="/" onClick={() => setOpen(false)}>
              <Icon icon="solar:home-2-outline" />
              <span>Inicio</span>
            </Item>

            <Item to="/formulario" onClick={() => setOpen(false)}>
              <Icon icon="solar:chart-outline" />
              <span>Formularios</span>
            </Item>

            <Item to="/reporte" onClick={() => setOpen(false)}>
              <Icon icon="solar:pulse-outline" />
              <span>Reportes</span>
            </Item>

            <Item to="/profile" onClick={() => setOpen(false)}>
              <Icon icon="tabler:user-circle" />
              <span>Perfil</span>
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
    </>
  );
}



const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: linear-gradient(180deg, #0f2027, #203a43);
  z-index: 120;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 0.3s ease, transform 0.3s ease;

  width: 72px;
  
  span{
    opacity:0;
  }

  &:hover {
    width: 220px;
  }

  &:hover span {
    opacity: 1;
    transform: translateX(0);
  }

  @media (max-width: 768px) {
    width: 240px;
    transform: ${({ $open }) =>
      $open ? "translateX(0)" : "translateX(-100%)"};

    &:hover {
      width: 240px;
    }

    span {
      opacity: ${({ $open }) => ($open ? 1 : 0)};
      transform: ${({ $open }) =>
        $open ? "translateX(0)" : "translateX(-100px)"};
    }
  }
`;




const Hamburger = styled.button`
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 200;
  background: #0f2027;
  border: none;
  color: white;
  border-radius: 10px;
  padding: 10px;
  display: none;

  svg {
    font-size: 24px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;


const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 110;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.3s ease;

  @media (min-width: 769px) {
    display: none;
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

  @media (max-width: 768px){
    
  }
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

  &:hover span {
    opacity: 1;
    transform: translateX(-10px);
    transition: all 0.25s ease;
  }

  &.active {
    background: rgba(74, 200, 165, 0.18);
    color: #4ac8a5;
  }
`;

