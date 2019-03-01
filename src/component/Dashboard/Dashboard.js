import React, { Component } from 'react';
import Product from '../Product/Product';
import './Dashboard.css';


export default class Dashboard extends Component {

  edit = (product) => {
    this.props.handleEditProduct(product);
  }

  delete = (productId) => {
    this.props.deleteProduct(productId);
  }

  render() {
    const products = this.props.products.map( product => {
      return(
        <div key={product.id} className='product-card'>
          <Product product={product} placeholderImg={this.props.placeholderImg} edit={this.edit} delete={this.delete}/>
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
