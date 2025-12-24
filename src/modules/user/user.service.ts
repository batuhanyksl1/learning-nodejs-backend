import { UserRepository } from "./user.repository";
import { CreateUserInput, GetUserInput } from "./user.validator";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserInput) {
    // burada ileride:
    // - email unique mi?
    // - domain rule
    // - transaction
    return this.userRepository.create(data);
  }

  async getUser(data: GetUserInput) {
    return this.userRepository.findByEmail(data.email);
  }
}
