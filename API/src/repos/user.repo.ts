import User from "../data/models/user.model";

class UserRepo {
  constructor() {}

  async findOneByUsername(username: string) {
    return await User.findOne({ username });
  }
}

export default new UserRepo();
