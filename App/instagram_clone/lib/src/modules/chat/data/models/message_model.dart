import 'package:instagram_clone/src/modules/chat/domain/entities/message_data.dart';

class MessageModel extends MessageData {
  const MessageModel(
      {required super.id,
      required super.senderId,
      required super.message,
      required super.conversationId});

  factory MessageModel.fromJson(Map<String, dynamic> json) {
    return MessageModel(
      id: json['_id'],
      senderId: json['senderId'],
      message: json['message'],
      conversationId: json['conversation'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'senderId': senderId,
      'message': message,
      'conversation': conversationId,
    };
  }
}
