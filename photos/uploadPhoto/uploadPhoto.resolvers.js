import { protectResolver } from "../../users/users.utils";
import client from "../../client";
import { processHashtags } from "../photos.utils";
export default {
  Mutation: {
    uploadPhoto: protectResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = [];
        if (caption) {
          /// parse caption
          // get or create Hashtags
          const hashtags = caption.match(/#[\w]+/g);
          hashtagObj = processHashtags(caption);
          console.log(hashtagObj);
          return client.photo.create({
            data: {
              file,
              caption,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              ...(hashtagObj.length > 0 && {
                hashtags: {
                  connectOrCreate: hashtagObj,
                },
              }),
            },
          });
        }
        //save the photo with parsed hashtags
        //add the photo to the hashtags
      }
    ),
  },
};
