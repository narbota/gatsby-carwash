/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `NetlifyDemo`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: "gatsby-source-bigcommerce-v2",
      options: {
        auth: {
          client_id: "6dofh7tqarcxghov4edefk22533zjd1",
          secret:
            "b016bb0f6dd8f3c9e258dcb70fffee0e6c366be65c8ea30e249f702e1d2a8556'",
          access_token: "1f76je4sbog4ym3pkg4sbkl4tta96kn",
          store_hash: "zpi3nohgf9",
        },
        globals: {
        },
        endpoints: [
          {
            nodeName: "BigCommerceProducts",
            endpoint:
              "/v3/catalog/products?include=variants,images,custom_fields,bulk_pricing_rules,primary_image,videos,options,modifiers",
            schema: null,
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: "QShrxBd_Qozuc9gP5BmkFFYbXTagwpjcvDb48_dpXW4",
        spaceId: "3hx3gkejasvh",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-styled-components",
  ],
};
