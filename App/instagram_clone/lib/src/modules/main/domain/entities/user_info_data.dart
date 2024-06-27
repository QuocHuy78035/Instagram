import 'package:equatable/equatable.dart';

class UserInfoData extends Equatable {
  final List<String> following;
  final String id;
  final String name;
  final String username;
  final String email;
  final String status;
  final String role;
  final String dateOfBirth;
  final String createdAt;
  final String modePrivate;
  final List<String> followers;
  final String avt;

  const UserInfoData({
    required this.following,
    required this.id,
    required this.name,
    required this.username,
    required this.email,
    required this.status,
    required this.role,
    required this.dateOfBirth,
    required this.createdAt,
    required this.modePrivate,
    required this.followers,
    required this.avt,
  });

  @override
  // TODO: implement props
  List<Object> get props => [
        following,
        id,
        name,
        username,
        email,
        status,
        role,
        dateOfBirth,
        createdAt,
        modePrivate,
        followers,
        avt,
      ];
}
