import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/core/error/failure.dart';
import 'package:instagram_clone/core/usecase/usecase.dart';
import 'package:instagram_clone/src/modules/home/data/models/story_user_model.dart';
import 'package:instagram_clone/src/modules/home/domain/repos/get_story_repo.dart';

class UserGetStory extends UserCase{
  final GetStoryRepo _getStoryRepo;

  UserGetStory(this._getStoryRepo);
  @override
  Future<Either<Failure, List<StoryUserModel>>> call(params) {
    return _getStoryRepo.getStory();
  }
}