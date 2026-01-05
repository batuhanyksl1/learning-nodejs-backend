import { Role } from "../../constants/roles";
import { ListUsersQuery } from "./user.validator";

export interface IUserRepository {
  findByEmail(email: string): Promise<any>;
  create(data: any): Promise<any>;
  listUsers(query: ListUsersQuery): Promise<any>;
  setRole(data: { name: string; role: Role }): Promise<any>;
  getAllUsers(): Promise<any>;
}
