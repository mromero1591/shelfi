import React, { Component } from 'react';
import './App.css';
import Dashboard from './component/Dashboard/Dashboard';
import Header from './component/Header/Header';
import Form from './component/Form/Form';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Dashboard />
        <Form />
      </div>
    );
  }
}

export default App;
