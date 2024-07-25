import 'package:fpdart/fpdart.dart';

import '../../../../../core/error/failure.dart';
import '../../../../../core/usecase/usecase.dart';
import '../../../auth/data/models/user_model.dart';
import '../repos/get_user_repo.dart';

class UserGetUserOnl extends UserCase{
  final GetUserRepo _getAnotherUserRepo;

  UserGetUserOnl(this._getAnotherUserRepo);
  @override
  Future<Either<Failure, UserModel>> call(params) {
    return _getAnotherUserRepo.getUser(params);
  }
}