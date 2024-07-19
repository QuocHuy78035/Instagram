import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/core/error/failure.dart';

import '../../data/models/conversation_model.dart';

abstract class GetConversationRepo{
  Future<Either<Failure, ConversationModel>> getConversation(String conversationId);
}