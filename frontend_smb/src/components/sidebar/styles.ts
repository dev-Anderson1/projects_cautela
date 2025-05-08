import styled from "styled-components";

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 250px;
  height: 100vh;
  background-color: #333;
  color: white;
  padding: 20px;
  align-items: center;
`;

export const Logo = styled.img`
  width: 100%;
  margin-bottom: 20px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid white;
  }

  p {
    font-size: 16px;
    font-weight: bold;
  }
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
   text-decoration: none;
`;

export const MenuItem = styled.a`
  margin: 15px 0;
  font-size: 18px;
  text-decoration: none;
  color: white;
  cursor: pointer;
 

  &:hover {
    color: #0070f3;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 15px; /* Espaçamento entre os itens */
  width: 100%;
  
`;

export const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 15px;
 
  padding: 10px;
  border-radius: 5px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
