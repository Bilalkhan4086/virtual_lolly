var baseUrl =
  process.env.NODE_ENV !== "development"
  ? "https://vlollygatsbyapp.netlify.app"
  : "http://localhost:8888";


module.exports = {
  siteMetadata: {
    title: `Virtual Lollipop`,
    description: `Its a small full stack Application`,
    author: `Muhammad Bilal`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `netlify-plugin-gatsby-cache`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Lollies",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "Lollies",
        // Url to query from
        url: `${baseUrl}/.netlify/functions/create_query_lolly`,
      },
    },
  ],
}
