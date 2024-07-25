import 'package:instagram_clone/src/modules/auth/data/models/user_model.dart';

abstract class GetUserDataSrc{
  Future<UserModel> getUser(String userId);

}