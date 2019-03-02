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

  //Purpose: Make an API to get all the products from the databse.
  //Params: None
  //Return: None
  //Outcome: Products state is update to hold an array of products from the database. 
  getProducts = () => {
    //make a get call for products.
    Axios.get('/api/products')
    .then( res => {
      //get the products returend and set them in state.
      const products = res.data;
      this.setState({products})
    }).catch(err => {
      console.log(err);
    });
  }

  //Purpose: Make an API to delete a product from the data base
  //Params: Int, The Id of the product.
  //Return: None
  //Outcome: Product is removed the database.
  //         GetPoducts api call is made.
  deleteProduct = (productId) => {
    Axios.delete(`/api/products/${productId}`)
    .then( res => {
      this.getProducts();
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    //loop through each product creating a product card for each.
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
