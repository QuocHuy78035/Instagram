import { Types } from "mongoose";

interface RecentSearchInterface {
  user: Types.ObjectId;
  searchedUsers: Array<Types.ObjectId>;
}

export default interface IRecentSearchModel
  extends RecentSearchInterface,
    Document {}
