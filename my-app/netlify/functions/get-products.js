require('dotenv').config();

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async (event) => {

  const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  }
  
  try {
    console.log('net1');
    
    const products = await stripe.products.list({
      limit: 3,
    });
    
    console.log('net2', products.data);
    return {
      statusCode: 200,
      headers: {...CORS_HEADERS},
      body: JSON.stringify({ products }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: {...CORS_HEADERS},
      body: JSON.stringify({ error }),
    };
  }
};
