import React from 'react';
import { useEffect, useState } from 'react';
import { Product, Plan } from './types/product-types';
import StripeProductCard from './components/stripe-product-card/Stripe-product-card.component'
import EditProductForm from './components/edit-product-form/edit-stripe-product-and-plan.component';
import './App.scss';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
}

const INITIAL_PLAN:Plan = {
  id: 'new_plan',
  active: true,
  amount: 0,
  currency: "eur",
  interval: "",
  interval_count: 1,
  nickname: " ",
  product: "",
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
  const [isProductChanged, setIsProductChanged] = useState(true);
  console.log('Render current product ',currentProduct);

  const resetProduct = () =>{
    setCurrentProduct(INITIAL_PRODUCT);
    setIsProductChanged(!isProductChanged);
  }

  const editProduct=(product: Product)=>{
    alert(`Edit / Create Product ${product.id}`)
    setCurrentProduct(product);
    setIsProductChanged(!isProductChanged);
  }

  const deleteProduct=(product:Product)=>{
    alert(`Delete Product ${product.id}`);
  }

  const createProductInStripe = (product: Product, plans:Plan[])=>{
    const createProduct = async () => {
      try {
        const response = await fetch('/.netlify/functions/create-product', {
          method: "POST",
          headers: {...CORS_HEADERS, "Content-Type": "application/json" },
          body: JSON.stringify({ product:product, plans:plans })
        });
        const { productObject } = await response.json();
        console.log('Success:', productObject)
      } catch (error) {
        console.error("Failed to create Product:", error);
      }
    };
    createProduct();
  }

  const updateProductInStripe = (product: Product, plans:Plan[])=>{
    const updateProduct = async () => {
      try {
        const response = await fetch('/.netlify/functions/update-product', {
          method: "PATCH",
          headers: {...CORS_HEADERS, "Content-Type": "application/json" },
          body: JSON.stringify({ product:product, plans:plans })
        });
        const { productObject } = await response.json();
        console.log('Success:', productObject)
      } catch (error) {
        console.error("Failed to create Product:", error);
      }
    };
    updateProduct();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/.netlify/functions/get-products', {
          method: "GET",
        });
        const {productsWithPlan} = await response.json();
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
      {currentProduct && <EditProductForm 
       currentProduct={currentProduct}
      isProductChanged={isProductChanged}
      createProductInStripe = {createProductInStripe}
      updateProductInStripe= {updateProductInStripe} 
      />}
      <h3>---------</h3>
    </div>
  );
}

export default App;
