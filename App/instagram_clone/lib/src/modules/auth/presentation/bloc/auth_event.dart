part of 'auth_bloc.dart';

abstract class AuthEvent extends Equatable {
  const AuthEvent();

  @override
  // TODO: implement props
  List<Object?> get props => [];
}

class LoginEvent extends AuthEvent {
  final String emailOrPhone;
  final String password;

  const LoginEvent({
    required this.emailOrPhone,
    required this.password,
  });

  @override
  // TODO: implement props
  List<Object?> get props => [emailOrPhone, password];
}
