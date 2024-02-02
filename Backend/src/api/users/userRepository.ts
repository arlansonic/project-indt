import { User } from '../../models/user.model';

export class UserRepository {
  public async getAllUsers(): Promise<User[]> {
    return User.findAll();
  }

  public async getUserById(userId: number): Promise<User | null> {
    return User.findByPk(userId);
  }

  public async createUser(userDetails: { firstName: string; lastName: string; email: string; password: string }): Promise<User> {
    return User.create(userDetails);
  }

  public async updateUser(userId: number, userDetails: User): Promise<User | null> {
    await User.update(userDetails, { where: { id: userId } });
    return this.getUserById(userId);
  }

  public async deleteUser(userId: number): Promise<void> {
    await User.destroy({ where: { id: userId } });
  }
}
