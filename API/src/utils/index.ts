import crypto from "crypto";
import _, { times } from "lodash";
import { SchemaTypes } from "mongoose";
import { Types } from "mongoose";
import IMessageModel from "../data/interfaces/message.interface";
import PartialConversation from "../data/interfaces/partialconversation.interface";

export const getInfoData = (
  object: Object | null = {},
  fields: Array<string> = []
) => {
  if (!object) return {};
  return _.pick(object, fields);
};

export const formatErrorString = (str: string): string => {
  const formatStr: string = str
    .split("")
    .filter((c) => c !== '"')
    .join("");
  return formatStr[0].toUpperCase() + formatStr.slice(1);
};

export function generateOTP(num: number): string {
  let OTP: string = "";
  for (let i = 0; i < num; i++) {
    const randomDigit: number = Math.floor(Math.random() * 10);
    OTP += randomDigit;
  }
  return OTP;
}

export const hashString = (str: string): string => {
  return crypto.createHash("sha256").update(str).digest("hex");
};

export const convertStringToObjectId = (id: string): Types.ObjectId => {
  return new Types.ObjectId(id);
};

export const changeDateToString = (date: Date): string => {
  const now = new Date(Date.now());
  const timeStr: string = date
    .toTimeString()
    .split(" ")[0]
    .split(":")
    .slice(0, 2)
    .join(":");
  const dateStr: string = date.toDateString().split(" ").slice(1).join(" ");
  const dayStr: string = date.toDateString().split(" ")[0];
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === date.getFullYear()
  ) {
    return timeStr;
  }
  if (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === date.getFullYear()
  ) {
    if (now.getDate() - date.getDate() <= 6 && now.getDate() > date.getDate()) {
      return `${dayStr}, ${timeStr}`;
    }
  }
  return dateStr + ", " + timeStr;
};

export const messagesWithDays = (
  messages: IMessageModel[]
): PartialConversation[] => {
  let messagesWithDays: Array<PartialConversation> = [];
  if (messages.length === 0) {
    return [];
  }
  let date: Date = new Date(messages[0].createdAt);
  let messes: Array<IMessageModel> = [messages[0]];
  for (let i = 1; i < messages.length; i++) {
    if (i === messages.length - 1) {
      if (new Date(messages[i].createdAt).getHours() === date.getHours()) {
        messes.push(messages[i]);
        messagesWithDays.push({
          date: changeDateToString(date),
          fullDate: date,
          messages: messes,
        });
      } else {
        messagesWithDays.push({
          date: changeDateToString(date),
          fullDate: date,
          messages: messes,
        });
        messagesWithDays.push({
          date: changeDateToString(new Date(messages[i].createdAt)),
          fullDate: new Date(messages[i].createdAt),
          messages: [messages[i]],
        });
      }
      break;
    }
    if (new Date(messages[i].createdAt).getHours() === date.getHours()) {
      messes.push(messages[i]);
    } else {
      messagesWithDays.push({
        date: changeDateToString(date),
        fullDate: date,
        messages: messes,
      });
      date = new Date(messages[i].createdAt);
      messes = [messages[i]];
    }
  }

  return messagesWithDays;
};
