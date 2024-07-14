import { describe, it, expect } from "vitest";
import authenService from "../../services/authen.service";
import { BadRequestError } from "../../core/error.response";
import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
describe("loginError", () => {
  /* Password */
  // Do not password
  it("should return error 'Password is required'", () => {
    const body = {
      username: "long2k9",
    };
    expect(async () => await authenService.logIn(body)).rejects.toThrow(
      new BadRequestError(`"password" is required`)
    );
  });
  // Wrong password
  it("should return error 'Username or password does not exist!'", () => {
    const body = {
      username: "long2k5",
      password: "1234567890", // error
    };

    expect(async () => {
      await connect(process.env.CONNECTION_STRING || "", { maxPoolSize: 50 });
      await authenService.logIn(body);
    }).rejects.toThrow(
      new BadRequestError(`Username or password does not exist!`)
    );
  });

  /* Username */
  // Do not username
  it("should return error 'Username or password does not exist!'", () => {
    const body = {
      username: "long2k9", // error
      password: "123456789",
    };

    expect(async () => {
      await connect(process.env.CONNECTION_STRING || "", { maxPoolSize: 50 });
      await authenService.logIn(body);
    }).rejects.toThrow(
      new BadRequestError(`Username or password does not exist!`)
    );
  });

  /* Email */
  // Do not email
  it("should return error 'Email or password does not exist!'", () => {
    const body = {
      email: "buiduclong2k3@gmail.com", // error
      password: "123456789",
    };

    expect(async () => {
      await connect(process.env.CONNECTION_STRING || "", { maxPoolSize: 50 });
      await authenService.logIn(body);
    }).rejects.toThrow(
      new BadRequestError(`Email or password does not exist!`)
    );
  });

  /* Mobile */
  // Do not mobile
  it("should return error 'Mobile or password does not exist!'", () => {
    const body = {
      mobile: "0777981052", // error
      password: "123456789",
    };

    expect(async () => {
      await connect(process.env.CONNECTION_STRING || "", { maxPoolSize: 50 });
      await authenService.logIn(body);
    }).rejects.toThrow(
      new BadRequestError(`Mobile or password does not exist!`)
    );
  });

  /* Other */
  // Do not have any mobile, email or username
  it("should return error 'Please fill mobile phone, email or username'", () => {
    const body = {
      password: "123456789",
    };

    expect(async () => {
      await connect(process.env.CONNECTION_STRING || "", { maxPoolSize: 50 });
      await authenService.logIn(body);
    }).rejects.toThrow(
      new BadRequestError(`Please fill mobile phone, email or username`)
    );
  });
  // Email and password are correct but account is unverified
  it("should return error 'Email or password does not exist!'", () => {
    const body = {
      email: "mernmusicapp@gmail.com",
      password: "123456789",
    };

    expect(async () => {
      await connect(process.env.CONNECTION_STRING || "", { maxPoolSize: 50 });
      await authenService.logIn(body);
    }).rejects.toThrow(
      new BadRequestError(`Email or password does not exist!`)
    );
  });
  // Mobile and password are correct but account is unverified
  it("should return error 'Mobile or password does not exist!'", () => {
    const body = {
      mobile: "0362515406",
      password: "123456789",
    };

    expect(async () => {
      await connect(process.env.CONNECTION_STRING || "", { maxPoolSize: 50 });
      await authenService.logIn(body);
    }).rejects.toThrow(
      new BadRequestError(`Mobile or password does not exist!`)
    );
  });
  // Username and password are correct but account is unverified
  it("should return error 'Username or password does not exist!'", () => {
    const body = {
      username: "okok2",
      password: "123456789",
    };

    expect(async () => {
      await connect(process.env.CONNECTION_STRING || "", { maxPoolSize: 50 });
      await authenService.logIn(body);
    }).rejects.toThrow(
      new BadRequestError(`Username or password does not exist!`)
    );
  });
});

// describe("loginSuccess", () => {});
