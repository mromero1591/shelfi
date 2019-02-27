import React, { Component } from 'react';
import Product from '../Product/Product';
import './Dashboard.css';


export default class Dashboard extends Component {
  render() {
    const products = this.props.products.map( product => {
      return(
        <div key={product.id} className='product-card'>
          <Product product={product} placeholderImg={this.props.placeholderImg}/>
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
