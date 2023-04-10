import React from "react";
import { Layout, Menu, theme } from "antd";
import "../styles/global.css";
import { navigate } from "gatsby";

const { Header, Content, Footer } = Layout;

const LayoutWrapper = ({ children, activeKey }) => {
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const goToPage = (key) => {
    navigate(`/${key}`, { replace: true });
  };

  return (
    <Layout>
      <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
        <div
          style={{
            float: "left",
            width: 200,
            height: 31,
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: 20,
          }}
          onClick={() => {
            navigate("/");
          }}
        >
         🚗 Netlify's Carwash
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[activeKey]}
          items={[
            { key: "products", label: "Wash Packages" },
            { key: "blog", label: "Car Talk" },
          ]}
          onClick={(event) => goToPage(event.key)}
        />
      </Header>
      <Content className="site-layout" style={{ padding: "20px 50px" }}>
        {children}
       
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Built with 🫧 by Netlify SE Team 2023
      </Footer>
    </Layout>
  );
};

export default LayoutWrapper;
