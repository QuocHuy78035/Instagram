import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:instagram_clone/src/modules/chat/data/models/conversation_model.dart';
import 'package:instagram_clone/src/modules/chat/presentation/bloc/chat_state.dart';
import 'package:instagram_clone/src/modules/chat/presentation/views/widgets/chat_item_friend.dart';
import 'package:instagram_clone/src/modules/chat/presentation/views/widgets/chat_item_me.dart';
import 'package:shimmer/shimmer.dart';

import '../../../../../core/local_db_config/init_local_db.dart';
import '../bloc/chat_bloc.dart';
import '../bloc/chat_event.dart';

import 'package:socket_io_client/socket_io_client.dart' as IO;

class DetailChatScreen extends StatefulWidget {
  final String conversationId;
  final String userChatAvt;
  final String userChatName;

  const DetailChatScreen(
      {super.key,
      required this.userChatAvt,
      required this.userChatName,
      required this.conversationId});

  @override
  State<DetailChatScreen> createState() => _DetailChatScreenState();
}

class _DetailChatScreenState extends State<DetailChatScreen>
    with WidgetsBindingObserver {
  final ScrollController _scrollController = ScrollController();
  final TextEditingController _textController = TextEditingController();
  ConversationModel? conversation;
  dynamic userOnlId;

  IO.Socket? socket;

  getConversation() {
    context
        .read<ChatBloc>()
        .add(GetConversationEvent(conversationId: widget.conversationId));
  }

  @override
  void initState() {
    super.initState();
    //_initSocket();
    getConversation();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    //_disconnectSocket();
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

  // void _sendMessage(String userId) {
  //   final message = _textController.text.trim();
  //   if (message.isNotEmpty && socket != null) {
  //     socket!.emit('sendMessage', {
  //       'conversationId': widget.conversationId,
  //       'senderId': userId, // Replace with actual sender ID
  //       'message': message,
  //     });
  //     _textController.clear();
  //     _scrollToBottom();
  //   }
  // }

  List<Map<String, dynamic>> extractMessages(
      Map<String, dynamic>? conversationJson) {
    List<Map<String, dynamic>> result = [];

    if (conversationJson != null && conversationJson.containsKey('messages')) {
      final messages = conversationJson['messages'] as List?;

      if (messages != null) {
        for (var messageGroup in messages) {
          final date = messageGroup['date'];
          final messages = messageGroup['messages'] as List?;

          if (messages != null) {
            for (var message in messages) {
              final messageId = message['_id'];
              final senderId = message['senderId'];
              final messageText = message['message'];

              result.add({
                'date': date,
                'messageId': messageId,
                'senderId': senderId,
                'message': messageText,
              });
            }
          }
        }
      }
    }

    return result;
  }

  void _initSocket() {
    socket = IO.io('http://192.168.1.2:3000', <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': false,
    });

    socket?.onConnect((_) {
      print('Socket connected');

      socket?.on('newMessage', (data) {
        print('New message received: $data');
        // Refresh conversation or update state
        getConversation();
        _scrollToBottom(); // Optional: scroll to bottom when new message arrives
      });
    });

    socket?.onDisconnect((_) {
      print('Socket disconnected');
    });



    socket?.on('getOnlineUsers', (data){
      print(data);
    });

    socket?.connect();
  }

  void _disconnectSocket() {
    if (socket != null) {
      socket?.disconnect();
    }
  }

  @override
  Widget build(BuildContext context) {
    final userId = SharedPreferencesRepository.getString('userId');
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
                  imageUrl: widget.userChatAvt,
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
          BlocBuilder<ChatBloc, ChatState>(builder: (context, state) {
            if (state is GetConversationSuccess) {
              conversation = state.conversationModel;
            } else if (state is ChatLoadingState || conversation == null) {
              return const CircularProgressIndicator();
            }

            final messages = extractMessages(conversation!.toJson());

            return Expanded(
              child: ListView.builder(
                itemCount: messages.length,
                reverse: true,
                controller: _scrollController,
                padding: const EdgeInsets.symmetric(horizontal: 10),
                itemBuilder: (BuildContext context, int index) {
                  return Column(
                    children: [
                      if (index == 0 ||
                          messages[index]['date'] !=
                              messages[index - 1]['date'])
                        Column(
                          children: [
                            const SizedBox(
                              height: 20,
                            ),
                            Text(messages[index]['date'])
                          ],
                        ),
                      messages[index]['senderId'] == userId
                          ? ChatItemMe(message: messages[index]['message'])
                          : ChatItemFriend(
                              avtUrl: widget.userChatAvt,
                              message: messages[index]['message'])
                    ],
                  );
                },
              ),
            );
          }),
          const SizedBox(
            height: 30,
          ),
          Container(
            height: 50,
            margin: const EdgeInsets.symmetric(horizontal: 10),
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
            decoration: BoxDecoration(
                color: Colors.grey.withOpacity(0.4),
                borderRadius: BorderRadius.circular(20)),
            child: Row(
              children: [
                Expanded(
                  child: TextFormField(
                    controller: _textController,
                    decoration: const InputDecoration(
                      hintText: 'Type your message...',
                      border: InputBorder.none,
                    ),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.send),
                  onPressed: () {
                    //_sendMessage(userId);
                  },
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
