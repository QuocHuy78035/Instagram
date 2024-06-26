import 'package:instagram_clone/src/modules/auth/domain/entities/token_data.dart';

class TokenModel extends TokenData{
  const TokenModel({required super.accessToken, required super.refreshToken});

  Map<String, dynamic> toJSon(){
    return <String, dynamic>{
      'accessToken' : accessToken,
      'refreshToken' : refreshToken
    };
  }

  factory TokenModel.fromJson(Map<String, dynamic> json){
    return TokenModel(accessToken: json['accessToken'], refreshToken: json['refreshToken']);
  }
}