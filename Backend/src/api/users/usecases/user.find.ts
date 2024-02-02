import { User } from "../../../models/user.model";
import { UserRepository } from "../userRepository";

export class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  public async getUserById(userId: number): Promise<User | null> {
    return this.userRepository.getUserById(userId);
  }

  public async createUser(userDetails: User): Promise<User> {
    return this.userRepository.createUser(userDetails);
  }

  public async updateUser(
    userId: number,
    userDetails: User
  ): Promise<User | null> {
    return this.userRepository.updateUser(userId, userDetails);
  }

  public async deleteUser(userId: number): Promise<void> {
    return this.userRepository.deleteUser(userId);
  }
}
