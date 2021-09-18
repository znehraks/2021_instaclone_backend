import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (Authorization) => {
  try {
    if (!Authorization) {
      return null;
    }
    const { id } = await jwt.verify(Authorization, process.env.SECRET_KEY);
    const user = await client.user.findUnique({
      where: { id },
    });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectResolver = (ourResolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    const query = info.operation.operation === "query";
    if (query) {
      return null;
    } else {
      return {
        ok: false,
        error: "Please login to perform this action",
      };
    }
  }
  return ourResolver(root, args, context, info);
};
