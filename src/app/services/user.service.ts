import { IUser, UserModel } from "../models/user.model";

class QueryWithHelpers {}

class UserService {
  find(email: string): QueryWithHelpers {
    return UserModel.findOne({ email: email });
  }

  findById(id: number): QueryWithHelpers {
    return UserModel.findById(id);
  }
}

const UserInstance = new UserService();

export { UserService, UserInstance };
