import 'dart:io';

import 'package:fpdart/fpdart.dart';

import '../../../../../core/error/failure.dart';

abstract class CreateStoryRepo{
  Future<Either<Failure, dynamic>> createStory(File file);

}