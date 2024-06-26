import 'package:equatable/equatable.dart';

class UserData extends Equatable{
  final String id;
  final String email;
  final String userName;
  final String name;
  final String role;

  const UserData({
    required this.id,
    required this.email,
    required this.userName,
    required this.name,
    required this.role,
  });

  @override
  // TODO: implement props
  List<Object?> get props => [id, email, userName, name, role];
}
