part of 'home_bloc.dart';

@immutable
sealed class HomeState {}

final class HomeInitial extends HomeState {}

class GetAllAnotherStoryLoading extends HomeState{}

class GetAllAnotherStorySuccess extends HomeState{
  final List<StoryUserModel> stories;
  GetAllAnotherStorySuccess({required this.stories});
}

class GetAllAnotherStoryFailure extends HomeState{
  final String message;
  GetAllAnotherStoryFailure({required this.message});
}

class CreateStorySuccess extends HomeState{}

class CreateStoryLoading extends HomeState{}

class CrateStoryFailure extends HomeState{}

class GetYourStoryLoading extends HomeState{}

class GetYourStorySuccess extends HomeState{
  final List<StoryModel> stories;
  GetYourStorySuccess({required this.stories});
}

class GetYourStoryFailure extends HomeState{
  final String message;
  GetYourStoryFailure({required this.message});
}
