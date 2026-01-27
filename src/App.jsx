import { GlobalStyles, useThemeStore } from "./index";
import { MyRoutes } from "./index";
import { Sidebar } from "./index";
import { Device } from "./index";
import styled, {ThemeProvider} from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContent";
import { useLocation } from "react-router-dom";
import { UserAuth} from "./index";
import {APIProvider} from '@vis.gl/react-google-maps';


function App() {
  const { themeStyle } = useThemeStore();

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
      <APIProvider apiKey="AIzaSyB3OUYw05EX3tc04tq4QFObvbIXuXwrI9c">
                <ThemeProvider theme={themeStyle}>
          <AuthContextProvider>
            

            {/*<Sidebar />*/}

            <Container>
              <section className="contentRouters">
                <MyRoutes />
              </section>
            </Container>

          </AuthContextProvider>
        </ThemeProvider>
      </APIProvider>

      </BrowserRouter>
    </>
  );
}


export default App;

const Container = styled.main`
  min-height: 100vh;
  overflow-x: hidden;
  

  .contentMenu {
    position: relative; 
    background-color: rgba(46, 216, 145, 0.5); 
    min-height: 100px;
  }

  .contentRouters {
    background-color: ${({ theme }) => theme.background};
    min-height: 100vh;
    //margin-left: 72px;
  }

  @media ${Device.desktop} {
    .contentRouters {
      margin-left: 72px;
    }
    .contentMenu { 
      display: none; }
  }

`;

