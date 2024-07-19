import 'package:equatable/equatable.dart';

class ParticipantData extends Equatable {
  final String id;
  final String name;
  final String userName;
  final String avatar;
  final DateTime latestOnlineAt;

  const ParticipantData(
      {required this.id,
      required this.name,
      required this.userName,
      required this.avatar,
      required this.latestOnlineAt});

  @override
  // TODO: implement props
  List<Object?> get props => [];
}
