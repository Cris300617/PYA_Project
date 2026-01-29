import styled from "styled-components";
import image from "./grafico.png";
import image2 from "./grafico2.png";
import image3 from "./form.png";
import { Sidebar, useAuth } from "../../index";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";


export function HomeTemplate() {
  return (
    <Container>
      
      <section className="header-home">
        Bienvenido a <span>D-Project</span>
      </section>

      <section className="box-home">
        <div className="table-home">
          <h2>¿Sabes lo que puedes hacer con "D-Project"?</h2>
          <p>
            Explora todas las funcionalidades, administra tus proyectos de forma
            eficiente y disfruta de un panel moderno y responsivo.
          </p>
        </div>
      </section>

      <section className="content-row">
        <Link to="/reporte" className="form-row">
          <Icon icon="majesticons:checkbox-list" className="card-icon" />
          <h2>Crea tus Informes</h2>
          <p>
            Nuestro sistema genera informes en tiempo real y los almacena en una base
            de datos segura y de alto rendimiento, garantizando integridad,
            trazabilidad y disponibilidad continua de la información.
          </p>
        </Link>

        <Link to="/profile" className="form-row">
          <Icon icon="majesticons:data-line" className="card-icon" />
          <h2>Control total de tus datos</h2>
          <p>
            Accede, organiza y supervisa toda tu información desde una plataforma
            centralizada, con total seguridad y disponibilidad en tiempo real para una
            toma de decisiones confiable.
          </p>
        </Link>

        <Link to="/exportar" className="form-row">
          <Icon icon="majesticons:folder-plus-line" className="card-icon" />
          <h2>Exporta en CSV y PDF</h2>
          <p>
            Exporta tus datos e informes en formatos CSV y PDF de forma rápida y
            sencilla, listos para análisis, auditorías o presentaciones.
          </p>
        </Link>
      </section>


    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background: #ffffff;
  font-family: 'Poppins', sans-serif;

  /* ================= HEADER ================= */
  .header-home {
    position: relative;
    margin-left: -72px;
    padding-left: 72px;
    width: calc(100% + 72px);

    background-color: rgb(236, 238, 248);
    color: #53eb67;
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    padding: 20px;
    letter-spacing: 1px;

    span {
      color: #00ffc3;
    }
  }

  /* Tablet y mobile: sidebar oculto */
  @media (max-width: 1024px) {
    .header-home {
      margin-left: 0;
      padding-left: 0;
      width: 100%;
      font-size: 1.6rem;
    }
  }

  @media (max-width: 480px) {
    .header-home {
      font-size: 1.35rem;
      padding: 16px;
    }
  }

  /* ================= HERO BOX ================= */
  .box-home {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    padding: 0 20px;
  }

  .table-home {
    background: rgba(35, 66, 107, 0.85);
    border-radius: 14px;
    padding: 30px 40px;
    width: 80%;
    max-width: 900px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    color: #fff;
    text-align: center;
  }

  @media (max-width: 768px) {
    .table-home {
      width: 100%;
      padding: 24px;
    }
  }

  /* ================= CARDS ================= */
  .content-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    margin: 60px 20px;
  }

  @media (max-width: 1024px) {
    .content-row {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .content-row {
      grid-template-columns: 1fr;
      margin: 40px 16px;
    }
  }

  .form-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    padding: 32px 28px;
    border-radius: 18px;

    background: #ffffff;
    color: #4a4a4a;
    text-decoration: none;

    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .form-row:hover {
    transform: translateY(-8px);
    box-shadow: 0 22px 45px rgba(0, 0, 0, 0.18);
  }

  .card-icon {
    font-size: 48px;
    color: #00b894;
    margin-bottom: 18px;
  }

  .form-row h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e2a3a;
    margin-bottom: 14px;
  }

  .form-row p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #5f6b7a;
  }

  @media (max-width: 480px) {
    .form-row {
      padding: 26px 22px;
    }

    .card-icon {
      font-size: 42px;
    }

    .form-row h2 {
      font-size: 1.15rem;
    }

    .form-row p {
      font-size: 0.9rem;
    }
  }
`;

