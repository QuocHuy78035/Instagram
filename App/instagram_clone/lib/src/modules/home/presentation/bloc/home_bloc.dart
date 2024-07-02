import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/cupertino.dart';
import 'package:instagram_clone/src/modules/home/data/models/story_user_model.dart';
import '../../domain/usecase/user_get_story.dart';
import '../../domain/usecase/user_patch_viewed_story.dart';

part 'home_event.dart';

part 'home_state.dart';

class HomeBloc extends Bloc<HomeEvent, HomeState> {
  final UserGetStory _userGetStory;
  final UserPatchViewedStory _userPatchViewedStory;

  HomeBloc(
      {required UserGetStory userGetStory,
      required UserPatchViewedStory userPatchViewedStory})
      : _userGetStory = userGetStory,
        _userPatchViewedStory = userPatchViewedStory,
        super(HomeInitial()) {
    on<GetAllAnotherStory>(_onGetAllAnotherStory);
    on<PatchViewedStory>(_onPatchViewedStory);
  }

  _onGetAllAnotherStory(
      GetAllAnotherStory event, Emitter<HomeState> emit) async {
    emit(GetAllAnotherStoryLoading());
    final response = await _userGetStory(null);
    response.fold(
        (failure) =>
            emit(GetAllAnotherStoryFailure(message: "Get story users fail!")),
        (stories) {
      emit(GetAllAnotherStorySuccess(stories: stories));
    });
  }

  _onPatchViewedStory(PatchViewedStory event, Emitter<HomeState> emit) async{
    final response = await _userPatchViewedStory(event.storyId);
    // response.fold(
    //         (failure) =>
    //         emit(PatchViewStoryFailure()),
    //         (stories) {
    //       emit(PatchViewStorySuccess());
    //     });
  }
}
