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
