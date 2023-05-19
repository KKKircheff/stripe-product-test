import React from 'react';
import { useEffect, useState } from 'react';
import { Product, Plan } from './types/product-types';
import StripeProductCard from './components/stripe-product-card/Stripe-product-card.component'
import EditProductForm from './components/edit-product-form/edit-stripe-product-and-plan.component';
import './App.scss';

const INITIAL_PLAN:Plan = {
  "active": true,
  "amount": 0,
  "currency": "eur",
  "interval": "",
  "interval_count": 1,
  "nickname": "",
  "product": "",
}

const INITIAL_PRODUCT:Product = {
  id: 'new_product',
  description: "",
  name: "",
  plan: [INITIAL_PLAN],
} 


function App() {

  const [productsArray, setProductsArray] = useState<Product[]>([INITIAL_PRODUCT]);
  const [currentProduct, setCurrentProduct] = useState(INITIAL_PRODUCT);
  const [isNewProduct, setIsNewProduct] = useState(true);

  const resetProduct = () =>{
    setCurrentProduct(INITIAL_PRODUCT);
    setIsNewProduct(true);
  }

  const editProduct=(product:any)=>{
    alert(`Edit Product ${product.id}`)
  }
  const deleteProduct=(product:any)=>{
    alert(`Delete Product ${product.id}`);
  }

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
      { productsArray[0] ?
        productsArray.map((product)=>
        <StripeProductCard
         key={product.id}
          product={product} editProduct={editProduct} deleteProduct = {deleteProduct}/>)
        
        :<h3>No products availble</h3>
      }
      <h3>---------</h3>
      <h5>To reset and create new product & plan</h5>
      <button onClick={resetProduct}>Create</button>
      <EditProductForm  product={currentProduct} isNewProduct={isNewProduct}/>
      <h3>---------</h3>
    </div>
  );
}

export default App;
