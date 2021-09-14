import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleLike: protectResolver(async (_, { id }, { loggedInUser }) => {
      const photo = await client.photo.findUnique({
        where: {
          id,
        },
      });
      if (!photo) {
        return {
          ok: false,
          error: "Photo not found",
        };
      }
      const likeFilter = {
        photoId_userId: {
          userId: loggedInUser.id,
          photoId: id,
        },
      };
      const like = await client.like.findUnique({
        where: likeFilter,
      });
      if (like) {
        await client.like.delete({
          where: likeFilter,
        });
      } else {
        await client.like.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            photo: {
              connect: { id: photo.id },
            },
          },
        });
      }
      return { ok: true };
    }),
  },
};
