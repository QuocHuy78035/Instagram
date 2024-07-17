import { Schema, model } from "mongoose";
import IRecentSearchModel from "../interfaces/recentsearch.interface";

const DOCUMENT_NAME = "RecentSearch";
const COLLECTION_NAME = "recentsearchs";

const recentSearchSchema: Schema<IRecentSearchModel> =
  new Schema<IRecentSearchModel>(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true,
      },
      searchedUsers: {
        type: [{ type: Schema.Types.ObjectId, ref: "User", require: true }],
        default: [],
      },
    },
    {
      timestamps: true,
      collection: COLLECTION_NAME,
    }
  );

const RecentSearch = model<IRecentSearchModel>(
  DOCUMENT_NAME,
  recentSearchSchema
);
export default RecentSearch;
