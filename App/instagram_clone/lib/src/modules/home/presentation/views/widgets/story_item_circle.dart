import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:instagram_clone/core/theme/app_color.dart';
import 'package:shimmer/shimmer.dart';

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
  final bool isYourStoryPosted;
  final bool isWatched;

  const StoryItem(
      {super.key,
      required this.onWatchYourStoryPressed,
      required this.onWatchOtherUserStoryPressed,
      required this.onPostYourStoryPressed,
      required this.ownerStory,
      this.isWatched = false,
      this.height = 96,
      this.width = 70,
      required this.imageUrl,
      this.isOtherUserPostStory = true,
      this.isYourStoryPosted = false});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: isOtherUserPostStory == false
          ? isYourStoryPosted == true
              ? onWatchYourStoryPressed
              : onPostYourStoryPressed
          : onWatchOtherUserStoryPressed,
      child: Container(
        height: height,
        width: width,
        decoration: const BoxDecoration(
          shape: BoxShape.circle,
        ),
        child: Column(
          children: [
            Stack(
              children: [
                ClipRRect(
                  child: Container(
                    margin: isOtherUserPostStory == true
                        ? const EdgeInsets.all(2)
                        : const EdgeInsets.all(2),
                    child: Padding(
                      padding: const EdgeInsets.all(2),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(50),
                        child: CachedNetworkImage(
                          imageUrl: imageUrl,
                          fit: BoxFit.fill,
                          placeholder: (context, url) => SizedBox(
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
                  ),
                ),
                isOtherUserPostStory == true
                    ? isWatched == false
                        ? Positioned(
                            child: Image.asset("assets/images/story_oval.png"),
                          )
                        : Positioned(
                            child: Image.asset(
                                "assets/images/story_oval_watched.png"),
                          )
                    : isYourStoryPosted == false
                        ? Positioned(
                            right: 0,
                            bottom: 0,
                            child: Container(
                              height: 26,
                              width: 26,
                              decoration: BoxDecoration(
                                  border:
                                      Border.all(color: Colors.white, width: 2),
                                  shape: BoxShape.circle,
                                  color: AppColor.primaryColor),
                              child: const Icon(
                                Icons.add,
                                color: AppColor.whiteColor,
                                size: 20,
                              ),
                            ))
                        : isWatched == false
                            ? Image.asset("assets/images/story_oval.png")
                            : Positioned(
                                child: Image.asset(
                                    "assets/images/story_oval_watched.png"),
                              )
              ],
            ),
            const SizedBox(
              height: 6,
            ),
            isOtherUserPostStory == false
                ? const Text("Your story")
                : Text(ownerStory)
          ],
        ),
      ),
    );
  }
}
