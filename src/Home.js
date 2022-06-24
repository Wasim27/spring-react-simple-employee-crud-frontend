import React, { Component } from "react";
import "./App.css";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";

const Home = () => {
  function refreshPage() {
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }

  return (
    <div>
      <AppNavbar />
      <Container fluid>
        <Button color="link">
          <Link to="/employees" onClick={refreshPage}>
            Employees
          </Link>
        </Button>
      </Container>
    </div>
  );
};

export default Home;
