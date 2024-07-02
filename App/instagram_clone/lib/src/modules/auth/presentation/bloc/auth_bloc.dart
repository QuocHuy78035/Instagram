import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/cupertino.dart';
import 'package:instagram_clone/src/modules/auth/data/models/auth_model.dart';
import '../../../../../core/local_db_config/init_local_db.dart';
import '../../domain/usecase/user_login.dart';
import '../../domain/usecase/user_sign_up.dart';
part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final UserSignUp _userSignUp;
  final UserLogin _userLogin;

  AuthBloc({required UserSignUp userSignUp, required UserLogin userLogin})
      : _userSignUp = userSignUp,
        _userLogin = userLogin,
        super(AuthInitial()) {
    on<LoginEvent>(_onLoginEvent);
  }

  _onLoginEvent(LoginEvent event, Emitter<AuthState> emit) async {
    emit(AuthLoadingState());
    final response = await _userLogin(
      LoginParams(
        emailOrPhone: event.emailOrPhone,
        password: event.password,
      ),
    );
    response.fold(
      (failure) => emit(
          AuthErrorState(errorMessage: "Email or password does not correct!")),
      (authModel)  {
         SharedPreferencesRepository.putString("accessToken", authModel.tokens['accessToken']);
         SharedPreferencesRepository.putString("refreshToken", authModel.tokens['refreshToken']);
         SharedPreferencesRepository.putString("userId", authModel.user['_id']);
         SharedPreferencesRepository.putString('userName', authModel.user['username']);
         SharedPreferencesRepository.putString('name', authModel.user['name']);
         SharedPreferencesRepository.putString("avt", authModel.user['avatar']);


         SharedPreferencesRepository.putString('emailOrPhone', event.emailOrPhone);
         SharedPreferencesRepository.putString('password', event.password);

         emit(
          LoggedInState(authModel: authModel),
        );
      }
    );
  }
}
