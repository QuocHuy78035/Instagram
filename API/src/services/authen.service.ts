import { BadRequestError } from "../core/error.response";
import userRepo from "../repos/user.repo";
import { UserValidator } from "../validators/user.validator";

class AuthenService {
  constructor() {}

  async signUp(body: {
    mobile?: string;
    email?: string;
    name: string;
    username: string;
    password: string;
  }) {
    const { error } = UserValidator(body);
    if (error) {
      throw new BadRequestError(error.message);
    }

    const checkUsernameExists = await userRepo.findOneByUsername(body.username);
    if (checkUsernameExists) {
      throw new BadRequestError("Username existed!");
    }

    

    return "Hello";
  }

  logIn() {
    return "Hello";
  }
}

export default new AuthenService();
