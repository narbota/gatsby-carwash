import { Skeleton } from "antd";
import * as React from "react";
import Layout from "../components/layout";

const NetlifyRedirect = () => {
  React.useEffect(() => {
    window.location.href = "https://app.netlify.com/sites/contentful-gatsby-bigcommerce-demo/overview";
  }, []);

  return (
    <Layout activeKey={""}>
      <h1>Redirect to Netlify ...</h1>

      <Skeleton active />
    </Layout>
  );
};

export default NetlifyRedirect;

export const Head = () => <title>Netlify</title>;
