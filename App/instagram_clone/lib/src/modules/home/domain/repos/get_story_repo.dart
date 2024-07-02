import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/core/error/failure.dart';
import 'package:instagram_clone/src/modules/home/data/models/story_user_model.dart';

abstract class GetStoryRepo{
  Future<Either<Failure, List<StoryUserModel>>> getStory();
}