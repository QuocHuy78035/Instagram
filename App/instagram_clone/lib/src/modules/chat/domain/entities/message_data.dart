import 'package:equatable/equatable.dart';

class MessageData extends Equatable {
  final String id;
  final String senderId;
  final String message;
  final String conversationId;

  const MessageData(
      {required this.id,
      required this.senderId,
      required this.message,
      required this.conversationId});

  @override
  // TODO: implement props
  List<Object?> get props => [id, senderId, message, conversationId];
}
