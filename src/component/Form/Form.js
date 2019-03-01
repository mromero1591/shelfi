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
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.editproduct !== prevProps.editproduct) {
      this.setState({
        productNameInput: this.props.editproduct.name,
        imgInput: this.props.editproduct.img_url,
        priceInput: this.props.editproduct.price,
      })
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
      priceInput: '',
    })
    if(this.props.edit) {
      this.props.clearEdit();
    }
    
  }

  addToInventory = () => {
    const convertedPrice = parseInt(this.state.priceInput);
      const product = {
        id: this.props.editproduct.id,
        name: this.state.productNameInput,
        price: convertedPrice,
        img: this.state.imgInput
    }

    if(this.props.edit) {
      //edit the product.
      this.props.handleEditProduct(product);
    } else {
      //add inventory to the database
      Axios.post('/api/products', product)
      .then( res => {
        this.props.getProducts()
      }).catch( err => {
        console.log(err);
      })
    }

    //clear the form
    this.clearForm();
  }

  render() {
    const formImg = this.state.imgInput != '' ? this.state.imgInput : this.props.placeholderImg;
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
            <button className='btn form-submit' onClick={this.addToInventory}>{this.props.edit ? 'Save Changes' : 'Add to Inventory'}</button>
          </div>
        </div>
      </section>
    )
  }
}
