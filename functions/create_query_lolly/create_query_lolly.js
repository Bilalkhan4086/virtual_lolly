const dotenv = require('dotenv')
const fauna = require("faunadb")
const {gql,ApolloServer} = require("apollo-server-lambda")
const shortid = require("shortid");
const axios = require('axios');

dotenv.config();
q = fauna.query;


const typeDefs = gql`
type data {
  id : String!
  to : String!
  from : String!
  message : String!
  cTop : String!
  cBottom : String!
  cMiddle : String!
  linkPath : String!
 }


type Query {
  getLollies : [data]
  Lolly(linkPath : String!) : data
}

type Mutation {
  new_lolly(to : String!,from : String!,message : String!,cTop : String!,cBottom : String!,cMiddle : String!) : data
  }

`;

const resolvers = {

// Queries

 Query : {

// getting lolly by index i.e by path
getLollies: async () => {
  try {
    var client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
    const result = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("Lollies"))),
        q.Lambda(x => q.Get(x))
      )
    )

    return result.data.map(d => {

      return ({
        id: result.ref.id,
       to: result.data.to,
       from: result.data.from,
       message: result.data.message,
       cTop: result.data.cTop,
       cBottom: result.data.cBottom,
       cMiddle: result.data.cMiddle,
       linkPath : result.data.linkPath
      })
    })
  } catch (e) {
    console.log(e, "error")
  }
},
    Lolly : async(parent, args, context)=>{
      try {
        var client = new fauna.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
        let result = await client.query(
          q.Get(
            q.Match(q.Index('Lollies'), args.linkPath)
         )
          );
           console.log("resuts are here =>",result)
         
           return({
             id: result.ref.id,
            to: result.data.to,
            from: result.data.from,
            message: result.data.message,
            cTop: result.data.cTop,
            cBottom: result.data.cBottom,
            cMiddle: result.data.cMiddle,
            linkPath : result.data.linkPath
           })
         }
       catch (err) {
        return ("Error is",err.toString());
      }

    },
  }
    
    ,

    // Mutations

    Mutation:{

// Add new lolly      

      new_lolly : async(_,{to,from,message,cTop,cBottom,cMiddle})=>{
        try {
          var client = new fauna.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
          let result = await client.query(
            q.Create(
            q.Collection("Lollies"),
             {data:{to,from,message,cTop,cBottom,cMiddle,linkPath:shortid.generate()}})
            );
             
          console.log("Results form server are here =",result)
          console.log("Done")
          if(result.ref.id.length !== 0){
            const BuildRes = await axios.post(process.env.NETLIFY_BUILD_HOOK)
          }
          return({
            id: result.ref.id,
           to: result.data.to,
           from: result.data.from,
           message: result.data.message,
           cTop: result.data.cTop,
           cBottom: result.data.cBottom,
           cMiddle: result.data.cMiddle,
           linkPath : result.data.linkPath
          })
        } catch (err) {
          return ("Error is",err.toString());
        }
      },    
    }}

// Configuring Server

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground:true,
  introspection:true
});
 
exports.handler = server.createHandler();
