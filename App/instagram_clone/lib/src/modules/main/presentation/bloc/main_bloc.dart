import 'package:bloc/bloc.dart';
import 'package:flutter/cupertino.dart';
import 'package:instagram_clone/src/modules/main/data/models/user_info_model.dart';

import '../../domain/usecase/get_info_user.dart';
part 'main_event.dart';

part 'main_state.dart';

class MainBloc extends Bloc<MainEvent, MainState> {
  final GetInfoUser _getUserInfo;

  MainBloc({required GetInfoUser getInfoUser})
      : _getUserInfo = getInfoUser,
        super(MainInitial()) {
    on<GetUserInfoEvent>(_onGetUserInfoEvent);
  }

  _onGetUserInfoEvent(GetUserInfoEvent event, Emitter<MainState> emit) async {
    emit(GetUserLoadingState());
    final response = await _getUserInfo(null);
    response.fold(
      (failure) => emit(GetUserFailureState(message: failure.message)),
      (user) {
        emit(
          GetUserSuccessState(user: user),
        );
      },
    );
  }
}
