part of 'auth_bloc.dart';

@immutable
sealed class AuthState {}

final class AuthInitial extends AuthState {}

class AuthLoadingState extends AuthState {}

class LoggedInState extends AuthState {
  final AuthModel authModel;

  LoggedInState({required this.authModel});
}

class AuthErrorState extends AuthState {
  final String errorMessage;

  AuthErrorState({required this.errorMessage});
}

