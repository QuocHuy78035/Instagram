import 'package:flutter/material.dart';
import 'package:instagram_clone/core/constants/my_colors.dart';

class StoryItem extends StatelessWidget {
  //xem story cua nguoi khac: onWatchOtherUserStoryPressed
  //chua post Story va thuc hien post story cua minh: onPostYourStoryPressed
  //da post story va xem lai story post cua minh: onWatchYourStoryPressed

  final void Function() onWatchYourStoryPressed;
  final void Function() onWatchOtherUserStoryPressed;
  final void Function() onPostYourStoryPressed;
  final String imageUrl;
  final double? height;
  final double? width;
  final String ownerStory;
  final bool isOtherUserPostStory;
  final bool isYourStoryPost;
  final bool isWatched;

  const StoryItem(
      {super.key,
      required this.onWatchYourStoryPressed,
      required this.onWatchOtherUserStoryPressed,
      required this.onPostYourStoryPressed,
      required this.ownerStory,
      this.isWatched = false,
      this.height = 66,
      this.width = 66,
      required this.imageUrl,
      this.isOtherUserPostStory = true,
      this.isYourStoryPost = false});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: isOtherUserPostStory == false
          ? isYourStoryPost == true
              ? onWatchYourStoryPressed
              : onPostYourStoryPressed
          : onWatchOtherUserStoryPressed,
      child: Container(
        height: height,
        width: width,
        decoration: const BoxDecoration(
          shape: BoxShape.circle,
        ),
        child: Stack(
          children: [
            ClipRRect(
              child: Container(
                margin: isOtherUserPostStory == true
                    ? const EdgeInsets.all(4)
                    : const EdgeInsets.all(3),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(50),
                  child: Image.asset("assets/images/Rectangle.png"),
                ),
              ),
            ),
            isOtherUserPostStory == true
                ? isWatched == false
                    ? Positioned(
                        child: Image.asset("assets/images/story_oval.png"),
                      )
                    : Positioned(
                        child:
                            Image.asset("assets/images/story_oval_watched.png"),
                      )
                : isYourStoryPost == false
                    ? Positioned(
                        right: 0,
                        bottom: 0,
                        child: Container(
                          height: 26,
                          width: 26,
                          decoration: BoxDecoration(
                              border: Border.all(color: Colors.white, width: 2),
                              shape: BoxShape.circle,
                              color: MyColors.primaryColor),
                          child: const Icon(
                            Icons.add,
                            color: MyColors.whiteColor,
                            size: 20,
                          ),
                        ))
                    : isWatched == false
                        ? Positioned(
                            child: Image.asset("assets/images/story_oval.png"),
                          )
                        : Positioned(
                            child: Image.asset(
                                "assets/images/story_oval_watched.png"),
                          )
          ],
        ),
      ),
    );
  }
}
