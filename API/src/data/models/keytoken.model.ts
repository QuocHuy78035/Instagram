import { Schema, model } from "mongoose";
import { IKeyTokenModel } from "../interfaces/keytoken.interface";

const COLLECTION_NAME = "keytokens";
const DOCUMENT_NAME = "Keytoken";

const keyTokenSchema: Schema<IKeyTokenModel> = new Schema<IKeyTokenModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
    publicKey: {
      type: String,
      required: true,
    },
    refreshTokenUsed: {
      type: Array,
      default: [],
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const Keytoken = model<IKeyTokenModel>(DOCUMENT_NAME, keyTokenSchema);

export default Keytoken;
