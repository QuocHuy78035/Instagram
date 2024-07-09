import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/core/error/failure.dart';
import 'package:instagram_clone/core/usecase/usecase.dart';
import 'package:instagram_clone/src/modules/home/domain/repos/create_story_repo.dart';

class UserCreateStory extends UserCase{
  final CreateStoryRepo _createStoryRepo;

  UserCreateStory(this._createStoryRepo);
  @override
  Future<Either<Failure, dynamic>> call(params) {
    return _createStoryRepo.createStory(params);
  }
}