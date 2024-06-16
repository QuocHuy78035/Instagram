import crypto from "crypto";
import _ from "lodash";
import { SchemaTypes } from "mongoose";
import { Types } from "mongoose";

export const getInfoData = (
  object: Object | null = {},
  fields: Array<string> = []
) => {
  if (!object) return {};
  return _.pick(object, fields);
};

export const formatErrorString = (str: string) => {
  const formatStr = str
    .split("")
    .filter((c) => c !== '"')
    .join("");
  return formatStr[0].toUpperCase() + formatStr.slice(1);
};

export function generateOTP(num: number) {
  let OTP = "";
  for (let i = 0; i < num; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    OTP += randomDigit;
  }
  return OTP;
}

export const hashString = (str: string) => {
  return crypto.createHash("sha256").update(str).digest("hex");
};

export const convertStringToObjectId = (id: string) => {
  return new Types.ObjectId(id);
};
