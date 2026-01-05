import {
  CreateUserInput,
  GetUserInput,
  UpdateUserRoleInput,
  ListUsersQuery,
} from "./user.validator";
import { ROLES } from "../../constants/roles";
import { IUserRepository } from "./user.repository.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserService {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository
  ) {}

  async createUser(data: CreateUserInput) {
    return this.userRepository.create({
      ...data,
      role: ROLES.USER, // 👈 Bakın, varsayılan rol burada atanıyor
    });
  }

  async getUser(data: GetUserInput) {
    return this.userRepository.findByEmail(data.email);
  }
  async setRole(data: UpdateUserRoleInput) {
    return this.userRepository.setRole({
      name: data.name,
      role: data.role,
    });
  }

  async getAllUsers() {
    return this.userRepository.getAllUsers();
  }
  async listUsers(query: ListUsersQuery) {
    return this.userRepository.listUsers(query);
  }
}
