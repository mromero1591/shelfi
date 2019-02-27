import React, { Component } from 'react';
import './App.css';
import Dashboard from './component/Dashboard/Dashboard';
import Header from './component/Header/Header';
import Form from './component/Form/Form';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Header />
        </header>
        <main className='main-app-body'>
          <Dashboard />
          <Form />
        </main>
      </div>
    );
  }
}

export default App;
