import { Skeleton } from "antd";
import * as React from "react";
import Layout from "../components/layout";

const GatsbyRedirect = () => {
  React.useEffect(() => {
    window.location.href = "https://www.gatsbyjs.com/";
  }, []);

  return (
    <Layout activeKey={""}>
      <h1>Redirect to Gatsby...</h1>

      <Skeleton active />
    </Layout>
  );
};

export default GatsbyRedirect;

export const Head = () => <title>Gatsby</title>;
