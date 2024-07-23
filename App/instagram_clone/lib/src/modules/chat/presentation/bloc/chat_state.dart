import 'package:flutter/cupertino.dart';
import 'package:instagram_clone/src/modules/auth/data/models/user_model.dart';
import 'package:instagram_clone/src/modules/chat/data/models/conversation_model.dart';

@immutable
sealed class ChatState {}

final class ChatInitial extends ChatState {}

class ChatLoadingState extends ChatState{}

class CreateChatSuccess extends ChatState{}

class CreateChatError extends ChatState{}

class CreateConversationSuccess extends ChatState{}

class CreateConversationError extends ChatState{}

class GetConversationSuccess extends ChatState{
  final ConversationModel conversationModel;
  GetConversationSuccess({required this.conversationModel});
}

class GetConversationError extends ChatState{}

class GetAllConversationSuccess extends ChatState{
  final List<ConversationModel> listConversationModel;
  GetAllConversationSuccess({required this.listConversationModel});
}

class GetAllConversationError extends ChatState{}

class GetUserOnlineSuccess extends ChatState{
  final List<UserModel> userModels;
  GetUserOnlineSuccess({required this.userModels});
}

class GetUserOnlineError extends ChatState{}