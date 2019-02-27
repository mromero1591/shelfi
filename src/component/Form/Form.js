import React, { Component } from 'react'
import './Form.css'
import Axios from 'axios';

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgInput: '',
      productNameInput: '',
      priceInput: '',
      placeholderImg: 'http://via.placeholder.com/150'
    }
  }

  handleimgInput = (value) => {
    this.setState({
      imgInput: value,
    });
  }

  handleNameInput = (value) => {
    this.setState({productNameInput: value});
  }

  handlePriceInput = (value) => {
    this.setState({priceInput: value});
  }

  clearForm = () => {
    this.setState({
      imgInput: '',
      productNameInput: '',
      priceInput: ''
    })
  }

  addToInventory = () => {
    const convertedPrice = parseInt(this.state.priceInput);
    const product = {
      name: this.state.productNameInput,
      price: convertedPrice,
      img: this.state.imgInput
    }
    //add inventory to the database
    Axios.post('/api/products', product)
    .then( res => {
      console.log(res);
    }).catch( err => {
      console.log(err);
    })
    //clear the form
    this.clearForm();
  }

  render() {
    const formImg = this.state.imgInput != '' ? this.state.imgInput : this.state.placeholderImg;
    return (
      <section className='form-section'>
        <div className="form">
          <div className="form-content">
            <div className="form-img">
              <img src={formImg} alt='placeholder'/>
            </div>
            <div className="form-inputs">
              <div className='form-input-group'>
                <label>Image URL:</label>
                <input className='form-input' value={this.state.imgInput} onChange={ (e) => {this.handleimgInput(e.target.value)}}/>
              </div>
              <div className='form-input-group'>
                <label>Name:</label>
                <input className='form-input' value={this.state.productNameInput} onChange={ (e) => {this.handleNameInput(e.target.value)}}/>
              </div>
              <div className='form-input-group'>
                <label>Price:</label>
                <input className='form-input' value={this.state.priceInput} onChange={ (e) => {this.handlePriceInput(e.target.value)}}/>
              </div>
            </div>
          </div>
          <div className="btn-container">
            <button className='btn' onClick={this.clearForm}>Cancel</button>
            <button className='btn form-submit' onClick={this.addToInventory}>Add to Inventory</button>
          </div>
        </div>
      </section>
    )
  }
}
