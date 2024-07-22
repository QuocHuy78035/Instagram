import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

class ChatItemFriend extends StatelessWidget {
  final String message;

  const ChatItemFriend(
      {super.key, required this.message});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.centerLeft,
      child: Column(
        children: [
          Row(
            mainAxisSize: MainAxisSize.min,
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
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                constraints: BoxConstraints(
                    maxWidth: MediaQuery.of(context).size.width * .7),
                decoration: BoxDecoration(
                  color: Colors.grey.withOpacity(.2),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(message, style: const TextStyle(fontSize: 16),),
              )
            ],
          ),
          const SizedBox(
            height: 10,
          )
        ],
      ),
    );
  }
}
