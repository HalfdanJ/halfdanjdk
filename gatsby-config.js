module.exports = {
  siteMetadata: {
    title: "Jonas Jongejan",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-6864792-1",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    "gatsby-remark-images",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          // posts: require.resolve("./src/components/posts-layout.js"),
          default: require.resolve("./src/components/default-layout.js"),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 750,
            },
          },
          {
            resolve: `gatsby-remark-check-links`,
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "previews",
        path: "./src/previews/",
      },
      __key: "previews",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Heebo`, "Raleway "],
        display: "swap",
      },
    },
  ],
};
