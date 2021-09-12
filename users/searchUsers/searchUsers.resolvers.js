import { async } from "regenerator-runtime";
import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword }) =>
      //최소 2글자 이상 입력하라고 하기
      client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        //pagination 구현!
      }),
  },
};
