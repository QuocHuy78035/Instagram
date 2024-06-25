import 'package:flutter/material.dart';
import 'package:instagram_clone/core/theme/app_assets.dart';
import 'package:instagram_clone/src/modules/home/presentation/views/widgets/story_item.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';

import '../../../../../core/theme/app_color.dart';


class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final PageController _pageController = PageController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Image.asset(
              AppAssets.instagramTextLogo,
              width: 115,
              height: 38,
            ),
          ],
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                Image.asset(
                  AppAssets.heartIcon,
                  height: 24,
                ),
                SizedBox(
                  width: 20,
                ),
                Image.asset(
                  AppAssets.messageIcon,
                  height: 26,
                ),
              ],
            ),
          )
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                children: [
                  StoryItem(
                    imageUrl: "",
                    onPostYourStoryPressed: () {
                      print("post story");
                    },
                    onWatchOtherUserStoryPressed: () {
                      print("watch another user story");
                    },
                    onWatchYourStoryPressed: () {
                      print("watch your story");
                    },
                    ownerStory: "",
                    isYourStoryPost: false,
                    isOtherUserPostStory: false,
                  ),
                  SizedBox(
                    width: 20,
                  ),
                  StoryItem(
                    ownerStory: "",
                    imageUrl: "",
                    isOtherUserPostStory: true,
                    onPostYourStoryPressed: () {
                      print("post story");
                    },
                    onWatchOtherUserStoryPressed: () {
                      print("watch another user story");
                    },
                    onWatchYourStoryPressed: () {
                      print("watch your story");
                    },
                  )
                ],
              ),
            ),
            SizedBox(
              height: 20,
            ),
            Container(
              height: 1,
              width: MediaQuery.of(context).size.width,
              color: AppColor.greyColor,
            ),
            SizedBox(
              height: 20,
            ),
            Column(
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            height: 32,
                            width: 32,
                            decoration: const BoxDecoration(shape: BoxShape.circle),
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(50),
                              child: Image.asset("assets/images/Rectangle.png"),
                            ),
                          ),
                          SizedBox(
                            width: 10,
                          ),
                          Text(
                            "Quoc Huy",
                            style: TextStyle(
                                fontWeight: FontWeight.w600, fontSize: 15),
                          )
                        ],
                      ),
                      Image.asset(
                        AppAssets.moreIcon,
                        height: 3,
                        width: 14,
                      )
                    ],
                  ),
                ),
                SizedBox(
                  height: 14,
                ),
                SizedBox(
                  height: 375,
                  child: PageView.builder(
                    itemCount: 3,
                    controller: _pageController,
                    scrollDirection: Axis.horizontal,
                    itemBuilder: (BuildContext context, int index) {
                      return Stack(
                        children: [
                          SizedBox(
                            height: 375,
                            width: MediaQuery.of(context).size.width,
                            child: Image.asset(
                              "assets/images/Rectangle.png",
                              fit: BoxFit.fill,
                            ),
                          ),
                          Positioned(
                            right: 10,
                            top: 10,
                            child: Container(
                              height: 26,
                              width: 36,
                              decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(12),
                                  color: Color(0xff424242)),
                              child: Center(
                                child: Text(
                                  "${index + 1}/3",
                                  style: TextStyle(color: AppColor.whiteColor),
                                ),
                              ),
                            ),
                          )
                        ],
                      );
                    },
                  ),
                ),
                SizedBox(
                  height: 14,
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        flex: 1,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Image.asset(
                              AppAssets.heartIcon,
                              height: 21,
                              width: 24,
                            ),
                            SizedBox(
                              width: 18,
                            ),
                            Image.asset(
                              AppAssets.commentIcon,
                              height: 23,
                              width: 22,
                            ),
                            SizedBox(
                              width: 18,
                            ),
                            Image.asset(
                              AppAssets.shareIcon,
                              height: 20,
                              width: 23,
                            ),
                          ],
                        ),
                      ),
                      Expanded(
                        flex: 1,
                        child: Center(
                          child: SmoothPageIndicator(
                              controller: _pageController,
                              count: 3,
                              effect: const WormEffect(
                                dotColor: Colors.grey,
                                activeDotColor: AppColor.primaryColor,
                                dotHeight: 8,
                                dotWidth: 8,
                              ), // your preferred effect
                              onDotClicked: (index) {}),
                        ),
                      ),
                      Expanded(
                        flex: 1,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            Image.asset(
                              AppAssets.saveIcon,
                              width: 21,
                              height: 24,
                            )
                          ],
                        ),
                      )
                    ],
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Text("100 Likes", style: TextStyle(fontWeight: FontWeight.bold),),
                    ],
                  ),
                )
              ],
            )
          ],
        ),
      ),
    );
  }
}

