import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../../../models/user.model";

export class AuthService {
  public async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id, email: user.email }, "token", {
        expiresIn: "1h",
      });
      return { token, accessLevel: user.accessLevel };
    }
    return null;
  }
}
