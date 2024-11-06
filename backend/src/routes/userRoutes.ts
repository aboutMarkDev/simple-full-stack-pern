import express from "express";
import { getUserById, register } from "../controllers/userController";

const router = express.Router();

router.post("/register", register);

router.get("/:userId", getUserById);

export default router;
