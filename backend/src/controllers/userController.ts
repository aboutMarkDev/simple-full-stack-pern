import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const newUser = await prisma.users.create({ data: { username, password } });

    if (!newUser) {
      throw new Error("Creating user failed.");
    }
    console.log(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.log("Error on registering user", error);
    res.status(500).json({ message: "Error on registering user" });
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: Number(req.params.userId) },
    });

    if (!user) {
      // Throw a custom error to pass to the error middleware
      const error = new Error("User not found!");
      throw error;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
