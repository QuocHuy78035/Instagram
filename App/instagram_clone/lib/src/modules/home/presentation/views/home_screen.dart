import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:instagram_clone/core/local_db_config/init_local_db.dart';
import 'package:instagram_clone/core/theme/app_assets.dart';
import 'package:instagram_clone/src/modules/home/presentation/bloc/home_bloc.dart';
import 'package:instagram_clone/src/modules/home/presentation/views/widgets/story_item_circle.dart';
import 'package:instagram_clone/src/modules/home/presentation/views/widgets/story_user_item.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';
import '../../../../../core/theme/app_color.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final PageController _pageController = PageController();
  final avt = SharedPreferencesRepository.getString('avt');

  getStories() {
    context.read<HomeBloc>().add(GetAllAnotherStory());
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getStories();
  }

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
                const SizedBox(
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
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10),
              child: Row(
                children: [
                  StoryItem(
                    imageUrl: avt,
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
                  const SizedBox(
                    width: 20,
                  ),
                  Expanded(
                    child: BlocConsumer<HomeBloc, HomeState>(
                      builder: (context, state) {
                        if (state is GetAllAnotherStorySuccess) {
                          return SizedBox(
                            height: 96,
                            child: ListView.builder(
                              shrinkWrap: true,
                              scrollDirection: Axis.horizontal,
                              itemCount: state.stories.length,
                              itemBuilder: (context, index) {
                                return Row(
                                  children: [
                                    StoryItem(
                                      isWatched: state.stories[index].viewed,
                                      onPostYourStoryPressed: () {
                                        print("post story");
                                      },
                                      onWatchOtherUserStoryPressed: () {
                                        List<String> caption = [];
                                        List<String> storyUrl = [];
                                        List<String> timeOver = ["2h", "6h"];
                                        print("watch another user story");
                                        for (int i = 0;
                                            i <
                                                state.stories[index].stories
                                                    .length;
                                            i++) {
                                          caption.add(state
                                              .stories[index].stories[i].text);
                                          storyUrl.add(state
                                              .stories[index].stories[i].image);
                                        }
                                        Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                            builder: (context) => StoryUserItem(
                                              caption: caption,
                                              storyUrl: storyUrl,
                                              total: state.stories[index]
                                                  .stories.length,
                                              avtUrl:
                                                  state.stories[index].avatar,
                                              timeOver: timeOver,
                                              nameUser:
                                                  state.stories[index].username,
                                            ),
                                          ),
                                        );
                                      },
                                      onWatchYourStoryPressed: () {
                                        print("watch your story");
                                      },
                                      ownerStory: state.stories[index].username,
                                      imageUrl: state.stories[index].avatar,
                                    ),
                                    const SizedBox(
                                      width: 20,
                                    )
                                  ],
                                );
                              },
                            ),
                          );
                        } else {
                          return Container();
                        }
                      },
                      listener: (context, state) {},
                    ),
                  )
                ],
              ),
            ),
            const SizedBox(
              height: 20,
            ),
            Container(
              height: 1,
              width: MediaQuery.of(context).size.width,
              color: AppColor.greyColor,
            ),
            const SizedBox(
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
                            height: 36,
                            width: 36,
                            decoration:
                                const BoxDecoration(shape: BoxShape.circle),
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(50),
                              //child: Image.asset("assets/images/Rectangle.png"),
                              child: Image.network(avt),
                            ),
                          ),
                          const SizedBox(
                            width: 10,
                          ),
                          Text(
                            'userName',
                            style: const TextStyle(
                                fontWeight: FontWeight.w600, fontSize: 16),
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
                      Text(
                        "100 Likes",
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
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
