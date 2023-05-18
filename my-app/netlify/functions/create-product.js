
require('dotenv').config();
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler =  async (event) => {

  const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  }
  
  try {
    const {user} = JSON.parse(event.body);
    const userEmail = user.currentUser.email

    if (!userEmail) {
      return {
        statusCode: 204,
        headers: {...CORS_HEADERS},
        body: JSON.stringify({}),
      };
    }
    
    const currentUser = await stripe.customers.search({
      query: `email:'${userEmail}'`,
    });
    let userData= currentUser.data;

    if (!userData.length) {
      const customer = await stripe.customers.create({
       name: 'New User',
       email: userEmail,
      });
      userData = customer;
    }
  
    return {
      statusCode: 200,
      headers: {...CORS_HEADERS},
      body: JSON.stringify({userData }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: {...CORS_HEADERS},
      body: JSON.stringify({ error }),
    };
  }
};
