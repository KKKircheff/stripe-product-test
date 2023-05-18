import React from 'react'
import { Plan} from '../../types/product-types'
import './stripe-plan-card.styles.scss'
interface ProductProps {
    item: Plan;
  }
   // nickname, amount, interval, currency

const StripePlanCard = ({item}:ProductProps) => {
  return (
    <div className='stripe-plan-card-wrapper'>
    <p>Plan name: {item.nickname}</p>
    <p>Plan interval: {item.interval}</p>
    <p>Price: {item.amount}</p><span> {item.currency}</span>
    <p></p>
    <p></p>
    </div>
  )
}

export default StripePlanCard