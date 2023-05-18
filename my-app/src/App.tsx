import React from 'react';
import { useEffect, useState } from 'react';
import { Product } from './types/product-types';
import StripeProductCard from './components/stripe-product-card/Stripe-product-card.component'
import './App.css';

function App() {

  const [productsArray, setProductsArray] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch('/.netlify/functions/get-products', {
          method: "GET",
        });
        const { products: { data } } = await userResponse.json();
        setProductsArray(data);
        return data;
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
        <StripeProductCard product={productsArray[0]} />
        :<h3>No products availble</h3>
        }
      <h3>---------</h3>
    </div>
  );
}

export default App;
