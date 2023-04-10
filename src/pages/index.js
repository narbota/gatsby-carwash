import { navigate } from "gatsby";
import React, {useEffect, useState} from "react";
import Layout from "../components/layout";
import { List, Card, Button } from "antd";


const { Meta } = Card;

const IndexPage = () => {
  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    // Fetch the response from the edge function
    fetch('https://main--fancy-halva-49e773.netlify.app/welcome') // Replace with the actual URL of your edge function endpoint
      .then(response => response.text())
      .then(data => {
        // Update the state with the response data
        setGreeting(data);
      })
      .catch(error => {
        // Handle any errors that may occur during the request
        console.error(error);
      });
  }, []); // Empty dependency array to only run the effect once, similar to componentDidMount

  
  const demo = [
    {
      id: 1,
      name: "Car Talk",
      goTo: "/blog",
      image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      description:
        "Visit our blog for info about everthing Cars! *Powered by Contentful CMS",
    },
    {
      id: 2,
      name: "BigCommerce",
      goTo: "/products",
      image: "https://images.unsplash.com/photo-1505761283622-7fe50142c97f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80",
      description:
        "BigCommerce is a SaaS ecommerce platform for online stores and retail point-of-sale systems. It is designed for businesses of all sizes.",
    },
    {
      id: 3,
      name: "Netlify",
      goTo: "/netlify",
      image: "https://images.unsplash.com/photo-1503415508474-578bd9bb9dd0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      description:
        "See how Netlify can help you build, deploy, and manage your web projects.",
    },
    {
      id: 4,
      name: "Gatsby",
      goTo: "/gatsby",
      image: "https://images.unsplash.com/photo-1605164599894-ca98960d41b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      description:
        "Gatsby is a free and open source framework based on React that helps developers build blazing fast websites and apps.",
    },
  ];
  

  return (
    <Layout activeKey={"index"}>
      <div className="homepage-hero">
        <div class="homepage-hero-content">
          <h1> 🚗 Netlify Carwash 🚗</h1>
          <span>🫧🫧🫧A demo of Contentful + Gatsby🫧🫧🫧</span>
          <h1>{greeting}</h1>
        </div>
      </div>

      <List
        style={{ marginTop: 20 }}
        grid={{ column: 4 }}
        dataSource={demo}
        renderItem={(item) => (
          <List.Item>
            <Card
              cover={<img alt="example" src={item.image} />}
              hoverable
              actions={[
                <Button
                  type="primary"
                  onClick={() => {
                    navigate(item.goTo);
                  }}
                  style={{
                    width: "90%",
                    color: "white",
                    background: "#000",
                  }}
                >
                  View
                </Button>,
              ]}
            >
              <Meta title={item.name} description={`${item.description}`} />
            </Card>
          </List.Item>
        )}
      />
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>🫧Car wash🫧</title>;
