import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavBar from './components/NavBar';

import MainContent from './components/MainContent';
import './App.css';

export class App extends Component {
  render() {
    return (
      <div className="customContainer">
        <NavBar />
        <Container>
          <MainContent />
        </Container>
      </div>
    );
  }
}

export default App;
