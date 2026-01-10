import { container } from "tsyringe";
import { UserRepository } from "./modules/user/user.repository";

// DI Container Registrations
container.register("UserRepository", { useClass: UserRepository });

export { container };
