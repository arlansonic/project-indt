import { Router } from "express";
import { UserController } from "./userController";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = Router();
const userController = new UserController();

router.get("/users", authMiddleware, userController.getAllUsers);
router.get("/users/:id", authMiddleware, userController.getUserById);
router.post("/users", userController.createUser);
router.patch("/users/:id", authMiddleware, userController.updateUser);
router.delete("/users/:id", authMiddleware, userController.deleteUser);

export default router;
