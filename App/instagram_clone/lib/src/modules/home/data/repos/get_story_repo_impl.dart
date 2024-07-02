import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/core/error/failure.dart';
import 'package:instagram_clone/src/modules/home/data/datasources/get_story_data_src.dart';
import 'package:instagram_clone/src/modules/home/data/models/story_user_model.dart';
import 'package:instagram_clone/src/modules/home/domain/repos/get_story_repo.dart';

class GetStoryRepoImpl implements GetStoryRepo{
  final GetStoryDataSrc _getStoryDataSrc;
  GetStoryRepoImpl(this._getStoryDataSrc);
  @override
  Future<Either<Failure, List<StoryUserModel>>> getStory() async{
    try {
      final stories = await _getStoryDataSrc.getStory();
      return Right(stories);
    } catch(e){
      return Left(Failure(e.toString()));
    }
  }

}