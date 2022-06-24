import React, { Component, useState, useEffect } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";

const EmployeeList = () => {

  function refreshPage() {
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function componentDidMount() {
      const response = await fetch("/employees/");
      console.log(response)
      const body = await response.json();
      setEmployees(body);
    }
    componentDidMount();
  });

  const handleRemove = async (id) => {
    await fetch(`/employees/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedEmployees = [...employees].filter((e) => e.id !== id);
      setEmployees(updatedEmployees);
    });
  };

  const employeeList = () => {
    return employees.map((employee) => (
      <tr key={employee.id}>
        <td style={{ whiteSpace: "nowrap" }}>{employee.name}</td>
        <td>{employee.email}</td>
        <td>
          <ButtonGroup>
            <Button
              onClick={refreshPage}
              size="sm"
              color="primary"
              tag={Link}
              to={"/employees/" + employee.id}
            >
              Edit
            </Button>
            <Button
              size="sm"
              color="danger"
              onClick={() => handleRemove(employee.id)}
            >
              Delete
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <AppNavbar />
      <Container fluid>
        <div className="float-right">
          <Button color="success" tag={Link} onClick={refreshPage} to="/employees/new">
            Add Employee
          </Button>
        </div>
        <h3>Employees</h3>
        <Table className="mt-4">
          <thead>
            <tr>
              <th width="30%">Name</th>
              <th width="30%">Email</th>
              <th width="40%">Actions</th>
            </tr>
          </thead>
          <tbody>{employeeList()}</tbody>
        </Table>
      </Container>
    </div>
  );
};

export default EmployeeList;
