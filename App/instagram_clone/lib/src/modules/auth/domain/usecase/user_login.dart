import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/core/error/failure.dart';
import 'package:instagram_clone/core/usecase/usecase.dart';
import 'package:instagram_clone/src/modules/auth/domain/repos/auth_repo.dart';

import '../../data/models/auth_model.dart';

class UserLogin extends UserCase<AuthModel, LoginParams> {
  final AuthRepo _authRepo;

  UserLogin(this._authRepo);

  @override
  Future<Either<Failure, AuthModel>> call(LoginParams params) {
    return _authRepo.login(emailOrPhone: params.emailOrPhone, password: params.password);
  }
}

class LoginParams {
  final String emailOrPhone;
  final String password;

  const LoginParams({
    required this.emailOrPhone,
    required this.password,
  });
}
