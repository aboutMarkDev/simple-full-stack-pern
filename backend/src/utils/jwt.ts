import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_ACCESS_SECRET || "tuwaisue";

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "7d" });
};
