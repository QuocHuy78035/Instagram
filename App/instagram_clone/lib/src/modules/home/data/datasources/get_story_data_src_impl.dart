import 'package:instagram_clone/core/network/api_client.dart';
import 'package:instagram_clone/core/network/api_endpoint_urls.dart';
import 'package:instagram_clone/src/modules/home/data/models/story_user_model.dart';

import 'get_story_data_src.dart';

class GetStoryDataSrcImpl implements GetStoryDataSrc{
  final ApiClient _apiClient;
  GetStoryDataSrcImpl(this._apiClient);
  @override
  Future<List<StoryUserModel>> getStory() async {
    final response = await _apiClient.getRequest(path: ApiEndpointUrls.getAllAnotherStory, isTokenRequired: true);
    if (response.statusCode == 200) {
      final Map<String, dynamic> responseData = response.data;
      final List<dynamic> storiesData = responseData['metadata']['followings'];
      List<StoryUserModel> stories = storiesData.map((data) => StoryUserModel.fromJson(data)).toList();
      return stories;
    } else {
      throw Exception('Failed to get all another stories');
    }
  }

}