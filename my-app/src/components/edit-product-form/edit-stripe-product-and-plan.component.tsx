import React, { useState } from 'react'
import { Product, Plan } from '../../types/product-types'

interface Props {
    product: Product;
    isNewProduct: boolean;
}

const EditProductForm = ({ product, isNewProduct }: Props) => {
  
    const plans = product.plan;
    const [planValues, setPlanValues] = useState(plans![0]);
    delete product.plan;
    const [productValues, setProductValues] = useState(product);

    const handleInputProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProductValues({
            ...productValues,
            [name]: value,
        });
    };

    const handleInputPlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPlanValues({
            ...planValues,
            [name]: value,
        });
    };
    const handleInputSelectChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
       
    }

    return (
        <div className='edir-form-wrapper'>
            <div>EditProductForm</div>
            <form>
                <label>Product name:
                    <input
                        value={productValues.name}
                        onChange={handleInputProductChange}
                        name="name" //IMPORTANT 
                    />
                </label>
                <label>Product description:
                    <input
                        value={productValues.description!}
                        onChange={handleInputProductChange}
                        name="description" //IMPORTANT 
                    />
                </label>


                <label>Plan Name:
                    <input
                        value={planValues.nickname}
                        onChange={handleInputPlanChange}
                        name="nickname" //IMPORTANT 
                        placeholder={planValues.nickname ? planValues.nickname : 'Plan name'}
                    />
                </label>
                <label>Price amount:
                    <input
                        value={planValues.amount}
                        onChange={handleInputPlanChange}
                        name="amount" //IMPORTANT 
                    />
                </label>
                <label>Charge Interval:
                    <select name="interval" onChange={handleInputSelectChange} value={planValues.interval}>
                        <option value="day">day</option>
                        <option value="week">week</option>
                        <option value="month">month</option>
                        <option value="year">year</option>
                    </select>
                </label>
            </form>
        </div>
    )
}

export default EditProductForm