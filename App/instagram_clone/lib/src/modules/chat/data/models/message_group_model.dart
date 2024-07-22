import 'package:instagram_clone/src/modules/chat/data/models/message_model.dart';

class MessageGroupModel {
  String date;
  DateTime fullDate;
  List<MessageModel> messages;

  MessageGroupModel({
    required this.date,
    required this.fullDate,
    required this.messages,
  });

  factory MessageGroupModel.fromJson(Map<String, dynamic> json) {
    return MessageGroupModel(
      date: json['date'],
      fullDate: DateTime.parse(json['fullDate']),
      messages: (json['messages'] as List)
          .map((message) => MessageModel.fromJson(message))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'date': date,
      'fullDate': fullDate.toIso8601String(),
      'messages': messages.map((message) => message.toJson()).toList(),
    };
  }
}