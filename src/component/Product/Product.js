import React from 'react'
import './Product.css';
import {Link} from 'react-router-dom'

export default function Product(props) {
  const img_url = props.product.img_url !== '' ? props.product.img_url : props.placeholderImg
  return (
    <div className='product-card-content'>
      <div className='product-card-img-container'>
        <img src={img_url} alt='product'/>
      </div>
      <div className="product-card-desc">
        <div>
          <span>{props.product.name} <br/><span>${props.product.price}</span></span>
        </div>
        <div className='product-btn-group'>
          <button className='product-card-btn' onClick={() => {props.delete(props.product.id)}}>Delete</button>
          <Link to={`/edit/${props.product.id}`} ><button className='product-card-btn'>Edit</button> </Link>
        </div>
      </div>
    </div> 
  )
}
