class AuthModel {
  final Map<String, dynamic> user;
  final Map<String, dynamic> tokens;
  const AuthModel({required this.user, required this.tokens}) ;

  Map<String, dynamic> toJSon(){
    return <String, dynamic>{
      'user' : user,
      'tokens' : tokens
    };
  }

  factory AuthModel.fromJson(Map<String, dynamic> json){
    return AuthModel(user: json['user'], tokens: json['tokens']);
  }
}