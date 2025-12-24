import { UserRepository } from "./user.repository";
import { CreateUserInput, GetUserInput } from "./user.validator";
import { ROLES } from "../../constants/roles";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserInput) {
    // burada ileride:
    // - email unique mi?
    // - domain rule
    // - transaction
    return this.userRepository.create({
      ...data, // Email, name, password
      role: ROLES.USER, // <-- Explicit Assignment (Açık Atama - Business Decision)
    });
  }

  async getUser(data: GetUserInput) {
    return this.userRepository.findByEmail(data.email);
  }
}
