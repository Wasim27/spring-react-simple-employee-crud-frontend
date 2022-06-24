import React, { Component, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./AppNavbar";

const EmployeeEdit = (props) => {
  function refreshPage() {
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }
  let emptyItem = {
    name: "",
    email: "",
  };

  const [item, setItem] = useState(emptyItem);

  useEffect(() => {
    async function componentDidMount() {
      if (props.match.params.id !== "new") {
        const employee = await (
          await fetch(`/employees/${props.match.params.id}`)
        ).json();
        setItem(employee);
      }
    }
    componentDidMount();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(item.name);
    setItem({
      ...item,
      [name]: value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setItem(emptyItem);

    await fetch("/employees" + (item.id ? "/" + item.id : ""), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    props.history.push("/employees");
  }

  const title = <h2>{item.id ? "Edit Employee" : "Add Employee"}</h2>;

  return (
    <div>
      <AppNavbar />
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={item.name || ""}
              onChange={handleChange}
              autoComplete="name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="text"
              name="email"
              id="email"
              value={item.email || ""}
              onChange={handleChange}
              autoComplete="email"
            />
          </FormGroup>
          <FormGroup>
            <Button onClick={refreshPage} color="primary" type="submit">
              Save
            </Button>{" "}
            <Button
              onClick={refreshPage}
              color="secondary"
              tag={Link}
              to="/employees"
            >
              Cancel
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
};

export default withRouter(EmployeeEdit);
