import styled from 'styled-components';

export const LayoutContainer = styled.div`
 body{
 margin:0
 }
`;


export const Container = styled.div`
  display: flex;
  height: 100vh; /* Ocupa toda a altura da tela */
  margin:0;

`;

export const SidebarContainer = styled.aside`
  width: 250px; /* Largura fixa da Sidebar */
  background-color: #333;
  color: white;
  padding: 20px;
  flex-shrink: 0; /* Evita que a sidebar diminua */
  display:flex;
  
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Ocupa o restante do espaço */
`;

export const NavbarContainer = styled.header`
  height: 60px; /* Altura fixa da Navbar */
  background-color: #222;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  flex-shrink: 0; /* Evita que a navbar diminua */
  justify-content:end;
`;

export const Content = styled.main`
  flex-grow: 1; /* Ocupa o espaço restante */
  padding: 20px;
  background-color: #f4f4f4;
  overflow-y: auto; /* Permite rolagem no conteúdo */
`;
export const Sidebar = styled.div`
  flex-grow: 1; /* Ocupa o espaço restante */
  padding: 20px;
  background-color: #f4f4f4;
  overflow-y: auto; /* Permite rolagem no conteúdo */

  display:flex;
  flex-direction: column;
  gap: 20pz;
`;
export const Logo = styled.div`
 
`;


