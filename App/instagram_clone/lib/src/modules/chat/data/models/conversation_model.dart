import 'package:instagram_clone/src/modules/chat/data/models/message_group_model.dart';
import 'package:instagram_clone/src/modules/chat/data/models/participant_model.dart';

class ConversationModel {
  String id;
  List<ParticipantModel> participants;
  String type;
  List<MessageGroupModel> messages;

  ConversationModel({
    required this.id,
    required this.participants,
    required this.type,
    required this.messages,
  });

  factory ConversationModel.fromJson(Map<String, dynamic> json) {
    // Check if 'messages' key exists and if it's a non-empty list
    final messagesList = json['messages'] as List?;

    return ConversationModel(
      id: json['_id'],
      participants: (json['participants'] as List)
          .map((participant) => ParticipantModel.fromJson(participant))
          .toList(),
      type: json['type'],
      messages: messagesList != null
          ? messagesList
          .map((messageGroup) => MessageGroupModel.fromJson(messageGroup))
          .toList()
          : [], // If 'messages' key doesn't exist or is empty, assign an empty list
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'participants': participants.map((participant) => participant.toJson()).toList(),
      'type': type,
      'messages': messages.map((messageGroup) => messageGroup.toJson()).toList(),
    };
  }
}