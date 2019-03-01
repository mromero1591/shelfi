import React, { Component } from 'react';
import './App.css';
import Header from './component/Header/Header';
import routes from './routes/routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Header />
        </header>
        <main className='main-app-body'>
          {routes}
        </main>
      </div>
    );
  }
}

export default App;
