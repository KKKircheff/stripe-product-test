import React from 'react';
import { useEffect, useState } from 'react';
import { Product } from './types/product-types';
import StripeProductCard from './components/stripe-product-card/Stripe-product-card.component'
import './App.scss';

function App() {

  const [productsArray, setProductsArray] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/.netlify/functions/get-products', {
          method: "GET",
        });
        const {productsWithPlan} = await response.json();
        console.log('-----',productsWithPlan[0].plan)
        setProductsArray(productsWithPlan);
        return productsWithPlan;
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="App">
      <h1>Your products</h1>
      <h3>---------</h3>
      { productsArray[0] ?
        productsArray.map((product)=><StripeProductCard key={product.id} product={product} />)
        :<h3>No products availble</h3>
        }
      <h3>---------</h3>
    </div>
  );
}

export default App;
