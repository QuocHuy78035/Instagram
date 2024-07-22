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
    return ConversationModel(
      id: json['_id'],
      participants: (json['participants'] as List)
          .map((participant) => ParticipantModel.fromJson(participant))
          .toList(),
      type: json['type'],
      messages: (json['messages'] as List)
          .map((messageGroup) => MessageGroupModel.fromJson(messageGroup))
          .toList(),
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