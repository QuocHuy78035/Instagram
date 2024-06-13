import crypto from "crypto";
import _ from "lodash"

export const getInfoData = (object: Object = {}, fields: Array<string> = []) => {
  return _.pick(object, fields);
}

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
