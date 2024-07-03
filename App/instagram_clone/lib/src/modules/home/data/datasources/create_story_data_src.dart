import 'dart:io';

abstract class CreateStoryDataSrc{
  Future<dynamic> createStory(File file);
}