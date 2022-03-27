import { NextApiResponse, NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import prisma from "./prisma";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = req.cookies;

    if (token) {
      let user;
      try {
        const { id } = jwt.verify(token, "secret");
        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error("User not found");
        }
      } catch (err) {
        res.status(401);
        res.json({ error: "Not authorized" });
        return;
      }
      return handler(req, res, user);
    }

    res.status(401);
    res.json({ error: "Not authorized" });
  };
};

export const validateToken = (token) => {
  const user = jwt.verify(token, "secret");
  return user;
};
