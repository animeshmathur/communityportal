import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';

import PageLayoutComponent from './components/PageLayout/pageLayout.component';

export const UserContext = React.createContext("Guest");

class App extends Component {
  render() {
    const username = "John Doe"; // To be made dynamic upon authentication
    return (
      <div>
        <UserContext.Provider value={username}>
          <PageLayoutComponent />
        </UserContext.Provider>
      </div>
    );
  }
}

export default App;
