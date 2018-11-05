import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavBar from './components/NavBar';

import MainContent from './components/MainContent';

export class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <MainContent />
        </Container>
      </div>
    );
  }
}

export default App;
