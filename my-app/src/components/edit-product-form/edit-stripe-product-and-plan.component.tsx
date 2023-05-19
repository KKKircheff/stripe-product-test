import React from 'react';
import { useState, useEffect } from 'react';
import { Plan, Product } from '../../types/product-types'

interface Props {
    currentProduct: Product;
    isProductChanged: boolean;
    createProductInStripe:(product:Product, plans:Plan[])=>void;
    updateProductInStripe:(product:Product, plans:Plan[])=>void;
}

const EditProductForm = ({ currentProduct, isProductChanged, createProductInStripe, updateProductInStripe}: Props) => {

    const plans = currentProduct.plan;
    const {plan, ...product} = currentProduct;
    const [productValues, setProductValues] = useState<Product>();
    const [planValues, setPlanValues] = useState<Plan>();

    console.log('AfterState:',productValues)

    useEffect(() => {
        setProductValues(product);
        setPlanValues(plans![0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isProductChanged])


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
            ...planValues!,
            [name]: value,
        });
    };

    const handleInputSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPlanValues({
            ...planValues!,
            [name]: value,
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       if( productValues!.id==='new_product') { 
         delete productValues?.id;
         delete planValues?.id;
         createProductInStripe (productValues!,[planValues!])
       } else {
         updateProductInStripe (productValues!,plans!)
       }
    }

    return (
        <div className='edir-form-wrapper'>

            <h2>Create / Edit Product Form</h2><br />

            {productValues && <form onSubmit={handleSubmit}>
                <label>Product name:
                    <input
                        required
                        value={productValues!.name}
                        onChange={handleInputProductChange}
                        name="name" //IMPORTANT 
                    />
                </label> <br />

                <label>Product description:
                    <input
                        required
                        value={productValues!.description!}
                        onChange={handleInputProductChange}
                        name="description" //IMPORTANT 
                    />
                </label><br /><br />

                <label>Plan Name:
                    <input
                        required
                        value={planValues!.nickname}
                        onChange={handleInputPlanChange}
                        name="nickname" //IMPORTANT 
                    />
                </label>

                <label>Charge Interval:
                    <select name="interval" onChange={handleInputSelectChange} value={planValues!.interval}>
                        <option value="day">day</option>
                        <option value="week">week</option>
                        <option value="month">month</option>
                        <option value="year">year</option>
                    </select>
                </label> <br />

                <label>Price amount:
                    <input
                        required
                        value={planValues!.amount}
                        onChange={handleInputPlanChange}
                        name="amount" //IMPORTANT 
                    />
                </label> <br /> <br />
                <button>Process Porduct</button>
            </form>}
            <br /> <br /> 
        </div>
    )
}

export default EditProductForm