import request from "./../utils/request";


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
    const { data } = await request(`${endpoint}?include=redirect_urls`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Auth-Token": bigCommerceCredentials.access_token,
      },
    });

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
    const { data } = await request(`${endpoint}/items/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Auth-Token": bigCommerceCredentials.access_token,
      },
    });

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
