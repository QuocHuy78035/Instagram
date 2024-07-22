import '../../domain/entities/participant_data.dart';

class ParticipantModel extends ParticipantData {
  const ParticipantModel(
      {required super.id,
      required super.name,
      required super.userName,
      required super.avatar,
      required super.latestOnlineAt});

  factory ParticipantModel.fromJson(Map<String, dynamic> json) {
    return ParticipantModel(
      id: json['_id'],
      name: json['name'],
      userName: json['username'],
      avatar: json['avatar'],
      latestOnlineAt: json['latestOnlineAt'] != null ? DateTime.parse(json['latestOnlineAt']) : DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'username': userName,
      'avatar': avatar,
      'latestOnlineAt': latestOnlineAt.toIso8601String(),
    };
  }
}
