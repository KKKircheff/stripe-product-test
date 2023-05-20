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
        body: JSON.stringify({ product, plans }),
      };
    }


    const updatedProduct = await stripe.products.update(product.id, {
      'name': product.name,
      'description': product.description,
    });

const updatedPlans = await Promise.all(
  plans.map(async (plan) => {
    const data = await stripe.plans.update(plan.id, {
      'nickname': plan.nickname,
      // 'interval': plan.interval,
    });
    return data;
  })
  );
  
  console.log(updatedPlans);
    return {
      statusCode: 200,
      headers: { ...CORS_HEADERS },
      body: JSON.stringify({
        product: updatedProduct,
        plans: updatedPlans,
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
