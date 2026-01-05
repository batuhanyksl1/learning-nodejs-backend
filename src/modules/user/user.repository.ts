import { Role } from "../../constants/roles";
import {
  buildSort,
  buildFilters,
  buildSearch,
  buildPagination,
  USER_QUERY_CONFIG,
} from "../../utils/queryBuilder";
import { injectable } from "tsyringe";
import { IUserRepository } from "./user.repository.interface";
import { UserModel } from "./user.model";
import { ListUsersQuery } from "./user.validator";

@injectable()
export class UserRepository implements IUserRepository {
  findByEmail(email: string) {
    return UserModel.findOne({ email: email }).select("+password");
  }

  async create(data: {
    email: string;
    name: string;
    password: string;
    role: Role;
  }) {
    const user = await UserModel.create(data);
    return user;
  }

  async setRole(data: { name: string; role: Role }) {
    await UserModel.updateOne(
      { name: data.name },
      { $set: { role: data.role } }
    );
    return UserModel.findOne({ name: data.name });
  }

  async getAllUsers() {
    return UserModel.find();
  }


  async listUsers(query: ListUsersQuery) {
    const { skip, limit, page } = buildPagination(query.page, query.limit);
  
    const filters = {
      ...buildFilters(query as any, USER_QUERY_CONFIG.filterableFields),
      ...buildSearch(query.search, USER_QUERY_CONFIG.searchableFields),
    };
  
    const sort = buildSort(
      query.sort,
      USER_QUERY_CONFIG.sortableFields,
      USER_QUERY_CONFIG.defaultSort
    );
  
    const [items, total] = await Promise.all([
      UserModel.find(filters)
        .select("-password")
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      UserModel.countDocuments(filters),
    ]);
  
    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }
  
}
