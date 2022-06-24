import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EmployeeEdit from "./EmployeeEdit";
import EmployeeList from './EmployeeList';

const App = () => {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/employees' exact={true} component={EmployeeList}/>
            <Route path='/employees/:id' component={EmployeeEdit}/>
          </Switch>
      </Router>
  </div>
  )
}

export default App;
