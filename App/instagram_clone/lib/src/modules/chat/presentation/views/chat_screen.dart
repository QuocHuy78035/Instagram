import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:instagram_clone/src/modules/chat/presentation/bloc/chat_bloc.dart';
import 'package:instagram_clone/src/modules/chat/presentation/bloc/chat_event.dart';
import 'package:instagram_clone/src/modules/chat/presentation/views/chat_detail_screen.dart';
import 'package:shimmer/shimmer.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import '../../../../../core/local_db_config/init_local_db.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  late IO.Socket socket;

  createConversation() {
    List<String> userId = [
      '667cfe153ad266535e7910be',
      '666c2e1f1ad808d2cf9de960'
    ];
    //context.read<ChatBloc>().add(CreateConversationEvent(userId: userId));
    //context.read<ChatBloc>().add(CreateChatEvent(conversationId: "6699fd83588708bf9be7b7c6", message: "Hello"));
  }

  @override
  void initState() {
    // TODO: implement initState
    socket = IO.io(
        'http://192.168.1.2:3000',
        IO.OptionBuilder()
            .setTransports(['websocket'])
            .disableAutoConnect()
            .build());
    socket.connect();
    createConversation();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final avt = SharedPreferencesRepository.getString('avt');
    final username = SharedPreferencesRepository.getString('userName');
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: Text(
          username,
          style: const TextStyle(fontSize: 25),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(
              height: 20,
            ),
            Container(
              decoration: BoxDecoration(
                  color: Colors.grey.withOpacity(.2),
                  border: Border.all(color: Colors.white),
                  borderRadius: BorderRadius.circular(10)),
              width: MediaQuery.of(context).size.width,
              child: TextFormField(
                decoration: InputDecoration(
                  contentPadding:
                      const EdgeInsets.symmetric(horizontal: 10, vertical: 2),
                  prefixIcon: const Icon(Icons.search),
                  hintText: "Search",
                  enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: const BorderSide(color: Colors.white)),
                  focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: const BorderSide(color: Colors.white)),
                ),
              ),
            ),
            const SizedBox(
              height: 30,
            ),
            GestureDetector(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => DetailChatScreen(
                      userChatAvt:
                          "https://firebasestorage.googleapis.com/v0/b/insta-ebedc.appspot.com/o/users%2Fimages%2F143086968_2856368904622192_1959732218791162458_n.png?alt=media&token=77e45ba1-a6c1-444d-bbaf-05c13e01cf43",
                      userChatName: "long2k5",
                    ),
                  ),
                );
              },
              child: Column(
                children: [
                  SizedBox(
                    height: 55,
                    width: 55,
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(50),
                      child: CachedNetworkImage(
                        imageUrl:
                            "https://firebasestorage.googleapis.com/v0/b/insta-ebedc.appspot.com/o/users%2Fimages%2F143086968_2856368904622192_1959732218791162458_n.png?alt=media&token=77e45ba1-a6c1-444d-bbaf-05c13e01cf43",
                        fit: BoxFit.fill,
                        placeholder: (context, url) => SizedBox(
                          width: 55,
                          height: 55,
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
                          width: 55,
                          height: 55,
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
                    height: 10,
                  ),
                  const Text(
                    'long2k5',
                    style: TextStyle(fontWeight: FontWeight.w400, fontSize: 16),
                  )
                ],
              ),
            ),
            const SizedBox(
              height: 20,
            ),
            Text(
              'Message',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            )
          ],
        ),
      ),
    );
  }
}
