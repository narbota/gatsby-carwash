import axios from 'axios';

// TODO: Move variable to .env at some point

// TODO: Replace with new credentials here 
const bigCommerceCredentials = {
  client_id: "6dofh7tqarcxghov4edefk22533zjd1",
  secret: "b016bb0f6dd8f3c9e258dcb70fffee0e6c366be65c8ea30e249f702e1d2a8556'",
  access_token: "1f76je4sbog4ym3pkg4sbkl4tta96kn",
  store_hash: "zpi3nohgf9",
  api_url: "https://api.bigcommerce.com/stores/zpi3nohgf9/v3",
};

const addToCart = async (req_body) => {
  const { items, cartId } = req_body;
  console.log(items, cartId);
  const body = {
    line_items: [
      ...items.map((item) => ({
        product_id: item.variants[0].product_id,
        variant_id: item.variants[0].id,
        quantity: item.quantity,
      })),
    ],
  };

  let endpoint = `${bigCommerceCredentials.api_url}/carts`;

  if (cartId) {
    endpoint = `${bigCommerceCredentials.api_url}/carts/${cartId}/items`;
  }

  console.log(endpoint);

  try {
    const response = await axios({
      method: 'post',
      url: `${endpoint}?include=redirect_urls`, 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Auth-Token": bigCommerceCredentials.access_token,
      },
      data: body
    })

    const data = response.data.data

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const removeFromCart = async (req_body) => {
  const { item, cartId } = req_body;

  let endpoint = `${bigCommerceCredentials.api_url}/carts`;

  if (cartId) {
    endpoint = `${bigCommerceCredentials.api_url}/carts/${cartId}`;
  }
  try {
    const response = await axios({
      method: 'delete',
      url: `${endpoint}/items/${item.id}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Auth-Token": bigCommerceCredentials.access_token,
      },
    });

    const data = response.data.data

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const handler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      // Create a new cart
      try {
        const cart = await addToCart(req.body);
        res.status(201).json({ success: true, data: cart });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      // Delete a cart
      try {
        const cart = await removeFromCart(req.body);
        res.status(201).json({ success: true, data: cart });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default handler;
