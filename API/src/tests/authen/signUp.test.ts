import { describe, it, expect } from "vitest";
import authenService from "../../services/authen.service";
import { BadRequestError } from "../../core/error.response";
import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
describe("signUpError", () => {
  /* name */
  // do not name
  it("should throw the error 'name is required'", () => {
    const body = {
      //lack name
      mobile: "0777981051",
      email: "buiduclongdragon@gmail.com",
      password: "123456789",
    };
    expect(async () => await authenService.signUp(body)).rejects.toThrow(
      new BadRequestError(`"name" is required`)
    );
  });

  /* username */
  // do not username
  it("should throw the error 'username is required'", () => {
    const body = {
      //  lack username
      mobile: "0777981051",
      email: "buiduclongdragon@gmail.com",
      name: "Bùi Đức Long",
      password: "123456789",
    };
    expect(async () => await authenService.signUp(body)).rejects.toThrow(
      new BadRequestError(`"username" is required`)
    );
  });

  // username is less than 3 characters
  it("should throw the error 'username length must be at least 3 characters long'", () => {
    const body = {
      mobile: "0777981051",
      email: "buiduclongdragon@gmail.com",
      username: "ch", //error
      name: "Bùi Đức Long",
      password: "123456789",
    };
    expect(async () => await authenService.signUp(body)).rejects.toThrow(
      new BadRequestError(
        `"username" length must be at least 3 characters long`
      )
    );
  });

  // username is more than 20 characters
  it("should throw the error 'username length must be less than or equal to 20 characters long'", () => {
    const body = {
      mobile: "0777981051",
      email: "buiduclongdragon@gmail.com",
      username: "abcdefghilmnoqrstuvwxyz", // error
      name: "Bùi Đức Long",
      password: "123456789",
    };
    expect(async () => await authenService.signUp(body)).rejects.toThrow(
      new BadRequestError(
        `"username" length must be less than or equal to 20 characters long`
      )
    );
  });

  // username is not only contain alpha-numeric characters
  it("should throw the error 'username must only contain alpha-numeric characters'", () => {
    const body = {
      mobile: "0777981051",
      email: "buiduclongdragon@gmail.com",
      username: "///?/", // error
      name: "Bùi Đức Long",
      password: "123456789",
    };
    expect(async () => await authenService.signUp(body)).rejects.toThrow(
      new BadRequestError(
        `"username" must only contain alpha-numeric characters`
      )
    );
  });

  // account that has username is existed
  it("should throw the error 'Username existed!'", () => {
    const body = {
      email: "buiduclong@gmail.com",
      name: "Chat AI",
      username: "long2k5", // error
      password: "12345678901234567890",
    };
    expect(async () => {
      await connect(process.env.CONNECTION_STRING || "", { maxPoolSize: 50 });
      return await authenService.signUp(body);
    }).rejects.toThrow(new BadRequestError(`Username existed!`));
  });

  /* password */
  // do not password
  it("should throw the error 'password is required'", () => {
    const body = {
      mobile: "0777981051",
      email: "buiduclongdragon@gmail.com",
      username: "hello",
      name: "Bùi Đức Long",
      // lack password
    };
    expect(async () => await authenService.signUp(body)).rejects.toThrow(
      new BadRequestError(`"password" is required`)
    );
  });

  // password is less than 8 characters long
  it("should throw the error 'password length must be at least 8 characters long'", () => {
    const body = {
      email: "buiduclongit@gmail.com",
      name: "Chat AI",
      username: "hello",
      password: "123456", // error
    };
    expect(async () => await authenService.signUp(body)).rejects.toThrow(
      new BadRequestError(
        `"password" length must be at least 8 characters long`
      )
    );
  });

  // password is more than 20 characters long
  it("should throw the error 'password length must be less than or equal to 20 characters long'", () => {
    const body = {
      email: "buiduclongit@gmail.com",
      name: "Chat AI",
      username: "hello",
      password: "123456789012345678901", // error
    };
    expect(async () => await authenService.signUp(body)).rejects.toThrow(
      new BadRequestError(
        `"password" length must be less than or equal to 20 characters long`
      )
    );
  });

  /* mobile */
  // mobile is not equal to 10 digits or contain some characters that is not number
  it("should throw the error 'Phone number must have 10 digits.'", () => {
    const body = {
      mobile: "077981051a", // error
      email: "buiduclongit@gmail.com",
      name: "Chat AI",
      username: "hello",
      password: "12345678901234567890",
    };
    expect(async () => await authenService.signUp(body)).rejects.toThrow(
      new BadRequestError(`Phone number must have 10 digits.`)
    );
  });

  // account has mobile is existed
  it("should throw the error 'Mobile existed!'", () => {
    const body = {
      mobile: "0777981051", // error
      name: "Chat AI",
      username: "hello",
      password: "12345678901234567890",
    };
    expect(async () => {
      await connect(process.env.CONNECTION_STRING || "", { maxPoolSize: 50 });
      return await authenService.signUp(body);
    }).rejects.toThrow(new BadRequestError(`Mobile existed!`));
  });

  /* email */
  // Email is not valid
  it("should throw the error 'Email must be a valid email'", () => {
    const body = {
      email: "buiduclongit@gmail", //  error
      name: "Chat AI",
      username: "hello",
      password: "12345678901234567890",
    };
    expect(async () => await authenService.signUp(body)).rejects.toThrow(
      new BadRequestError(`"email" must be a valid email`)
    );
  });

  // account has email is existed
  it("should throw the error 'Email existed!'", () => {
    const body = {
      email: "buiduclongit@gmail.com", // error
      name: "Chat AI",
      username: "hello",
      password: "12345678901234567890",
    };
    expect(async () => {
      await connect(process.env.CONNECTION_STRING || "", { maxPoolSize: 50 });
      return await authenService.signUp(body);
    }).rejects.toThrow(new BadRequestError(`Email existed!`));
  });

  /* other */
  // do not have any mobile or email
  it("should throw the error 'Please just fill mobile phone or email!'", () => {
    const body = {
      // lack email or phone
      name: "Chat AI",
      username: "hello",
      password: "12345678901234567890",
    };
    expect(async () => await authenService.signUp(body)).rejects.toThrow(
      new BadRequestError(`Please just fill mobile phone or email!`)
    );
  });

  // Form have both mobile and email
  it("should throw the error 'Can not fill both mobile phone and email'", () => {
    const body = {
      mobile: "0777981051", // error
      email: "buiduclongit@gmail.com", // error
      name: "Chat AI",
      username: "hello",
      password: "12345678901234567890",
    };
    expect(async () => await authenService.signUp(body)).rejects.toThrow(
      new BadRequestError(`Can not fill both mobile phone and email`)
    );
  });
});

describe("signUpSuccess", () => {
  it("should return the message", async () => {
    const body = {
      email: "mernmusicapp@gmail.com",
      name: "Chat AI",
      username: "okok",
      password: "12345678901234567890",
    };
    await connect(process.env.CONNECTION_STRING || "", { maxPoolSize: 50 });
    const data = await authenService.signUp(body);
    expect(data).toHaveProperty("message");
  });
});
