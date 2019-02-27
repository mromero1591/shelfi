import React, { Component } from 'react';
import Product from '../Product/Product';
import './Dashboard.css';

export default class Dashboard extends Component {
  render() {
    return (
      <section className='product-container'>
        <Product />
      </section>
    )
  }
}
