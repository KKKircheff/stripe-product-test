require('dotenv').config();

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  };

  try {
    const products = await stripe.products.list({
      expand: ['data.default_price'],
    });

    const plans = await stripe.plans.list({ limit: 100 });


    const productsWithPlan = products.data.map((product) => {
      const data = plans.data.filter((plan)=>plan.product===product.id)
      return {...product,...{plan:data}}
    });


    return {
      statusCode: 200,
      headers: { ...CORS_HEADERS },
      body: JSON.stringify({ productsWithPlan }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: { ...CORS_HEADERS },
      body: JSON.stringify({ error }),
    };
  }
};
