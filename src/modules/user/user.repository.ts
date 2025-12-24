import { Role } from "../../constants/roles";
import { UserModel } from "./user.model";

export class UserRepository {
  async findByEmail(email: string) {
    return UserModel.findOne({ email }).select("+password");
  }

  async create(data: { email: string; name: string; password: string}) {
    const user = await UserModel.create(data);
    return user;
  }
}
