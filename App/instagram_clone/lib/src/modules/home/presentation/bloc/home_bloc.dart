import 'dart:io';

import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/cupertino.dart';
import 'package:instagram_clone/src/modules/home/data/models/story_model.dart';
import 'package:instagram_clone/src/modules/home/data/models/story_user_model.dart';
import '../../domain/usecase/user_create_story.dart';
import '../../domain/usecase/user_get_story.dart';
import '../../domain/usecase/user_get_your_story.dart';
import '../../domain/usecase/user_patch_viewed_story.dart';

part 'home_event.dart';

part 'home_state.dart';

class HomeBloc extends Bloc<HomeEvent, HomeState> {
  final UserGetStory _userGetStory;
  final UserPatchViewedStory _userPatchViewedStory;
  final UserCreateStory _userCreateStory;
  final UserGetYourStory _userGetYourStory;

  HomeBloc(
      {required UserGetStory userGetStory,
      required UserPatchViewedStory userPatchViewedStory,
      required UserCreateStory userCreateStory,
      required UserGetYourStory userGetYourStory})
      : _userGetStory = userGetStory,
        _userCreateStory = userCreateStory,
        _userPatchViewedStory = userPatchViewedStory,
        _userGetYourStory = userGetYourStory,
        super(HomeInitial()) {
    on<GetAllAnotherStory>(_onGetAllAnotherStory);
    on<PatchViewedStory>(_onPatchViewedStory);
    on<CreateStory>(_onCreateStory);
    on<GetYourStory>(_onGetYourStory);
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

  _onGetYourStory(
      GetYourStory event, Emitter<HomeState> emit) async {
    emit(GetYourStoryLoading());
    final response = await _userGetYourStory(null);
    response.fold(
            (failure) =>
            emit(GetYourStoryFailure(message: "Get your story fail!")),
            (stories) {
          emit(GetYourStorySuccess(stories: stories));
        });
  }

  _onPatchViewedStory(PatchViewedStory event, Emitter<HomeState> emit) async {
    await _userPatchViewedStory(event.storyId);
    // response.fold(
    //         (failure) =>
    //         emit(PatchViewStoryFailure()),
    //         (stories) {
    //       emit(PatchViewStorySuccess());
    //     });
  }

  _onCreateStory(CreateStory event, Emitter<HomeState> emit) async {
    try {
      emit(CreateStoryLoading());
      final response = await _userCreateStory(event.file);
      response.fold((failure) => emit(CrateStoryFailure()), (stories) {
        emit(CreateStorySuccess());
      });
    } catch (e) {
      debugPrint('Error in _onCreateStory: $e');
    }
  }
}
