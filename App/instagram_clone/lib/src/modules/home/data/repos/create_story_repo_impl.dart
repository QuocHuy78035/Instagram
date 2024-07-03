import 'dart:io';
import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/core/error/failure.dart';
import 'package:instagram_clone/src/modules/home/data/datasources/create_story_data_src.dart';
import 'package:instagram_clone/src/modules/home/domain/repos/create_story_repo.dart';

class CreateStoryRepoImpl implements CreateStoryRepo{
  final CreateStoryDataSrc _createStoryDataSrc;
  CreateStoryRepoImpl(this._createStoryDataSrc);
  @override
  Future<Either<Failure, dynamic>> createStory(File file) async {
    try {
      final stories = await _createStoryDataSrc.createStory(file);
      return Right(stories);
    } catch(e){
      return Left(Failure(e.toString()));
    }
  }
}