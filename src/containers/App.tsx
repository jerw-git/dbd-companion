//JS Import
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { PerksList } from "./PerksList";
//Images
import perksIcon from "../assets/perks-icon.png";
import researchIcon from "../assets/research-icon.png";
import rouletteIcon from "../assets/roulette-icon.png";
import tutorialIcon from "../assets/tutorial-icon.png";
import dbdLogo from "../assets/dbd-logo.png";
//Styles
import "./App.scss";

function App() {
  return (
    <Router>
      <Container>
        <Row>
          <div className="header">
            <Link to="/">
              <img src={dbdLogo} alt="Home" />
              <h1>Dead By Daylight Companion</h1>
            </Link>
          </div>
        </Row>
        <Row>
          <Col>
            <div className="perkBtn">
              <Link to="/perks">
                <img src={perksIcon} alt="Perks List" />
                <p>Perks List</p>
              </Link>
            </div>
          </Col>
          <Col>
            <div className="perkBtn">
              <Link to="/roulette">
                <img src={rouletteIcon} alt="Perks Roulette" />
                <p>Perks Roulette</p>
              </Link>
            </div>
          </Col>
          <Col>
            <div className="perkBtn">
              <Link to="/tutorials">
                <img src={tutorialIcon} alt="Tutorials" />
                <p>How to Play</p>
              </Link>
            </div>
          </Col>
          <Col>
            <div className="perkBtn">
              <Link to="/research">
                <img src={researchIcon} alt="Research" />
                <p>Research</p>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/perks">
          <PerksList />
        </Route>
        <Route path="/roulette">
          <p>Roulette Coming Soon</p>
        </Route>
        <Route path="/tutorials">
          <p>Tuts Coming Soon</p>
        </Route>
        <Route path="/research">
          <p>Research Coming Soon</p>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;