import * as React from "react";
import Layout from "../components/layout";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { List, Card, Button, Badge, Drawer, Avatar, Alert } from "antd";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import request from "../utils/request";

// TODO: Move me to env
let api_url = "https://contentful-gatsby-bigcommerce-demo.netlify.app";

const { Meta } = Card;

const ProductListPage = ({ data }) => {
  const { allBigCommerceProducts } = data;
  const { nodes } = allBigCommerceProducts;

  const [cart, setCart] = React.useState([]);
  const [cartDisplayed, setCartDisplayed] = React.useState(false);
  const [loading, setLoading] = React.useState(null);
  const [alert, setAlert] = React.useState(null);
  const [bigCommerceCart, setBigCommerceCart] = React.useState(null);

  const groupedCart = (item) => {
    const list = item ? [...cart, item] : cart;
    return list.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        acc.push({ ...item, quantity: 1 });
      }
      return acc;
    }, []);
  };

  const addToCart = async (item) => {
    setLoading(item.id);
    setAlert(null);
    try {
      let body = {
        items: [{ ...item, quantity: 1 }],
      };

      if (bigCommerceCart && bigCommerceCart.id) {
        body = {
          ...body,
          cartId: bigCommerceCart.id,
        };
      }

      const response = await request(`${api_url}/api/cart`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      setCart([...cart, item]);
      setBigCommerceCart(response.data);
    } catch (error) {
      setAlert({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(null);
    }
  };

  const removeFromCart = async (item) => {
    setLoading(item.id);
    setAlert(null);
    try {
      const response = await request(`${api_url}/api/cart`, {
        method: "DELETE",
        body: JSON.stringify({ item, cartId: bigCommerceCart.id }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      setCart(cart.filter((i) => i.id !== item.id));
    } catch (error) {
      setAlert({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(null);
    }
  };

  const goToCheckoutOnBigCommerce = () => {
    if (
      bigCommerceCart.redirect_urls &&
      bigCommerceCart.redirect_urls.checkout_url
    ) {
      window.location.href = bigCommerceCart.redirect_urls.checkout_url;
    } else {
      setAlert({
        type: "error",
        message: "Cart is empty. Please add some items to your cart.",
      });
    }
  };

  return (
    <Layout activeKey={"products"}>
      <Drawer
        title={`Your Cart (${cart.length})`}
        placement="right"
        onClose={() => {
          setCartDisplayed(false);
        }}
        open={cartDisplayed}
        width={430}
        footer={
          <Button
            type="primary"
            onClick={() => {
              goToCheckoutOnBigCommerce();
            }}
            disabled={cart.length === 0}
            style={{ width: "100%", color: "white", backgroundColor: "black" }}
          >
            CHECKOUT - $
            {groupedCart()
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)}
          </Button>
        }
      >
        <List
          dataSource={groupedCart()}
          itemLayout="horizontal"
          loading={loading ? true : false}
          renderItem={(item) => (
            <List.Item
              actions={[
                <DeleteOutlined
                  onClick={() => {
                    removeFromCart(item);
                  }}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Badge count={item.quantity} color="black">
                    <Avatar
                      src={
                        item.images &&
                        item.images.length > 0 &&
                        item.images[0].url_standard
                      }
                      shape="square"
                    />
                  </Badge>
                }
                title={item.name}
                description={`$${item.price.toFixed(2)}/each - $${(
                  item.price * item.quantity
                ).toFixed(2)} total`}
              />
            </List.Item>
          )}
        />
      </Drawer>
      <Card
        title={`Our Products (${nodes.length})`}
        extra={
          <Badge count={cart.length} color="black">
            <Button
              onClick={() => {
                setCartDisplayed(true);
              }}
            >
              <ShoppingCartOutlined style={{}} /> View Cart
            </Button>
          </Badge>
        }
      >
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            closable
            onClose={() => {
              setAlert(null);
            }}
            style={{ marginBottom: 16 }}
          />
        )}
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={nodes}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                cover={
                  <img
                    alt={item.name}
                    src={
                      item.images &&
                      item.images.length > 0 &&
                      item.images[0].url_standard
                    }
                  />
                }
                actions={[
                  <Button
                    type="primary"
                    onClick={() => {
                      addToCart(item);
                    }}
                    style={{
                      width: "90%",
                      color: "white",
                      background: "#000",
                    }}
                    loading={loading === item.id}
                  >
                    Add to Cart
                  </Button>,
                ]}
              >
                <Meta
                  title={item.name}
                  description={`$${item.price.toFixed(2)}`}
                />
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </Layout>
  );
};

export default ProductListPage;

ProductListPage.propTypes = {
  data: PropTypes.shape({
    allBigCommerceProducts: PropTypes.shape({
      nodes: PropTypes.array,
    }),
  }),
};

export const Head = () => <title>Our Products</title>;

export const productListPageQuery = graphql`
  query ProductListPage {
    allBigCommerceProducts {
      nodes {
        id
        name
        price
        description
        images {
          url_thumbnail
          url_standard
        }
        variants {
          id
          sku
          price
          image_url
          product_id
        }
      }
    }
  }
`;
