import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

const NavBar = () => {
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Secure cloud storage</NavbarBrand>
      </Navbar>
    </div>
  );
};

export default NavBar;
