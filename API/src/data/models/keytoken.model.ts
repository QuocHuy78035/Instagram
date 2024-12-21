import { Schema, model } from "mongoose";
import { IKeyTokenModel } from "../interfaces/keytoken.interface";
import { KeyTokenName } from "../../helpers/modelNames";

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
    collection: KeyTokenName.COLLECTION_NAME,
  }
);

const Keytoken = model<IKeyTokenModel>(
  KeyTokenName.DOCUMENT_NAME,
  keyTokenSchema
);

export default Keytoken;
