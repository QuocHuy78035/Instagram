import 'package:instagram_clone/core/network/api_client.dart';
import 'package:instagram_clone/src/modules/auth/data/datasources/auth_remote_data_src.dart';
import '../models/auth_model.dart';

class AuthRemoteDataSrcImpl implements AuthRemoteDataSrc {
  final ApiClient _apiService;

  const AuthRemoteDataSrcImpl(this._apiService);

  @override
  Future<String> signIn({
    required String name,
    required String emailOrPhone,
    required String userName,
    required String password,
  }) {
    // TODO: implement signIn
    throw UnimplementedError();
  }

  @override
  Future<AuthModel> login(
      {required String emailOrPhone, required String password}) async {
    Map<String, dynamic> body = {};
    if (emailOrPhone.contains("@")) {
      body = {"email": emailOrPhone, "password": password};
    } else {
      body = {"mobile": emailOrPhone, "password": password};
    }
    final response = await _apiService.postRequest(path: "login", body: body);
    if (response.statusCode == 200) {
      final Map<String, dynamic> responseData = response.data;
      final auth = responseData['metadata'];
      return AuthModel.fromJson(auth);
    } else {
      throw Exception('Failed to login');
    }
  }
}
