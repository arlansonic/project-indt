import { Request, Response } from "express";
import { UserService } from "./usecases/user.find";
import { validarEmail } from "../../utils/validation-email";
import { User } from "../../models/user.model";

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getAllUsers = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const users = await this.userService.getAllUsers();
    return res.status(200).json(users);
  };

  public getUserById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const userId = Number(req.params.id);
    const user = await this.userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  };

  public createUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { firstName, lastName, email, password, accessLevel } = req.body;

    if (!firstName || !lastName || !email || !password || !accessLevel) {
      return res.status(400).json({ message: "Missing required information" });
    }

    if (!validarEmail(email))
      return res.status(400).json({ message: "Invalid email" });

    const emailExists = await User.findOne({ where: { email } });

    if (emailExists)
      return res.status(400).json({ message: "Email already exists" });

    const userDetails = req.body;
    const user = await this.userService.createUser(userDetails);
    return res.status(201).json(user);
  };

  public updateUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const userId = Number(req.params.id);
    const userDetails = req.body;
    const user = await this.userService.updateUser(userId, userDetails);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  };

  public deleteUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const userId = Number(req.params.id);
    await this.userService.deleteUser(userId);
    return res.status(204).json();
  };
}
