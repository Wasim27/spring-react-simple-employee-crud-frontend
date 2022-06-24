import React, { useState } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";

const AppNavbar = () => {
  function refreshPage() {
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }

  const [isOpen, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand onClick={refreshPage} tag={Link} to="/">
        Home
      </NavbarBrand>
    </Navbar>
  );
};

export default AppNavbar;
