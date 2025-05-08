import { SidebarContainer, UserInfo, Logo, Nav, NavLink } from './styles';
import Link from 'next/link';

interface SidebarProps {
  user: { name: string; avatar: string } | null;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  return (
    <SidebarContainer>
      <Logo src="/logo.png" alt="Logo da Empresa" /> {/* Logo fixa */}

      {user && (
        <UserInfo>
          <img src={user.avatar} alt={user.name} />
          <p>{user.name}</p>
        </UserInfo>
      )}

      <Nav>
        <Link href="/users" passHref legacyBehavior>
          <NavLink>Usuários</NavLink>
        </Link>
        <Link href="/cautela" passHref legacyBehavior>
          <NavLink>Cautela</NavLink>
        </Link>
        <Link href="/settings" passHref legacyBehavior>
          <NavLink>Configurações</NavLink>
        </Link>
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar;
