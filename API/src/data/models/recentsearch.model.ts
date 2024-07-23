import { Schema, model } from "mongoose";
import IRecentSearchModel from "../interfaces/recentsearch.interface";
import { RecentSearchName } from "../../utils/globalvariables";


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
      collection: RecentSearchName.COLLECTION_NAME,
    }
  );

const RecentSearch = model<IRecentSearchModel>(
  RecentSearchName.DOCUMENT_NAME,
  recentSearchSchema
);
export default RecentSearch;
