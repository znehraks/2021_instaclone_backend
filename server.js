require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { getUser, protectResolver } from "./users/users.utils";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.authorization),
      protectResolver,
    };
  },
});

const PORT = process.env.PORT;

server.listen(PORT).then(() => {
  console.log(`Server is Running on http://localhost:${PORT}/`);
});
