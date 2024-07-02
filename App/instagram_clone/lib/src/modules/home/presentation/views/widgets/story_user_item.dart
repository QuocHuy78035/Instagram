import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';
import 'package:story_view/controller/story_controller.dart';
import 'package:story_view/utils.dart';
import 'package:story_view/widgets/story_view.dart';

class StoryUserItem extends StatefulWidget {
  final String avtUrl;
  final List<String> timeOver;
  final List<String> storyUrl;
  final int total;
  final List<String> caption;
  final String nameUser;

  const StoryUserItem({
    super.key,
    required this.caption,
    required this.storyUrl,
    required this.total,
    required this.avtUrl,
    required this.timeOver,
    required this.nameUser,
  });

  @override
  State<StoryUserItem> createState() => _StoryUserItemState();
}

class _StoryUserItemState extends State<StoryUserItem> {
  final StoryController storyController = StoryController();
  int _currentIndex = 0;

  @override
  void initState() {
    super.initState();
  }



  @override
  Widget build(BuildContext context) {
    List<StoryItem> storyItems = [];
    for (int i = 0; i < widget.total; i++) {
      storyItems.add(
        StoryItem.pageImage(
          url: widget.storyUrl[i],
          caption: Text(
            widget.caption[i],
            style: const TextStyle(
              fontSize: 15,
              color: Colors.white,
            ),
            textAlign: TextAlign.center,
          ),
          controller: storyController,
        ),
      );
    }

    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            StoryView(
              storyItems: storyItems,
              // storyItems: [
              //   StoryItem.pageImage(
              //     url: widget.storyUrl,
              //     caption: Text(
              //       widget.caption,
              //       style: const TextStyle(
              //         fontSize: 15,
              //         color: Colors.white,
              //       ),
              //       textAlign: TextAlign.center,
              //     ),
              //     controller: storyController,
              //   ),
              // ],
              onStoryShow: (storyItem, index) {
                if (kDebugMode) {
                  print("Showing a story at $index");
                }
                if(index == 1){
                  _currentIndex = index;
                }
              },
              onComplete: () {
                if (kDebugMode) {
                  print("Completed a cycle");
                }
                Navigator.pop(context);
              },
              progressPosition: ProgressPosition.top,
              repeat: false,
              controller: storyController,
              onVerticalSwipeComplete: (direction) {
                if (direction == Direction.down) {
                  Navigator.pop(context);
                }
              },
            ),
            Positioned(
              top: 26,
              left: 20,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(50),
                child: CachedNetworkImage(
                  height: 40,
                  width: 40,
                  imageUrl: widget.avtUrl,
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
              ),
            ),
            Positioned(
              top: 26,
              left: 80,
              child: Row(
                children: [
                  Text(
                    widget.nameUser,
                    style: const TextStyle(
                        color: Colors.white,
                        fontSize: 18,
                        fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(
                    width: 10,
                  ),
                  Text(
                    widget.timeOver[_currentIndex],
                    style: const TextStyle(fontSize: 18, color: Colors.white),
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
