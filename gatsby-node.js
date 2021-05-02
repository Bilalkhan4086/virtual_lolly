const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { data } = await graphql(`
    query MyQuery {
        lollies {
          getLollies {
            cTop
            from
            to
            message
            cMiddle
            cBottom
            linkPath
          }
        }
      }
      `);


  data.lollies.getLollies.forEach((d) => {
    // console.log(d.first, "in")
    createPage({
      path: `lolly/${d.linkPath}`,
      component: path.resolve(`./src/templates/index.js`),
      context: d,
    });
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/lollies/)) {
    page.matchPath = "/lollies/*";

    // Update the page.

    createPage(page);
  }
};