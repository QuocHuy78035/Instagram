import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/core/error/failure.dart';
import 'package:instagram_clone/core/usecase/usecase.dart';
import 'package:instagram_clone/src/modules/home/data/models/story_model.dart';
import 'package:instagram_clone/src/modules/home/domain/repos/get_story_repo.dart';

class UserGetYourStory extends UserCase{
  final GetStoryRepo _getStoryRepo;

  UserGetYourStory(this._getStoryRepo);
  @override
  Future<Either<Failure, List<StoryModel>>> call(params) {
    return _getStoryRepo.getYourStory();
  }
}