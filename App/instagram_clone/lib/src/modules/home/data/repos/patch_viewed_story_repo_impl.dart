import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/core/error/failure.dart';
import 'package:instagram_clone/src/modules/home/data/datasources/patch_viewed_story_data_src.dart';
import 'package:instagram_clone/src/modules/home/domain/repos/patch_view_story_repo.dart';

class PatchViewedStoryRepoImpl implements PatchViewStoryRepo{
  final PatchViewedStoryDataSrc _patchViewedStoryDataSrc;
  PatchViewedStoryRepoImpl(this._patchViewedStoryDataSrc);

  @override
  Future<Either<Failure, dynamic>> patchViewedStory(String storyId) async{
    try {
      final stories = await _patchViewedStoryDataSrc.patchViewedStory(storyId);
      return Right(stories);
    } catch(e){
      return Left(Failure(e.toString()));
    }
  }

}