import { makeExecutableSchema } from "graphql-tools";

const noticeSchema = makeExecutableSchema({
  typeDefs: `
    type Notice {
      id: Int!
      title: String!
      noticeDate: String!
    }

    type Query {
      notices: [Notice!]!
      noticeById(noticeId: Int!) : Notice!
    }
  `
});


export default noticeSchema;