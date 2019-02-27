import React, { Component } from 'react';
import './App.css';
import Dashboard from './component/Dashboard/Dashboard';
import Header from './component/Header/Header';
import Form from './component/Form/Form';
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placeholderImg: 'http://via.placeholder.com/150',
      products: []
    }
  }

  componentDidMount() {
    //when the page loads make a call to the database to get all the products.
    this.getProducts();
  }

  getProducts = () => {
    Axios.get('/api/products')
    .then( res => {
      const products = res.data;
      this.setState({products})
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <Header />
        </header>
        <main className='main-app-body'>
          <Dashboard products={this.state.products} placeholderImg={this.state.placeholderImg}/>
          <Form placeholderImg={this.state.placeholderImg} getProducts={this.getProducts}/>
        </main>
      </div>
    );
  }
}

export default App;
