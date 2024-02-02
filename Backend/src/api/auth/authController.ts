import { Request, Response } from "express";
import { AuthService } from "./usecases/auth.find";

export class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const token = await this.authService.login(email, password);
    if (!token) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    return res.status(200).json(token);
  };
}
