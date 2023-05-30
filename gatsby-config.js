module.exports = {
  siteMetadata: {
    title: `himnapp`,
    siteUrl: `https://github.com/vianydev/himnapp/`,
  },
  pathPrefix: "/himnapp",
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "GatsbyJS",
        short_name: "GatsbyJS",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/images/icon.png", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [ `/about/`, `/projects/*` ],
      },
    }, 
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `himnos`,
        path: `${__dirname}/himnos/`,
      }
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./relative/path/to/layout/component`),
      },
    },
  ],
  
}
