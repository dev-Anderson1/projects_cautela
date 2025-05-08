import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import { FC, ReactNode } from "react";
import { Container, SidebarContainer, ContentWrapper, NavbarContainer, Content, LayoutContainer } from "./styles";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
    <Container>
      {/* Sidebar fixa */}
      <SidebarContainer>
      <Sidebar />
      </SidebarContainer>

      {/* Área da Navbar + Conteúdo Principal */}
      <ContentWrapper>
        {/* Navbar fixa no topo */}
        <NavbarContainer>
          <Navbar />
        </NavbarContainer>

        {/* Conteúdo principal (páginas) */}
        <Content>{children}</Content>
      </ContentWrapper>
    </Container>
    </LayoutContainer>
  );
};

export default Layout;
