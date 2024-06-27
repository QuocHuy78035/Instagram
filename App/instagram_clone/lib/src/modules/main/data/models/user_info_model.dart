import 'package:instagram_clone/src/modules/main/domain/entities/user_info_data.dart';

class UserInfoModel extends UserInfoData {
  const UserInfoModel(
      {required super.following,
      required super.id,
      required super.name,
      required super.username,
      required super.email,
      required super.status,
      required super.role,
      required super.dateOfBirth,
      required super.createdAt,
      required super.modePrivate,
      required super.followers,
      required super.avt});

  Map<String, dynamic> toJson() {
    return <String, dynamic>{
      'following': following,
      '_id': id,
      'name': name,
      'username': username,
      'email': email,
      'status': status,
      'role': role,
      'dateOfBirth': dateOfBirth,
      'createdAt': createdAt,
      'modePrivate': modePrivate,
      'followers': followers,
      'avatar': avt
    };
  }

  factory UserInfoModel.fromJson(Map<String, dynamic> json) {
    return UserInfoModel(
      following: json['following'] != null ? List<String>.from(json['following']) : [],
      id: json['_id'],
      name: json['name'],
      username: json['username'],
      email: json['email'],
      status: json['status'],
      role: json['role'],
      dateOfBirth: json['dateOfBirth'] ?? "",
      createdAt: json['createdAt'],
      modePrivate: json['modePrivate'],
      followers: json['followers'] != null ? List<String>.from(json['followers']) : [],
      avt: json['avatar'],
    );
  }
}
