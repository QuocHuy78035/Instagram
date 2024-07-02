import 'package:instagram_clone/src/modules/home/domain/entities/story_data.dart';

class StoryModel extends StoryData {
  const StoryModel(
      {required super.id,
      required super.userId,
      required super.image,
      required super.text,
      required super.posted});

  factory StoryModel.fromJson(Map<String, dynamic> json) {
    return StoryModel(
      id: json['_id'],
      userId: json['userId'],
      image: json['image'],
      text: json['text'],
      posted: json['posted'],
    );
  }
}

