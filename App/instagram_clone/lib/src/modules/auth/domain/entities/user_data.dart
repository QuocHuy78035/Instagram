import 'package:equatable/equatable.dart';

class UserData extends Equatable{
  final String id;
  final String email;
  final String userName;
  final String name;
  final String role;
  final String avt;

  const UserData({
    required this.id,
    required this.email,
    required this.userName,
    required this.name,
    required this.role,
    required this.avt
  });

  @override
  // TODO: implement props
  List<Object?> get props => [id, email, userName, name, role, avt];
}
