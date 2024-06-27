import '../models/auth_model.dart';

abstract class AuthRemoteDataSrc {
  Future<String> signIn({
    required String name,
    required String emailOrPhone,
    required String userName,
    required String password,
  });

  Future<AuthModel> login({
    required String emailOrPhone,
    required String password,
  });
}
