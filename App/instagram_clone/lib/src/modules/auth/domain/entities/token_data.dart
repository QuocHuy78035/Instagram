
import 'package:equatable/equatable.dart';

class TokenData extends Equatable{
  final String accessToken;
  final String refreshToken;

  const TokenData({
    required this.accessToken,
    required this.refreshToken,
  });

  @override
  // TODO: implement props
  List<Object?> get props => [accessToken, refreshToken];
}
