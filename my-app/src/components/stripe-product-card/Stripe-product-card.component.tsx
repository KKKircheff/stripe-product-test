import React from 'react'
import './stripe-product-card.styles.scss';
import { Product } from '../../types/product-types'
import StripePlanCard from '../stripe-plan-card/stripe-plan-card.component';

interface ProductProps {
  product: Product;
}
const StripeProductCard = ({product}:ProductProps) => {
   console.log('Product:  ',product);

     return (
        <div className='stripe-product-card-wrapper'>
          <h4>product subscription card</h4>
          <p>Product name: {product.name}</p>
          <p>Product description: {product.description}</p>
          <p>Price Object Id: {product.name}</p>
          <p>Created: {product.created}</p>
          <p>Active: {product.active ? <span>Yes</span>:<span>No</span>}</p>
          <div className='plan-cards-container'>
          {product.plan && product.plan.map((item)=><StripePlanCard key={item.id} item={item}/>)}
          </div>
        <button className='edit-stripe-product'>Edit</button>
        <button className='delete-stripe-product'>Delete</button>
      </div>    
    )    
  }

export default StripeProductCard

