import React, { Component } from 'react';
import Product from '../Product/Product';
import './Dashboard.css';
import Axios from 'axios';


export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placeholderImg: 'http://via.placeholder.com/150',
      products: []
    }
  }

  //BEGIN STATE
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

  edit = (product) => {
    this.props.handleEditProduct(product);
  }

  render() {
    const products = this.state.products.map( product => {
      return(
        <div key={product.id} className='product-card'>
          <Product product={product} placeholderImg={this.state.placeholderImg} edit={this.edit} delete={this.deleteProduct}/>
        </div>
      );
    })
    return (
      <section className='product-container'>
        {products}
      </section>
    )
  }
}
