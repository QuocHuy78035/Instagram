import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/core/error/failure.dart';
import 'package:instagram_clone/core/usecase/usecase.dart';
import 'package:instagram_clone/src/modules/main/domain/repos/get_info_user_repo.dart';

import '../../data/models/user_info_model.dart';

class GetInfoUser extends UserCase{
  final GetInfoUserRepo _getInfoUserRepo;
  GetInfoUser(this._getInfoUserRepo);
  @override
  Future<Either<Failure, UserInfoModel>> call(params) {
    return _getInfoUserRepo.getInfoUser();
  }
}