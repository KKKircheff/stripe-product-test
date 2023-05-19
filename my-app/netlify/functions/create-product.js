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
        body: JSON.stringify({}),
      };
    }

    const createdProduct = await stripe.products.create({ ...product })
    .then((product)=>plans.map(async (plan) => {
      const data = await stripe.plans.create({ ...plan, product: product.id });
      console.log('single.plan:',data)
      return data;
    }));

    console.log('Here it is!!!!!:', createdProduct);

    return {
      statusCode: 200,
      headers: { ...CORS_HEADERS },
      body: JSON.stringify({
        product: createdProduct,
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
