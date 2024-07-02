import 'package:instagram_clone/src/modules/main/data/datasources/get_info_user_remote_data_src.dart';
import 'package:instagram_clone/src/modules/main/data/models/user_info_model.dart';
import '../../../../../core/network/api_client.dart';
import '../../../../../core/network/api_endpoint_urls.dart';

class GetInfoUserRemoteDataSrcImpl implements GetInfoUserRemoteDataSrc {
  final ApiClient _apiService;

  const GetInfoUserRemoteDataSrcImpl(this._apiService);

  @override
  Future<UserInfoModel> getUserInfo() async {
    final response =
        await _apiService.getRequest(path: ApiEndpointUrls.getInfoUser, isTokenRequired: true);
    if (response.statusCode == 200) {
      final Map<String, dynamic> responseData = response.data;
      final user = responseData['metadata']['user'];
      return UserInfoModel.fromJson(user);
    } else {
      throw Exception('Failed to login');
    }
  }
}
