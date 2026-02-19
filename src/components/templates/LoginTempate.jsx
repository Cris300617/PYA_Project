import { useState } from "react";
import styled from "styled-components";
import { Btnsave, Footer, Linea, Title, useAuth, v } from "../../index";
import { InputText2 } from "../../index";
import { Device } from "../../styles/breakpoints";
import image from "../../assets/pya.png";
import { useNavigate } from "react-router-dom";

export function LoginTemplate() {
  const { loginGoogle, loginUsernamePassword } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUsernamePassword(username, password);
      navigate("/"); 
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setLoading(true);
    try {
      await loginGoogle();
      navigate("/"); 
    } catch (err) {
      setError(err.message || "Error al iniciar sesión con Google");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <div className="logo">
        <img src={image} alt="logo" />
      </div>

      <div className="card">
        <Title>
          Ingresar a <span className="span">D-Project</span>
        </Title>

        <form onSubmit={handleLogin}>
          <InputText2>
            <input
              className="form__field"
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputText2>

          <InputText2>
            <input
              className="form__field"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputText2>

          {error && <ErrorMsg>{error}</ErrorMsg>}

          <Btnsave
            type="submit" 
            titulo={loading ? "Ingresando..." : "INGRESAR"}
            width="100%"
            disabled={loading}
          />
        </form>

        <Linea>
          <span>o</span>
        </Linea>

        <Btnsave
          funcion={handleGoogleLogin}
          titulo="Google"
          bgcolor="#fff"
          icono={<v.iconogoogle />}
        />
      </div>

      <Footer />
    </Container>
  );
}


const Container = styled.div`
  height: 100vh;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;

  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    margin: 18px;
  }

  .span {
    color: #00ffc3;
  }

  .logo {
    position: absolute;
    top: 20px;
    display: flex;
    justify-content: center;
    width: 400px;
    max-width: 100%;

    img {
      width: 100%;
      object-fit: contain;
    }
  }

  @media ${Device.mobile} {
    .card {
      max-width: 240px;
    }
  }

  @media ${Device.tablet} {
    .card {
      max-width: 420px;
    }
  }
`;

const ErrorMsg = styled.p`
  color: #dc2626;
  font-size: 0.85rem;
  margin-top: 6px;
  text-align: left;
`;
