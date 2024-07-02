import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:shimmer/shimmer.dart';
import 'package:story_view/controller/story_controller.dart';
import 'package:story_view/utils.dart';
import 'package:story_view/widgets/story_view.dart';

class StoryTextOnlyItem extends StatefulWidget {
  final String avtUrl;
  final String timeOver;
  final String caption;
  final String nameUser;

  const StoryTextOnlyItem({
    super.key,
    required this.caption,
    required this.avtUrl,
    required this.timeOver,
    required this.nameUser,
  });

  @override
  State<StoryTextOnlyItem> createState() => _StoryTextOnlyItemState();
}

class _StoryTextOnlyItemState extends State<StoryTextOnlyItem> {
  final StoryController storyController = StoryController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            StoryView(
              storyItems: [
                StoryItem.text(
                  title: widget.caption,
                  backgroundColor: Colors.blue,
                ),
              ],
              onStoryShow: (storyItem, index) {
                print("Showing a story");
              },
              onComplete: () {
                print("Completed a cycle");
                context.pop();
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
                    widget.timeOver,
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
