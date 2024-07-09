import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';
import 'package:story_view/controller/story_controller.dart';
import 'package:story_view/utils.dart';
import 'package:story_view/widgets/story_view.dart';

class TestScreen extends StatelessWidget {
  final StoryController controller = StoryController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Delicious Ghanaian Meals"),
      ),
      body: Container(
        margin: EdgeInsets.all(
          8,
        ),
        child: ListView(
          children: <Widget>[
            Container(
              height: 300,
              child: StoryView(
                controller: controller,
                storyItems: [
                  StoryItem.text(
                    title:
                        "Hello world!\nHave a look at some great Ghanaian delicacies. I'm sorry if your mouth waters. \n\nTap!",
                    backgroundColor: Colors.orange,
                    roundedTop: true,
                  ),
                  // StoryItem.inlineImage(
                  //   NetworkImage(
                  //       "https://image.ibb.co/gCZFbx/Banku-and-tilapia.jpg"),
                  //   caption: Text(
                  //     "Banku & Tilapia. The food to keep you charged whole day.\n#1 Local food.",
                  //     style: TextStyle(
                  //       color: Colors.white,
                  //       backgroundColor: Colors.black54,
                  //       fontSize: 17,
                  //     ),
                  //   ),
                  // ),
                  StoryItem.inlineImage(
                    url:
                        "https://image.ibb.co/cU4WGx/Omotuo-Groundnut-Soup-braperucci-com-1.jpg",
                    controller: controller,
                    caption: Text(
                      "Omotuo & Nkatekwan; You will love this meal if taken as supper.",
                      style: TextStyle(
                        color: Colors.white,
                        backgroundColor: Colors.black54,
                        fontSize: 17,
                      ),
                    ),
                  ),
                  StoryItem.inlineImage(
                    url:
                        "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif",
                    controller: controller,
                    caption: Text(
                      "Hektas, sektas and skatad",
                      style: TextStyle(
                        color: Colors.white,
                        backgroundColor: Colors.black54,
                        fontSize: 17,
                      ),
                    ),
                  )
                ],
                onStoryShow: (storyItem, index) {
                  print("Showing a story");
                },
                onComplete: () {
                  print("Completed a cycle");
                },
                progressPosition: ProgressPosition.bottom,
                repeat: false,
                inline: true,
              ),
            ),
            Material(
              child: InkWell(
                onTap: () {
                  Navigator.of(context).push(
                      MaterialPageRoute(builder: (context) => MoreStories()));
                },
                child: Container(
                  decoration: BoxDecoration(
                      color: Colors.black54,
                      borderRadius:
                          BorderRadius.vertical(bottom: Radius.circular(8))),
                  padding: EdgeInsets.symmetric(vertical: 8),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Icon(
                        Icons.arrow_forward,
                        color: Colors.white,
                      ),
                      SizedBox(
                        width: 16,
                      ),
                      Text(
                        "View more stories",
                        style: TextStyle(fontSize: 16, color: Colors.white),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class MoreStories extends StatefulWidget {
  @override
  _MoreStoriesState createState() => _MoreStoriesState();
}

class _MoreStoriesState extends State<MoreStories> {
  final storyController = StoryController();

  @override
  void dispose() {
    storyController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            StoryView(
                storyItems: [
                  StoryItem.text(
                    title:
                        "I guess you'd love to see more of our food. That's great.",
                    backgroundColor: Colors.blue,
                  ),
                  StoryItem.text(
                    title: "Nice!\n\nTap to continue.",
                    backgroundColor: Colors.red,
                    textStyle: TextStyle(
                      fontFamily: 'Dancing',
                      fontSize: 40,
                    ),
                  ),
                  StoryItem.pageImage(
                    url:
                        "https://image.ibb.co/cU4WGx/Omotuo-Groundnut-Soup-braperucci-com-1.jpg",
                    caption: Text(
                      "Still sampling",
                      style: TextStyle(
                        fontSize: 15,
                        color: Colors.white,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    controller: storyController,
                  ),
                  StoryItem.pageImage(
                      url:
                          "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif",
                      caption: Text(
                        "Working with gifs",
                        style: TextStyle(
                          fontSize: 15,
                          color: Colors.white,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      controller: storyController),
                  StoryItem.pageImage(
                    url:
                        "https://media.giphy.com/media/XcA8krYsrEAYXKf4UQ/giphy.gif",
                    caption: Text(
                      "Hello, from the other side",
                      style: TextStyle(
                        fontSize: 15,
                        color: Colors.white,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    controller: storyController,
                  ),
                ],
                onStoryShow: (storyItem, index) {
                  print("Showing a story");
                },
                onComplete: () {
                  if (kDebugMode) {
                    print("Completed a cycle");
                  }
                },
                progressPosition: ProgressPosition.top,
                repeat: false,
                controller: storyController,
                onVerticalSwipeComplete: (direction) {
                  if (direction == Direction.down) {
                    Navigator.pop(context);
                  }
                }),
            Positioned(
              top: 26,
              left: 20,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(50),
                child: CachedNetworkImage(
                  height: 40,
                  width: 40,
                  imageUrl:
                      'https://firebasestorage.googleapis.com/v0/b/insta-ebedc.appspot.com/o/users%2Fimages%2F143086968_2856368904622192_1959732218791162458_n.png?alt=media&token=77e45ba1-a6c1-444d-bbaf-05c13e01cf43',
                  fit: BoxFit.fill,
                  placeholder: (context, url) => SizedBox(
                    width: 40,
                    height: 40,
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(100),
                      child: Shimmer.fromColors(
                        baseColor: Colors.grey.withOpacity(.1),
                        highlightColor: Colors.white,
                        child: Container(
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                  errorWidget: (context, url, error) => SizedBox(
                    width: 70,
                    height: 62,
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(100),
                      child: Shimmer.fromColors(
                        baseColor: Colors.grey.withOpacity(.1),
                        highlightColor: Colors.white,
                        child: Container(
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                ),
                //child: Image.network(imageUrl),
              ),
            ),
            Positioned(
              top: 26,
              left: 80,
              child: Row(
                children: [
                  Text(
                    "whyy",
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 18,
                        fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(
                    width: 10,
                  ),
                  Text(
                    '3h',
                    style: TextStyle(fontSize: 18, color: Colors.white),
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
