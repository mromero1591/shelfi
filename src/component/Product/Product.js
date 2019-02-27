import React from 'react'
import './Product.css';

export default function Product(props) {
  const img_url = props.product.img_url !== '' ? props.product.img_url : props.placeholderImg
  return (
    <div className='product-card-content'>
      <div className='product-card-img-container'>
        <img src={img_url} alt='product'/>
      </div>
      <div className="product-card-desc">
        <h4>{props.product.name}</h4>
        <span>${props.product.price}</span>
      </div>
    </div> 
  )
}
