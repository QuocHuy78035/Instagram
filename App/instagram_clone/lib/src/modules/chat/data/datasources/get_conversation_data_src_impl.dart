import 'package:instagram_clone/core/network/api_client.dart';
import 'package:instagram_clone/src/modules/chat/data/datasources/get_conversation_data_src.dart';
import 'package:instagram_clone/src/modules/chat/data/models/conversation_model.dart';
import '../../../../../core/network/api_endpoint_urls.dart';

class GetConversationDataSrcImpl implements GetConversationDataSrc{
  final ApiClient _apiClient;
  GetConversationDataSrcImpl(this._apiClient);

  @override
  Future<ConversationModel> getConversation(String conversationId) async {
    try {
      final response = await _apiClient.getRequest(
        path: '${ApiEndpointUrls.conversation}/$conversationId',
        isTokenRequired: true,
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> responseData = response.data['metadata']['conversation'];
        return ConversationModel.fromJson(responseData);
      } else {
        throw Exception('Failed to get conversation');
      }
    } catch (e) {
      throw Exception('Failed to get conversation: $e');
    }
  }
}