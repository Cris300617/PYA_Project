import styled from "styled-components";
import { Btnsave, Footer, Linea, Title, useAuth, v} from "../../index";
import { InputText2 } from "../../index";
import {Device} from "../../styles/breakpoints";
import image from "../../assets/pya.png";
export function LoginTemplate(){
    const {loginGoogle} = useAuth();
    return (
        <Container>
            <div className="logo">
                <img src={image} alt="logo" className="logo" />
            </div>
                <div className="card">
                    <Title>Ingresar a <span className="span">D-Project</span></Title>

                    <form>

                        <InputText2>
                            <input className="form__field" type="text" placeholder="Email"/>
                        </InputText2>

                        <InputText2>
                            <input className="form__field" type="password" placeholder="Password"/>
                        </InputText2>

                        <Btnsave titulo= "INGRESAR"  width= "100%"/>
                    </form>
                    <Linea>
                        <span>0</span>
                    </Linea>

                    <Btnsave funcion={loginGoogle}  titulo= "Google" bgcolor= "#fff" icono={<v.iconogoogle/>}/>

                </div>

                <Footer/>
            
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
        .card{
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
            width: 100%;
            margin: 18px;
            @media ${Device.tablet}{
                width: 400px;
            }
        }
        .span{
            color: #00ffc3;
        }
.logo {
  position: absolute;
  top: 20px;
  display: flex;
  justify-content: center;
  width: 400px;
  max-width: 100%;
}


`