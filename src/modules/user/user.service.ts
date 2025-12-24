import { UserRepository } from "./user.repository";
import { CreateUserInput, GetUserInput } from "./user.validator";
import { ROLES } from "../../constants/roles";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: CreateUserInput) {
    return this.userRepository.create({
      ...data,
      role: ROLES.USER  // 👈 Bakın, varsayılan rol burada atanıyor
    });
  }

  async getUser(data: GetUserInput) {
    return this.userRepository.findByEmail(data.email);
  }
}
