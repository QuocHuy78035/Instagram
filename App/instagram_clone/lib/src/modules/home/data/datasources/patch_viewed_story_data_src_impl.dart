import 'package:instagram_clone/src/modules/home/data/datasources/patch_viewed_story_data_src.dart';
import '../../../../../core/network/api_client.dart';

class PatchViewedStoryDataSrcImpl implements PatchViewedStoryDataSrc{
  final ApiClient _apiClient;
  PatchViewedStoryDataSrcImpl(this._apiClient);
  @override
  Future patchViewedStory(String storyId) async{
    final response = await _apiClient.patchRequest(path: "story/$storyId/userViewed", isTokenRequired: true);
    if (response.statusCode == 200) {
      // final Map<String, dynamic> responseData = response.data;
      // final List<dynamic> storiesData = responseData['metadata']['followings'];
      // List<StoryUserModel> stories = storiesData.map((data) => StoryUserModel.fromJson(data)).toList();
      // return stories;
      return true;
    } else {
      throw Exception('Failed to patch viewed story');
    }
  }

}