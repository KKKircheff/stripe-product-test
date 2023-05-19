require('dotenv').config();
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  };

  try {
    const { product, plans } = JSON.parse(event.body);

    if (!product || !plans) {
      return {
        statusCode: 204,
        headers: { ...CORS_HEADERS },
        body: JSON.stringify({product,plans}),
      };
    }

    const createdProduct = await stripe.products.create({ ...product });

    const createdPlans = await Promise.all(
      plans.map(async (plan) => {
        const data = await stripe.plans.create({
          ...plan,
          product: createdProduct.id,
        });
        return data;
      })
    );


    return {
      statusCode: 200,
      headers: { ...CORS_HEADERS },
      body: JSON.stringify({
        product: createdProduct,
        plans:createdPlans
      }),
    };
  } catch (error) {
    console.log('Error!!!!');
    return {
      statusCode: 400,
      headers: { ...CORS_HEADERS },
      body: JSON.stringify({ error }),
    };
  }
};
