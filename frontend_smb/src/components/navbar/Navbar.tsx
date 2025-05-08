// components/Navbar.tsx
import { NavbarContainer, Menu, MenuItem } from './styles';

const Navbar = () => {
  return (
    <NavbarContainer>
      <Menu>
        <MenuItem>Logo</MenuItem>
        <MenuItem>Menu</MenuItem>
      </Menu>
    </NavbarContainer>
  );
};

export default Navbar;
