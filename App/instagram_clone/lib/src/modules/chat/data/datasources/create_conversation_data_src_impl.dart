import '../../../../../core/network/api_client.dart';
import '../../../../../core/network/api_endpoint_urls.dart';
import 'create_conversation_data_src.dart';

class CreateConversationDataSrcImpl implements CreateConversationDataSrc{
  final ApiClient _apiClient;
  CreateConversationDataSrcImpl(this._apiClient);
  @override
  Future createConversation(List<String> userId) async {
    Map<String, dynamic> body = {"participants" : userId};
    final response = await _apiClient.postRequest(path: '${ApiEndpointUrls.conversation}/', isTokenRequired: true, body: body);
    if (response.statusCode == 200) {
      final Map<String, dynamic> responseData = response.data;
      return responseData;
    } else {
      throw Exception('Failed to create conversation');
    }
  }
}