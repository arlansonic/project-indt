import { Router } from "express";
import { AuthController } from "./authController";

const router = Router();

const authController = new AuthController();

router.post("/login", authController.login);

export default router;
