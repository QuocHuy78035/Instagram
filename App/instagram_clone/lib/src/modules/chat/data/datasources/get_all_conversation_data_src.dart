import 'package:instagram_clone/src/modules/chat/data/models/conversation_model.dart';

abstract class GetAllConversationDataSrc{
  Future<List<ConversationModel>> getAllConversation();

}