import '../models/user_info_model.dart';

abstract class GetInfoUserRemoteDataSrc{
  Future<UserInfoModel> getUserInfo();
}