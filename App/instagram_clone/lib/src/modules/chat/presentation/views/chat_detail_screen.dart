import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

class DetailChatScreen extends StatefulWidget {
  final String userChatAvt;
  final String userChatName;
  const DetailChatScreen({super.key, required this.userChatAvt, required this.userChatName});

  @override
  State<DetailChatScreen> createState() => _DetailChatScreenState();
}

class _DetailChatScreenState extends State<DetailChatScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: Row(
          children: [
            SizedBox(
              height: 35,
              width: 35,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(50),
                child: CachedNetworkImage(
                  imageUrl:
                  "https://firebasestorage.googleapis.com/v0/b/insta-ebedc.appspot.com/o/users%2Fimages%2F143086968_2856368904622192_1959732218791162458_n.png?alt=media&token=77e45ba1-a6c1-444d-bbaf-05c13e01cf43",
                  fit: BoxFit.fill,
                  placeholder: (context, url) => SizedBox(
                    width: 35,
                    height: 35,
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
                    width: 35,
                    height: 35,
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
            const SizedBox(
              width: 10,
            ),
            Text(widget.userChatName, style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),)
          ],
        ),
      ),
    );
  }
}
