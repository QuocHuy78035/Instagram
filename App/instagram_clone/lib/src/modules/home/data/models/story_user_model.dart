import 'package:instagram_clone/src/modules/home/data/models/story_model.dart';

class StoryUserModel{
  final String id;
  final String name;
  final String username;
  final String avatar;
  final List<StoryModel> stories;
  final bool viewed;

  const StoryUserModel({
    required this.id,
    required this.name,
    required this.username,
    required this.avatar,
    required this.stories,
    required this.viewed,
  });

  factory StoryUserModel.fromJson(Map<String, dynamic> json) {
    List<StoryModel> stories = [];
    if (json['stories'] != null) {
      stories = (json['stories'] as List)
          .map((storyJson) => StoryModel.fromJson(storyJson))
          .toList();
    }
    return StoryUserModel(
      id: json['_id'],
      name: json['name'],
      username: json['username'],
      avatar: json['avatar'],
      stories: stories,
      viewed: json['viewed'],
    );
  }
}