import 'package:instagram_clone/src/modules/auth/domain/entities/user_data.dart';

class UserModel extends UserData {
  const UserModel(
      {required super.id,
      required super.email,
      required super.userName,
      required super.name,
      required super.role});

  Map<String, dynamic> toJson() {
    return <String, dynamic>{
      '_id': id,
      'email': email,
      'username': userName,
      'name': name,
      'role': role
    };
  }

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['_id'],
      email: json['email'],
      userName: json['username'],
      name: json['name'],
      role: json['role'],
    );
  }
}
