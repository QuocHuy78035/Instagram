import 'dart:convert';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:instagram_clone/src/modules/chat/data/models/conversation_model.dart';
import 'package:instagram_clone/src/modules/chat/presentation/bloc/chat_bloc.dart';
import 'package:instagram_clone/src/modules/chat/presentation/bloc/chat_event.dart';
import 'package:instagram_clone/src/modules/chat/presentation/bloc/chat_state.dart';
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
  List<ConversationModel> conversations = [];
  dynamic userOnl;
  dynamic chat;
  List<dynamic> chatList = [];

  createConversation(List<String> userIds) {
    List<String> userId = [
      '667cfe153ad266535e7910be',
      '666c2e1f1ad808d2cf9de960'
    ];
    //context.read<ChatBloc>().add(GetConversationEvent(conversationId: '6699fd83588708bf9be7b7c6'));
    //context.read<ChatBloc>().add(CreateConversationEvent(userId: userId));
    //context.read<ChatBloc>().add(CreateChatEvent(conversationId: "6699fd83588708bf9be7b7c6", message: "Hello"));
    //context.read<ChatBloc>().add(GetAllConversationEvent());
    context.read<ChatBloc>().add(GetUserOnlineEvent(userId: userIds));
  }


  getAllConversation() {
    context.read<ChatBloc>().add(GetAllConversationEvent());
  }

  @override
  void initState() {
    // TODO: implement initState
    _initSocket();
    createConversation(chatList.cast<String>());
    getAllConversation();
    super.initState();
  }

  void _initSocket() {
    socket = IO.io('http://192.168.1.2:3000', <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': false,
    });

    socket.onConnect((_) {
      print('Socket connected');

      socket.on('newMessage', (data) {
        print('New message received: $data');
        // setState(() {
        //   chat = data;
        //   chatList.add(data);
        // });
      });

      socket.on('getOnlineUsers', (data) {
        print('User online: $data');
        if (mounted) {
          setState(() {
            userOnl = data;
          });
          print(userOnl);
          context.read<ChatBloc>().add(GetUserOnlineEvent(userId: userOnl.cast<String>()));
        }
      });

    });
    socket.connect();
  }

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
    socket.onDisconnect((_) {
      print('Socket disconnected');
    });
  }

  @override
  Widget build(BuildContext context) {
    SharedPreferencesRepository.getString('avt');
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
        child: BlocBuilder<ChatBloc, ChatState>(
          builder: (context, state) {
            if (state is GetAllConversationSuccess) {
              conversations = state.listConversationModel;
            } else if (state is ChatLoadingState) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            }
            if(state is GetUserOnlineSuccess){
              print('object ${state.userModels[0].userName}');

              return userOnl != null ? Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(
                    height: 20,
                  ),
                  Text('User Online $userOnl'),
                  Text('New Chat $chat'),
                  userOnl != null ? Text('Chat list ${userOnl.length}') : Container(),
                  Container(
                    decoration: BoxDecoration(
                        color: Colors.grey.withOpacity(.2),
                        border: Border.all(color: Colors.white),
                        borderRadius: BorderRadius.circular(10)),
                    width: MediaQuery.of(context).size.width,
                    child: TextFormField(
                      decoration: InputDecoration(
                        contentPadding: const EdgeInsets.symmetric(
                            horizontal: 10, vertical: 2),
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
                  SizedBox(
                    height: 90,
                    child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      itemCount: userOnl.length,
                      itemBuilder: (context, index) {
                        return GestureDetector(
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => DetailChatScreen(
                                  conversationId: conversations[index].id,
                                  userChatAvt:
                                  conversations[index].participants[0].avatar,
                                  userChatName: conversations[index].participants[0].userName,
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
                                    imageUrl: conversations[index]
                                        .participants[0]
                                        .avatar,
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
                                    errorWidget: (context, url, error) =>
                                        SizedBox(
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
                              Text(
                                conversations[index].participants[0].userName,
                                style: const TextStyle(
                                    fontWeight: FontWeight.w400, fontSize: 16),
                              )
                            ],
                          ),
                        );
                      },
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
              ) : Container();
            }
            return Container();
            // return Column(
            //   crossAxisAlignment: CrossAxisAlignment.start,
            //   children: [
            //     const SizedBox(
            //       height: 20,
            //     ),
            //     Text('User Online $userOnl'),
            //     Text('New Chat $chat'),
            //     userOnl != null ? Text('Chat list ${userOnl.length}') : Container(),
            //     Container(
            //       decoration: BoxDecoration(
            //           color: Colors.grey.withOpacity(.2),
            //           border: Border.all(color: Colors.white),
            //           borderRadius: BorderRadius.circular(10)),
            //       width: MediaQuery.of(context).size.width,
            //       child: TextFormField(
            //         decoration: InputDecoration(
            //           contentPadding: const EdgeInsets.symmetric(
            //               horizontal: 10, vertical: 2),
            //           prefixIcon: const Icon(Icons.search),
            //           hintText: "Search",
            //           enabledBorder: OutlineInputBorder(
            //               borderRadius: BorderRadius.circular(10),
            //               borderSide: const BorderSide(color: Colors.white)),
            //           focusedBorder: OutlineInputBorder(
            //               borderRadius: BorderRadius.circular(10),
            //               borderSide: const BorderSide(color: Colors.white)),
            //         ),
            //       ),
            //     ),
            //     const SizedBox(
            //       height: 30,
            //     ),
            //     SizedBox(
            //       height: 90,
            //       child: ListView.builder(
            //         scrollDirection: Axis.horizontal,
            //         itemCount: conversations.length,
            //         itemBuilder: (context, index) {
            //           return GestureDetector(
            //             onTap: () {
            //               Navigator.push(
            //                 context,
            //                 MaterialPageRoute(
            //                   builder: (context) => DetailChatScreen(
            //                     conversationId: conversations[index].id,
            //                     userChatAvt:
            //                     conversations[index].participants[0].avatar,
            //                     userChatName: conversations[index].participants[0].userName,
            //                   ),
            //                 ),
            //               );
            //             },
            //             child: Column(
            //               children: [
            //                 SizedBox(
            //                   height: 55,
            //                   width: 55,
            //                   child: ClipRRect(
            //                     borderRadius: BorderRadius.circular(50),
            //                     child: CachedNetworkImage(
            //                       imageUrl: conversations[index]
            //                           .participants[0]
            //                           .avatar,
            //                       fit: BoxFit.fill,
            //                       placeholder: (context, url) => SizedBox(
            //                         width: 55,
            //                         height: 55,
            //                         child: ClipRRect(
            //                           borderRadius: BorderRadius.circular(100),
            //                           child: Shimmer.fromColors(
            //                             baseColor: Colors.grey.withOpacity(.1),
            //                             highlightColor: Colors.white,
            //                             child: Container(
            //                               color: Colors.white,
            //                             ),
            //                           ),
            //                         ),
            //                       ),
            //                       errorWidget: (context, url, error) =>
            //                           SizedBox(
            //                             width: 55,
            //                             height: 55,
            //                             child: ClipRRect(
            //                               borderRadius: BorderRadius.circular(100),
            //                               child: Shimmer.fromColors(
            //                                 baseColor: Colors.grey.withOpacity(.1),
            //                                 highlightColor: Colors.white,
            //                                 child: Container(
            //                                   color: Colors.white,
            //                                 ),
            //                               ),
            //                             ),
            //                           ),
            //                     ),
            //                   ),
            //                 ),
            //                 const SizedBox(
            //                   height: 10,
            //                 ),
            //                 Text(
            //                   conversations[index].participants[0].userName,
            //                   style: const TextStyle(
            //                       fontWeight: FontWeight.w400, fontSize: 16),
            //                 )
            //               ],
            //             ),
            //           );
            //         },
            //       ),
            //     ),
            //     const SizedBox(
            //       height: 20,
            //     ),
            //     Text(
            //       'Message',
            //       style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            //     )
            //   ],
            // );
          },
        ),
      ),
    );
  }
}
