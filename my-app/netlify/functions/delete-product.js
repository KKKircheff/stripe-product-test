require('dotenv').config();

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  };

  try {
    const { productId, plan } = JSON.parse(event.body);

    if (!productId) {
      return {
        statusCode: 204,
        headers: { ...CORS_HEADERS },
        body: JSON.stringify({}),
      };
    }

    const deletedPriceResponse = await Promise.all (plan.map(
      async (item) => await stripe.plans.del(item.id)
    ));

    const deletedProductResponse = await stripe.products.del(productId);

    return {
      statusCode: 200,
      headers: { ...CORS_HEADERS },
      body: JSON.stringify({
        message: `Sucessfuly deleted object id:`, deletedProductResponse, deletedPriceResponse
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
