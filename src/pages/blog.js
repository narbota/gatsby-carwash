import * as React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import { List, Card, Typography } from "antd";

const { Meta } = Card;

const BlogPage = ({ data }) => {
  console.log(data);
  const { allContentfulBlogPost } = data;
  const { nodes } = allContentfulBlogPost;

  console.log(nodes);

  return (
    <Layout activeKey={"blog"}>
      <div className="homepage-hero">
        <div class="homepage-hero-content">
          <h1>Latest Stories</h1>
        </div>
      </div>

      <List
        style={{ marginTop: 20 }}
        grid={{ column: 2 }}
        dataSource={nodes}
        renderItem={(item) => (
          <List.Item>
            <Card
              onClick={
                item.slug && item.slug.length > 0
                  ? () => {
                      window.location.href = `/blog/${item.slug}`;
                    }
                  : null
              }
              hoverable
              cover={
                <img
                  alt={item.title}
                  src={
                    item.image &&
                    item.image.gatsbyImage &&
                    item.image.gatsbyImage.images &&
                    item.image.gatsbyImage.images.fallback &&
                    item.image.gatsbyImage.images.fallback.src
                  }
                />
              }
            >
              <Meta title={item.title} description={`${item.date}`} />
              <Typography.Paragraph
                ellipsis={{
                  rows: 2,
                  expandable: true,
                  suffix: "more",
                }}
              >
                {item.description}
              </Typography.Paragraph>
            </Card>
          </List.Item>
        )}
      />
    </Layout>
  );
};

export default BlogPage;

export const Head = () => <title>Latest Stories</title>;

BlogPage.propTypes = {
  data: PropTypes.shape({
    allContentfulBlogPost: PropTypes.shape({
      nodes: PropTypes.array,
    }),
  }),
};

export const pageQuery = graphql`
  query BlogIndexQuery {
    allContentfulBlogPost {
      nodes {
        title
        slug
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
  }
`;
