import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Axios from 'axios';
import './Form.css'

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placeholderImg: 'http://via.placeholder.com/150',
      imgInput: '',
      productNameInput: '',
      priceInput: '',
      editStatus: false
    }
  }


  //Purpose: When the component mounts if the edit path is matched the product is loaded.
  //Params: None
  //Return: None
  //Outcome: state is updated to contain the products information.
  componentDidMount() {
    if(this.props.match.params.id) {
      Axios.get(`/api/products/${this.props.match.params.id}`)
      .then( res => {
        const product = res.data[0];
        this.setState({
          imgInput: product.img_url,
          productNameInput: product.name,
          priceInput: product.price,
          editStatus: true
        })  
      })
    }
  }

  //Purpose: Checking the props to see if the add path is matched.
  //Params: None
  //Return: None
  //Outcome: state is cleared to default values.
  componentDidUpdate(prevProps) {
    if(this.props.match.params.id !== prevProps.match.params.id ) {
      this.clearForm();
    }
  }

  //Purpose: tracks image input text
  //Params: string, the value in the input
  //Return: None
  //Outcome: state is updated to match the inputs new value
  handleimgInput = (value) => {
    this.setState({
      imgInput: value,
    });
  }

  //Purpose: tracks image input text
  //Params: string, the value in the input
  //Return: None
  //Outcome: state is updated to match the inputs new value
  handleNameInput = (value) => {
    this.setState({productNameInput: value});
  }

  //Purpose: tracks image input text
  //Params: string, the value in the input
  //Return: None
  //Outcome: state is updated to match the inputs new value
  handlePriceInput = (value) => {
    this.setState({priceInput: value});
  }


  //Purpose: set state to defualt values
  //Params: None
  //Return: None
  //Outcome: state is updated to a defualt value.
  clearForm = () => {
    this.setState({
      imgInput: '',
      productNameInput: '',
      priceInput: '',
      editStatus: false
    })

  }

  //Purpose: add item to the database
  //Params: None
  //Return: None
  //Outcome: database is upadated to include new product.
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
      //clear the form
      this.clearForm();
      this.props.history.push('/');
    }).catch( err => {
      console.log(err);
    })
  }

  //Purpose: edit an item in the database
  //Params: None
  //Return: None
  //Outcome: database is upadated to include new products info.
  editInventory = () => {
    const id = this.props.match.params.id;

    const updatedProduct = {
      name: this.state.productNameInput,
      price: this.state.priceInput,
      img: this.state.imgInput
    }
    //make an axios call to update the prodcut.
    Axios.put(`/api/products/${id}`, updatedProduct)
    .then ( res => {
      //clear the edited product
      this.clearForm();
      this.props.history.push('/');
      
    }).catch( err => {
      console.log(err);
    })
  }

  render() {
    const formImg = this.state.imgInput !== '' ? this.state.imgInput : this.state.placeholderImg;
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
            <Link to={'/'}><button className='btn' onClick={this.clearForm}>Cancel</button></Link>
            <button className='btn form-submit' onClick={this.state.editStatus ? this.editInventory : this.addToInventory}>{this.state.editStatus ? 'Save Changes' : 'Add to Inventory'}</button>
          </div>
        </div>
      </section>
    )
  }
}
