import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/core/error/failure.dart';
import 'package:instagram_clone/src/modules/auth/domain/repos/auth_repo.dart';
import '../../../../../core/usecase/usecase.dart';

class UserSignUp extends UserCase<String, SignUpParams> {
  UserSignUp(this._authRepo);

  final AuthRepo _authRepo;

  @override
  Future<Either<Failure, String>> call(SignUpParams params) {
    return _authRepo.signUp(
      userName: params.userName,
      emailOrPhone: params.emailOrPhone,
      name: params.name,
      password: params.password,
    );
  }
}

class SignUpParams {
  final String userName;
  final String emailOrPhone;
  final String name;
  final String password;

  const SignUpParams({
    required this.userName,
    required this.emailOrPhone,
    required this.name,
    required this.password,
  });
}
