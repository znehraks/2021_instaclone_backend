import client from "../client";

export default {
  Photo: {
    user: ({ userId }) => {
      return client.user.findUnique({
        where: {
          id: userId,
        },
      });
    },
    hashtags: ({ id }) => {
      return client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      });
    },
    likes: ({ id }) => {
      return client.like.count({
        where: {
          photoId: id,
        },
      });
    },
    comments: ({ id }) =>
      client.comment.count({
        where: {
          photoId: id,
        },
      }),
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
  },
  Hashtag: {
    photos: ({ id }, { page }) =>
      client.hashtag
        .findUnique({
          where: {
            id,
          },
        })
        .photos(),
    totalPhotos: ({ id }) =>
      client.photo.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
