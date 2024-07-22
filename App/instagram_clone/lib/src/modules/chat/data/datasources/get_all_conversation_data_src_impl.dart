import 'package:instagram_clone/core/network/api_client.dart';
import 'package:instagram_clone/src/modules/chat/data/models/conversation_model.dart';

import '../../../../../core/network/api_endpoint_urls.dart';
import 'get_all_conversation_data_src.dart';

class GetAllConversationDataSrcImpl implements GetAllConversationDataSrc{
  final ApiClient _apiClient;
  GetAllConversationDataSrcImpl(this._apiClient);
  @override
  Future<List<ConversationModel>> getAllConversation() async{
    try {
      final response = await _apiClient.getRequest(
        path: ApiEndpointUrls.conversation,
        isTokenRequired: true,
      );

      if (response.statusCode == 200) {
        final List<dynamic> responseData = response.data['metadata']['conversations'];
        return responseData
            .map((conversationJson) => ConversationModel.fromJson(conversationJson))
            .toList();
      } else {
        throw Exception('Failed to get conversation');
      }
    } catch (e) {
      throw Exception('Failed to get conversation: $e');
    }
  }
}