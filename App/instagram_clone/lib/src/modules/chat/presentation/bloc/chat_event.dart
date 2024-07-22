import 'package:equatable/equatable.dart';

abstract class ChatEvent extends Equatable{
  const ChatEvent();

  @override
  // TODO: implement props
  List<Object?> get props => [];
}

class CreateConversationEvent extends ChatEvent{
  final List<String> userId;
  const CreateConversationEvent({required this.userId});

  @override
  // TODO: implement props
  List<Object?> get props => [userId];
}

class CreateChatEvent extends ChatEvent{
  final String conversationId;
  final String message;
  const CreateChatEvent({required this.conversationId, required this.message});

  @override
  // TODO: implement props
  List<Object?> get props => [conversationId, message];
}

class GetConversationEvent extends ChatEvent{
  final String conversationId;
  const GetConversationEvent({required this.conversationId});
}