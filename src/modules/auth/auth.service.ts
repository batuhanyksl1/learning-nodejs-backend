import { ROLES } from "../../constants/roles";
import { AppError } from "../../errors/AppError";
import { comparePassword, hashPassword } from "../../utils/hash";
import { signToken } from "../../utils/jwt";
import { UserRepository } from "../user/user.repository";
import { LoginInput, RegisterInput } from "./auth.validator";

export class AuthService {
  constructor(private readonly userRepo: UserRepository) {}

  //kaydol
  async register(data: RegisterInput) {
    const exists = await this.userRepo.findByEmail(data.email);

    if (exists) throw new AppError("Email already exists", 409);

    const hashed = await hashPassword(data.password);

    const user = await this.userRepo.create({
      email: data.email,
      name: data.name,
      password: hashed,
      role: ROLES.USER
    });

    const token = signToken({ id: user.id, email: user.email, role: user.role});

    return { token };
  }

  async login(data: LoginInput) {
    const user = await this.userRepo.findByEmail(data.email);

    if (!user) throw new AppError("Invalid credential", 401);

    const valid = await comparePassword(data.password, user.password);

    if (!valid) throw new AppError("Invalid credential", 401);

    const token = signToken({ id: user.id, email: user.email, role: user.role});

    return { token };

    // süslü parantez içerisinde obje döndürür
    // result = { token: "..." }
    // süslü parantez dışında string
    // result = "eyJhbGciOiJIUzI1NiIs..."
  }
}
