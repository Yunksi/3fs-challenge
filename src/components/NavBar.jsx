import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <Link
          to="/"
          style={{ color: 'white', textDecoration: 'none', fontSize: '1.5em' }}
        >
          Secure cloud storage
        </Link>
      </Navbar>
    </div>
  );
};

export default NavBar;
