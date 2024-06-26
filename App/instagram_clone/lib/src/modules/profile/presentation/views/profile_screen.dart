import 'package:flutter/material.dart';
import 'package:instagram_clone/core/theme/app_assets.dart';

import '../../../../widgets/base_button.dart';
import '../../../home/presentation/views/widgets/story_item.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Image.asset(
              AppAssets.privateIcon,
              height: 12,
              width: 9,
            ),
            SizedBox(
              width: 8,
            ),
            Text(
              "User name",
              style: TextStyle(fontSize: 19, fontWeight: FontWeight.bold),
            ),
            Icon(Icons.arrow_drop_down_rounded)
          ],
        ),
        actions: [
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 16),
            child: Image.asset(
              AppAssets.menuIcon,
              height: 18,
              width: 21,
            ),
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                StoryItem(
                  height: 86,
                  width: 86,
                  onWatchYourStoryPressed: () {},
                  onWatchOtherUserStoryPressed: () {},
                  onPostYourStoryPressed: () {},
                  ownerStory: "",
                  imageUrl: "",
                  isOtherUserPostStory: false,
                  //isYourStoryPost: true,
                  //isWatched: false,
                ),
                Column(
                  children: [
                    Text(
                      "0",
                      style:
                      TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                    ),
                    Text("posts")
                  ],
                ),
                Column(
                  children: [
                    Text(
                      "10",
                      style:
                      TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                    ),
                    Text("followers")
                  ],
                ),
                Column(
                  children: [
                    Text(
                      "120",
                      style:
                      TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                    ),
                    Text("followings")
                  ],
                ),
              ],
            ),
            SizedBox(
              height: 10,
            ),
            Text(
              "User Name",
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            Text("Try hard plssss"),
            SizedBox(
              height: 20,
            ),
            BaseButton(title: "Edit profile", onPressed: (){}, height: 36,),
            SizedBox(
              height: 20,
            ),
            Column(
              children: [
                GestureDetector(
                  onTap: (){},
                  child: Container(
                    height: 66,
                    width: 66,
                    decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(
                            color: Color(0xffc7c7cc)
                        )
                    ),
                    child: Center(
                      child: Icon(Icons.add, size: 30,),
                    ),
                  ),
                ),
                Text("New")
              ],
            )
          ],
        ),
      ),
    );
  }
}