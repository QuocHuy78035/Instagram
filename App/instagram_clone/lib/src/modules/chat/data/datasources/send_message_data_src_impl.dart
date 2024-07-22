import 'package:instagram_clone/core/network/api_client.dart';
import 'package:instagram_clone/src/modules/chat/data/datasources/send_message_data_src.dart';
import '../../../../../core/network/api_endpoint_urls.dart';

class SendMessageDataSrcImpl implements SendMessageDataSrc{
  final ApiClient _apiClient;
  SendMessageDataSrcImpl(this._apiClient);
  @override
  Future sendMessage(String conversationId, String message) async {
    Map<String, dynamic> body = {
      "conversation": conversationId,
      "message": message
    };
    final response = await _apiClient.postRequest(path: '${ApiEndpointUrls.message}/', isTokenRequired: true, body: body);
    if (response.statusCode == 200) {
      final Map<String, dynamic> responseData = response.data;
      return responseData;
    } else {
      throw Exception('Failed to send message');
    }
  }

}