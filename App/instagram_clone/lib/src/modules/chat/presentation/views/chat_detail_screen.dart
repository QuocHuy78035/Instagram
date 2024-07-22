import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:instagram_clone/src/modules/chat/presentation/views/widgets/chat_item_friend.dart';
import 'package:instagram_clone/src/modules/chat/presentation/views/widgets/chat_item_me.dart';
import 'package:shimmer/shimmer.dart';

class DetailChatScreen extends StatefulWidget {
  final String userChatAvt;
  final String userChatName;

  const DetailChatScreen({super.key, required this.userChatAvt, required this.userChatName});

  @override
  State<DetailChatScreen> createState() => _DetailChatScreenState();
}

class _DetailChatScreenState extends State<DetailChatScreen> with WidgetsBindingObserver {
  final ScrollController _scrollController = ScrollController();
  final TextEditingController _textController = TextEditingController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _textController.dispose();
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }
  //
  // @override
  // void didChangeMetrics() {
  //   super.didChangeMetrics();
  //   if (MediaQuery.of(context).viewInsets.bottom == 0) {
  //     // Keyboard is hidden
  //   } else {
  //     // Keyboard is shown
  //     _scrollToBottom();
  //   }
  // }

  void _scrollToBottom() {
    _scrollController.animateTo(
      _scrollController.position.maxScrollExtent,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeOut,
    );
  }

  void _sendMessage() {
    // Implement sending message logic here
    // For example, add message to a list and clear text field
    _textController.clear();
    // Optionally scroll to bottom after sending message
    _scrollToBottom();
  }

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
            Text(
              widget.userChatName,
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            )
          ],
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView(
              reverse: true, // Ensures the list scrolls to bottom by default
              controller: _scrollController,
              padding: const EdgeInsets.symmetric(horizontal: 10),
              children: [
                ChatItemFriend(message: 'fhkjlhkjlhkjh'),
                ChatItemMe(message: "1234"),
                ChatItemFriend(message: 'wqeurhkjasdhfjkhasduifyiuwyueyrusdfkjhaksdhfkalhsdkjlfhkjlhkjlhkjh'),
                ChatItemMe(message: "1234"),
                ChatItemFriend(message: 'hasduifyiuwyueyrusdfkjhaksdhfkalhsdkjlfhkjlhkjlhkjh'),
                ChatItemMe(message: "1234hasduifyiuwyueyrusdfkjhaksdhfkalhsdkjlfhkjlhkjlhkjh"),
                ChatItemFriend(message: 'fhkjlhkjlhkjh'),
                ChatItemMe(message: "1234"),
                ChatItemFriend(message: 'wqeurhkjasdhfjkhasduifyiuwyueyrusdfkjhaksdhfkalhsdkjlfhkjlhkjlhkjh'),
                ChatItemMe(message: "1234"),
                ChatItemFriend(message: 'hasduifyiuwyueyrusdfkjhaksdhfkalhsdkjlfhkjlhkjlhkjh'),
                ChatItemMe(message: "1234hasduifyiuwyueyrusdfkjhaksdhfkalhsdkjlfhkjlhkjlhkjh"),
              ],
            ),
          ),
          const SizedBox(
            height: 30,
          ),
          Container(
            height: 50,
            margin: const EdgeInsets.symmetric(horizontal: 10),
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
            decoration: BoxDecoration(
              color: Colors.grey.withOpacity(0.4),
              borderRadius: BorderRadius.circular(20)
            ),
            child: Row(
              children: [
                Expanded(
                  child: TextFormField(
                    controller: _textController,
                    decoration: InputDecoration(
                      hintText: 'Type your message...',
                      border: InputBorder.none,
                    ),
                  ),
                ),
                IconButton(
                  icon: Icon(Icons.send),
                  onPressed: _sendMessage,
                ),
              ],
            ),
          ),
          const SizedBox(
            height: 30,
          )
        ],
      ),
    );
  }
}
