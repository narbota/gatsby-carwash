import { navigate } from "gatsby";
import * as React from "react";
import Layout from "../components/layout";
import { List, Card, Button } from "antd";

const { Meta } = Card;

const IndexPage = () => {
  const demo = [
    {
      id: 1,
      name: "Contentful",
      goTo: "/blog",
      description:
        "Contentful is a content management system (CMS) for digital teams to create, manage, and distribute content to any platform.",
    },
    {
      id: 2,
      name: "BigCommerce",
      goTo: "/products",
      description:
        "BigCommerce is a SaaS ecommerce platform for online stores and retail point-of-sale systems. It is designed for businesses of all sizes.",
    },
    {
      id: 3,
      name: "Netlify",
      goTo: "/netlify",
      description:
        "See how Netlify can help you build, deploy, and manage your web projects.",
    },
    {
      id: 4,
      name: "Gatsby",
      goTo: "/gatsby",
      description:
        "Gatsby is a free and open source framework based on React that helps developers build blazing fast websites and apps.",
    },
  ];

  return (
    <Layout activeKey={"index"}>
      <div className="homepage-hero">
        <div class="homepage-hero-content">
          <h1>𐂂 Netlify's Coffee</h1>
          <span>A demo of Netlify with Contentful + BigCommerce + Gatsby</span>
        </div>
      </div>

      <List
        style={{ marginTop: 20 }}
        grid={{ column: 4 }}
        dataSource={demo}
        renderItem={(item) => (
          <List.Item>
            <Card
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

export const Head = () => <title>Home Page</title>;
