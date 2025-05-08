import styled from 'styled-components';

export const NavbarContainer = styled.header`
  height: 60px; /* Altura fixa da Navbar */
  background-color: #222;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  flex-shrink: 0; /* Evita que a navbar diminua */
  justify-content: flex-start; /* Garante que o conteúdo será alinhado à esquerda */
`;

export const Menu = styled.div`
  display: flex;
  gap: 20px;
  margin-left: 0; /* Garantir que o menu não tenha margens adicionais */
  justify-content: flex-start;
`;

export const MenuItem = styled.a`
  color: white;
  text-decoration: none;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: #0070f3;
  }
`;
