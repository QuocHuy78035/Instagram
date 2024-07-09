import '../models/story_model.dart';
import '../models/story_user_model.dart';

abstract class GetStoryDataSrc{
  Future<List<StoryUserModel>> getStory();
  Future<List<StoryModel>> getYourStory();
}