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
      products: [],
      editProduct: {
        id: '',
        name: '',
        img_url: '',
        price: ''
      },
      editStatus: false
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
    });
  }

  deleteProduct = (productId) => {
    Axios.delete(`/api/products/${productId}`)
    .then( res => {
      this.getProducts();
    }).catch(err => {
      console.log(err);
    })
  }

  editProduct = (product) => {
    this.setState({
      editProduct: product,
      editStatus: true
    });
  }

  handleEditProduct = (updatedProduct) => {
    //make an axios call to update the prodcut.
    Axios.put(`/api/products/${updatedProduct.id}`, updatedProduct)
    .then ( res => {
      //clear the edited product
      this.getProducts();
    }).catch( err => {
      console.log(err);
    })

  }

  clearEdit = () => {
    const clearedEditProduct = {
      id: '',
      name: '',
      img_url: '',
      price: ''
    }

    this.setState({
      editProduct: clearedEditProduct,
      editStatus: false
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <Header />
        </header>
        <main className='main-app-body'>
          <Dashboard products={this.state.products} placeholderImg={this.state.placeholderImg} handleEditProduct={this.editProduct} deleteProduct={this.deleteProduct}/>
          <Form clearEdit={this.clearEdit} edit={this.state.editStatus} editproduct={this.state.editProduct} placeholderImg={this.state.placeholderImg} getProducts={this.getProducts} handleEditProduct={this.handleEditProduct}/>
        </main>
      </div>
    );
  }
}

export default App;
