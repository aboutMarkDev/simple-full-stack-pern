import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const newUser = await prisma.users.create({ data: { username, password } });

    if (!newUser) {
      console.log("Error");
    }
    console.log(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.log("Error on registering user", error);
    res.status(500).json({ message: "Error on registering user" });
  }
};
