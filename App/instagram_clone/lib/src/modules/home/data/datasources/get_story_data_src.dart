import '../models/story_user_model.dart';

abstract class GetStoryDataSrc{
  Future<List<StoryUserModel>> getStory();
}