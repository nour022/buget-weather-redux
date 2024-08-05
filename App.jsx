import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"; 


import WeatherForecast from "./components/WeatherForecast.jsx";
import BudgetTracker from "./components/BudgetTracker.jsx";




const App = () => {
  return (
    <Router>
      <Container>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#home">Budget Tracker App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/weather-forecast">
                Weather Forecast
              </Nav.Link>
              <Nav.Link as={Link} to="/budget-tracker">
                Budget Tracker
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path="/weather-forecast" element={<WeatherForecast />} />
          <Route path="/budget-tracker" element={<BudgetTracker />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App