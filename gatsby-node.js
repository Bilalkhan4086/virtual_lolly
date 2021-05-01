
const path = require("path");
const faunadb = require("faunadb");
const q = faunadb.query;

require("dotenv").config();

exports.createPages = async function ({ actions }) {
  try {
    if (process.env.FAUNADB_SERVER_SECRET) {
      var client = new faunadb.Client({
        secret: process.env.FAUNADB_SERVER_SECRET,
      });
      const result = await client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection('Lollies'))),
          q.Lambda(x => q.Get(x))
        )
      );
      console.log(result);
      result.data.forEach((lolly) => {
        actions.createPage({
          path: `lolly/${lolly.data.linkPath}`,
          component: require.resolve(`./src/templates/index.js`),
          context: {
            // Data passed to context is available
            // in pageContext props of the template component
            id: lolly.ref.id,
            to: lolly.data.to,
            from: lolly.data.from,
            message: lolly.data.message,
            cTop: lolly.data.cTop,
            cMiddle: lolly.data.cMiddle,
            cBottom: lolly.data.cBottom,
            linkPath : lolly.data.linkPath
          },
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
  // actions.createPage({
  //     path: `lolly/${lolly.id}`,
  //     component: require.resolve(`./src/templates/dynamic-page.tsx`),
  //     context: {
  //         // Data passed to context is available
  //         // in pageContext props of the template component
  //         name: "Zia",
  //      },
  // });
  // console.log("End of Gatsby Node File");
};