import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/core/error/failure.dart';
import 'package:instagram_clone/src/modules/main/data/datasources/get_info_user_remote_data_src.dart';
import 'package:instagram_clone/src/modules/main/data/models/user_info_model.dart';
import 'package:instagram_clone/src/modules/main/domain/repos/get_info_user_repo.dart';

class GetInfoUserRepoImpl implements GetInfoUserRepo{
  final GetInfoUserRemoteDataSrc _getInfoUserRemoteDataSrc;
  const GetInfoUserRepoImpl(this._getInfoUserRemoteDataSrc);
  @override
  Future<Either<Failure, UserInfoModel>> getInfoUser() async{
    try {
      final user = await _getInfoUserRemoteDataSrc.getUserInfo();
      return Right(user);
    } catch(e){
      return Left(Failure(e.toString()));
    }
  }

}