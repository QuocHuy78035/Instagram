import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/core/error/failure.dart';
import 'package:instagram_clone/src/modules/auth/data/datasources/auth_remote_data_src.dart';
import '../../domain/repos/auth_repo.dart';
import '../models/auth_model.dart';

class AuthRepoImpl implements AuthRepo {
  final AuthRemoteDataSrc _authRemoteDataSrc;

  const AuthRepoImpl(this._authRemoteDataSrc);

  @override
  Future<Either<Failure, AuthModel>> login({
    required String emailOrPhone,
    required String password,
  }) async{
    try {
      final user = await _authRemoteDataSrc.login(
        emailOrPhone: emailOrPhone,
        password: password,
      );
      return Right(user);
    } catch(e){
      return Left(Failure(e.toString()));
    }
  }

  @override
  Future<Either<Failure, String>> signUp(
      {required String userName,
      required String emailOrPhone,
      required String name,
      required String password}) {
    // TODO: implement signUp
    throw UnimplementedError();
  }
}
