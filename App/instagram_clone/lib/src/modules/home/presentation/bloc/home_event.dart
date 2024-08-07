part of 'home_bloc.dart';

abstract class HomeEvent extends Equatable{
  const HomeEvent();

  @override
  // TODO: implement props
  List<Object?> get props => [];
}

class GetAllAnotherStory extends HomeEvent{}

class PatchViewedStory extends HomeEvent{
  final String storyId;
  const PatchViewedStory({required this.storyId});

  @override
  // TODO: implement props
  List<Object?> get props => [storyId];
}

class CreateStory extends HomeEvent{
  final File file;
  const CreateStory({required this.file});

  @override
  // TODO: implement props
  List<Object?> get props => [file];
}

class GetYourStory extends HomeEvent{}
