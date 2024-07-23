import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/core/error/failure.dart';
import 'package:instagram_clone/src/modules/auth/data/models/user_model.dart';
import 'package:instagram_clone/src/modules/chat/domain/repos/get_user_repo.dart';

import '../datasources/get_user_data_src_impl.dart';

class GetUserRepoImpl implements GetUserRepo{
  final GetUserDataSrcImpl _getUserDataSrcImpl;
  GetUserRepoImpl(this._getUserDataSrcImpl);

  @override
  Future<Either<Failure, UserModel>> getUser(String userId) async {
    try {
      final user = await _getUserDataSrcImpl.getUser(userId);
      return Right(user);
    } catch(e){
      return Left(Failure(e.toString()));
    }
  }
}