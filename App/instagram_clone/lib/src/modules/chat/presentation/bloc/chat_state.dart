import 'package:flutter/cupertino.dart';

@immutable
sealed class ChatState {}

final class ChatInitial extends ChatState {}

class ChatLoadingState extends ChatState{}

class CreateChatSuccess extends ChatState{}

class CreateChatError extends ChatState{}

class CreateConversationSuccess extends ChatState{}

class CreateConversationError extends ChatState{}