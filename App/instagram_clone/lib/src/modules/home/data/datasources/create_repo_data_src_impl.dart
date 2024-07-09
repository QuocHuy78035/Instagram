import 'dart:io';
import 'package:dio/dio.dart';
import 'package:http_parser/http_parser.dart';
import 'package:instagram_clone/core/network/api_client.dart';
import 'package:instagram_clone/src/modules/home/data/datasources/create_story_data_src.dart';
import '../../../../../core/network/api_endpoint_urls.dart';

class CreateRepoDataSrcImpl implements CreateStoryDataSrc {
  final ApiClient _apiClient;

  CreateRepoDataSrcImpl(this._apiClient);

  @override
  Future createStory(File file) async {
    String fileName = file.path
        .split('/')
        .last;

    FormData formData = FormData.fromMap({
      "file":
      await MultipartFile.fromFile(file.path, filename: fileName,
        contentType: MediaType("image", "jpeg"),
      ),
      'text': '',
    });

    try {
      final response = await _apiClient.postRequest(
        path: ApiEndpointUrls.createStory,
        body: formData,
        isTokenRequired: true,
      );

      return response.statusCode == 201;
    } catch (e) {
      throw Exception('Failed to create story: $e');
    }
  }
}
