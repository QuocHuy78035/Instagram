import '../models/conversation_model.dart';

abstract class GetConversationDataSrc{
  Future<ConversationModel> getConversation(String conversationId);
}