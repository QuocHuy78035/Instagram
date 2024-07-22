import 'package:flutter/material.dart';

class ChatItemMe extends StatelessWidget {
  final String message;

  const ChatItemMe(
      {super.key, required this.message});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.centerRight,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                constraints: BoxConstraints(
                    maxWidth: MediaQuery.of(context).size.width * .7),
                decoration: BoxDecoration(
                  color: Colors.blue,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(message, style: const TextStyle(fontSize: 16, color: Colors.white),),
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
