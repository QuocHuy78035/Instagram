
import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/core/error/failure.dart';
import '../../data/models/auth_model.dart';

abstract class AuthRepo {
  Future<Either<Failure, String>> signUp({
    required String userName,
    required String emailOrPhone,
    required String name,
    required String password,
  });

  Future<Either<Failure, AuthModel>> login({required String emailOrPhone, required String password});
}
