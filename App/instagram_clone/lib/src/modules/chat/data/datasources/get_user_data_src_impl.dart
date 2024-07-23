import 'package:instagram_clone/core/network/api_client.dart';
import 'package:instagram_clone/src/modules/auth/data/models/user_model.dart';
import 'package:instagram_clone/src/modules/chat/data/datasources/get_user_data_src.dart';

import '../../../../../core/network/api_endpoint_urls.dart';

class GetUserDataSrcImpl implements GetUserDataSrc{
  final ApiClient _apiClient;
  GetUserDataSrcImpl(this._apiClient);
  @override
  Future<UserModel> getUser(String userId) async {
    try {
      final response = await _apiClient.getRequest(
        path: '${ApiEndpointUrls.user}/$userId',
        isTokenRequired: true,
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = response.data['metadata']['user'];
        return UserModel.fromJson(responseData);
      } else {
        throw Exception('Failed to get user by user id');
      }
    } catch (e) {
      throw Exception('Failed to get user by user id: $e');
    }
  }
}