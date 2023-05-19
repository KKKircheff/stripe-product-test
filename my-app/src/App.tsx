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




function App() {

  const INITIAL_PLAN: Plan = {
    id: 'new_plan',
    active: true,
    amount: 0,
    currency: "eur",
    interval: "",
    interval_count: 1,
    nickname: " ",
    product: "",
  }
  
  const INITIAL_PRODUCT: Product = {
    id: 'new_product',
    description: "",
    name: "",
    plan: [INITIAL_PLAN],
  }

  const [productsArray, setProductsArray] = useState<Product[]>([INITIAL_PRODUCT]);
  const [currentProduct, setCurrentProduct] = useState(INITIAL_PRODUCT);
  const [isProductChanged, setIsProductChanged] = useState(true);

  console.log('Render current product ', currentProduct);

  const resetProduct = () => {
    setCurrentProduct(INITIAL_PRODUCT);
    window.scrollTo(0, 0);
    setIsProductChanged(!isProductChanged);
  }

  const editProduct = (product: Product) => {
    window.scrollTo(0, 0)
    setCurrentProduct(product);
    alert(`Edit / Create Product ${product.id}`)
    setIsProductChanged(!isProductChanged);
  }

  const createProductInStripe = (product: Product, plans: Plan[]) => {
    const createProduct = async () => {
      try {
        const response = await fetch('/.netlify/functions/create-product', {
          method: "POST",
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
          body: JSON.stringify({ product: product, plans: plans })
        });
        const { productObject } = await response.json();
        console.log('Success:', productObject)
        resetProduct();
      } catch (error) {
        console.error("Failed to create Product:", error);
      }
    };
    createProduct();
    setIsProductChanged(!isProductChanged);
  }

  const updateProductInStripe = (product: Product, plans: Plan[]) => {
    const updateProduct = async () => {
      try {
        const response = await fetch('/.netlify/functions/update-product', {
          method: "PATCH",
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
          body: JSON.stringify({ product: product, plans: plans })
        });
        const data = await response.json();
        console.log('Success:', data)
      } catch (error) {
        console.error("Failed to create Product:", error);
      }
    };
    updateProduct();
    setIsProductChanged(!isProductChanged);
  }

  const deleteProduct = async (product: Product) => {
    alert(`Delete Product ${product.id} will be deleted`);
    try {
      const response = await fetch('/.netlify/functions/delete-product', {
        method: "DELETE",
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, plan: product.plan })
      });
      const { message } = await response.json();
      resetProduct();
    } catch (error) {
      console.error("Failed to create Product:", error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/.netlify/functions/get-products', {
          method: "GET",
        });
        const { productsWithPlan } = await response.json();
        setProductsArray(productsWithPlan);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProductChanged]);


  return (
    <div className="App">
      {productsArray &&
        <EditProductForm
          currentProduct={currentProduct}
          isProductChanged={isProductChanged}
          createProductInStripe={createProductInStripe}
          updateProductInStripe={updateProductInStripe}
        />}
      <button onClick={resetProduct}>Reset form values</button>
      <h3>---------</h3>
      <h1>Your products</h1>
      {productsArray 
      ? productsArray.map((product) =>
          <StripeProductCard
            key={product.id}
            product={product}
            editProduct={editProduct}
            deleteProduct={deleteProduct}
            isProductChanged={isProductChanged} />)
        : <h3>No products availble</h3>
      }
      <h3>---------</h3>
     
    </div>
  );
}

export default App;
