import { UserModel } from "../models/user.model";

class QueryWithHelpers {}

export type UserType = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

class UserService {
  find(email: string): QueryWithHelpers {
    return UserModel.findOne({ email: email });
  }

  findById(id: number): QueryWithHelpers {
    return UserModel.findById(id);
  }

  store(parameter: UserType) {
    return UserModel.create(parameter);
  }
}

const UserInstance = new UserService();

export { UserService, UserInstance };
