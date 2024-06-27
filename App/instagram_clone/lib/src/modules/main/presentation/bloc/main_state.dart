part of 'main_bloc.dart';

@immutable
sealed class MainState {}

final class MainInitial extends MainState {}

class GetUserLoadingState extends MainState{}

class GetUserFailureState extends MainState{
  final String message;
  GetUserFailureState({required this.message});}

class GetUserSuccessState extends MainState{
  final UserInfoModel user;
  GetUserSuccessState({required this.user});

}
