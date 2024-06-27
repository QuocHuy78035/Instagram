
import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/src/modules/main/data/models/user_info_model.dart';

import '../../../../../core/error/failure.dart';

abstract class GetInfoUserRepo{
  Future<Either<Failure, UserInfoModel>> getInfoUser();
}