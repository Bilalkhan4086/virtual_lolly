// const path = require("path");

// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions;
//   const { data } = await graphql(`
//     query MyQuery {
//         Lollies {
//           getLollies {
//             cTop
//             from
//             to
//             message
//             cMiddle
//             cBottom
//             linkPath
//           }
//         }
//       }
//       `);


//   data.Lollies.getLollies.forEach((d) => {
//     // console.log(d.first, "in")
//     createPage({
//       path: `lolly/${d.linkPath}`,
//       component: path.resolve(`./src/templates/index.js`),
//       context: d,
//     });
//   });
// };

// exports.onCreatePage = async ({ page, actions }) => {
//   const { createPage } = actions;

//   if (page.path.match(/^\/lollies/)) {
//     page.matchPath = "/lollies/*";

//     // Update the page.

//     createPage(page);
//   }
// };


const path = require("path");
const faunadb = require("faunadb");
const q = faunadb.query;

require("dotenv").config();

exports.createPages = async function ({ actions, graphql }) {
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
          path: `/lolly/${lolly.data.linkPath}`,
          component: require.resolve(`./src/templates/index.tsx`),
          context: {
            // Data passed to context is available
            // in pageContext props of the template component
            id: lolly.ref.id,
            from: lolly.data.from,
            to: lolly.data.to,
            message: lolly.data.message,
            cTop: lolly.data.cTop,
            cMiddle: lolly.data.cMiddle,
            cBottom: lolly.data.cBottom,
            linkPath: lolly.data.linkPath,
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