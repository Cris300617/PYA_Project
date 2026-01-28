import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Sidebar } from "../../../index";

export function DashboardLayout() {
  return (
    <Layout>
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  background: #ffffff;
`;
