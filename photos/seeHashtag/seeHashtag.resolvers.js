import client from "../../client";

export default {
  Query: {
    seeHashtag: async (_, { hashtag }) =>
      client.hashtag.findUnique({
        where: {
          hashtag,
        },
      }),
  },
};
