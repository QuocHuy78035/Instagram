import 'package:fpdart/fpdart.dart';
import '../../../../../core/error/failure.dart';

abstract class PatchViewStoryRepo{
  Future<Either<Failure, dynamic>> patchViewedStory(String storyId);
}