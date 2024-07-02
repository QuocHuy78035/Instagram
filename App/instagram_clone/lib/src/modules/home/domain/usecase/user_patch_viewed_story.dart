
import 'package:fpdart/fpdart.dart';
import '../../../../../core/error/failure.dart';
import '../../../../../core/usecase/usecase.dart';
import '../repos/patch_view_story_repo.dart';

class UserPatchViewedStory extends UserCase{
  final PatchViewStoryRepo _patchViewStoryRepo;

  UserPatchViewedStory(this._patchViewStoryRepo);
  @override
  Future<Either<Failure, dynamic>> call(params) {
    return _patchViewStoryRepo.patchViewedStory(params);
  }
}