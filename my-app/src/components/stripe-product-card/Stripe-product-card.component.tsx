import React from 'react'
import './stripe-product-card.styles.scss';
import { Product } from '../../types/product-types'
import StripePlanCard from '../stripe-plan-card/stripe-plan-card.component';

interface ProductProps {
  product: Product;
  editProduct: (product: Product) => void;
  deleteProduct: (product: Product) => void;
  isProductChanged:boolean;
}

const StripeProductCard = ({ product, editProduct, deleteProduct, isProductChanged }: ProductProps) => {

  const handleEditClick = () => { editProduct(product) }
  const handleDelteClick = () => { deleteProduct(product) }

  return (
    <div className='stripe-product-card-wrapper'>

      <h2>product subscription card</h2>
      <h3>--------------------------</h3>

      <p><strong>Product name: </strong> {product.name}</p>

      <p><strong>Product description: </strong>{product.description}</p>

      {product.created && <p><strong>Created: </strong>{product.created}</p>}

      {product.active && <p><strong>Acrive: </strong>{product.active ? <span>Yes</span> : <span>No</span>}</p>}

      <div className='plan-cards-container'>
        {product.plan && product.plan.map((item) => <StripePlanCard key={item.id} item={item} />)}
      </div>
      <button className='edit-stripe-product' onClick={handleEditClick}>Edit</button>
      <button className='delete-stripe-product' onClick={handleDelteClick}>Delete</button>
    </div>
  )
}

export default StripeProductCard

