import * as React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import { List, Card, Typography, Breadcrumb, Button, Space } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const BlogPage = ({ data }) => {
  console.log(data);
  const { contentfulBlogPost } = data;

  return (
    <Layout activeKey={"blog"}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Blog</Breadcrumb.Item>
        <Breadcrumb.Item>{contentfulBlogPost.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Card
        cover={
          <img
            alt={contentfulBlogPost.title}
            src={
              contentfulBlogPost.image &&
              contentfulBlogPost.image.gatsbyImage &&
              contentfulBlogPost.image.gatsbyImage.images &&
              contentfulBlogPost.image.gatsbyImage.images.fallback &&
              contentfulBlogPost.image.gatsbyImage.images.fallback.src
            }
          />
        }
        title={contentfulBlogPost.title}
        extra={contentfulBlogPost.date}
        actions={[
          <Space direction="horizontal">
            <span>Share on:</span>{" "}
            <Button>
              <FacebookOutlined /> Facebook
            </Button>
            <Button>
              <TwitterOutlined /> Twitter
            </Button>
            <Button>
              <LinkedinOutlined /> Linkedin
            </Button>
          </Space>,
        ]}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: contentfulBlogPost.description.long,
          }}
        />
      </Card>
    </Layout>
  );
};

export default BlogPage;

export const Head = () => <title>Blog Post</title>;

BlogPage.propTypes = {
  data: PropTypes.shape({
    allContentfulBlogPost: PropTypes.shape({
      nodes: PropTypes.array,
    }),
  }),
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      description {
        long: description
      }
      date(formatString: "MMMM Do, YYYY")
      image {
        gatsbyImage(
          layout: FULL_WIDTH
          placeholder: BLURRED
          width: 424
          height: 212
        )
      }
    }
  }
`;
