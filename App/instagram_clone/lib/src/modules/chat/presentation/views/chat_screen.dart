import 'package:flutter/material.dart';

import '../../../../../core/local_db_config/init_local_db.dart';

class ChatScreen extends StatelessWidget {
  const ChatScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final avt =  SharedPreferencesRepository.getString('avt');
    final username = SharedPreferencesRepository.getString('userName');
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: Text(username, style: const TextStyle(fontSize: 25),),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          children: [
            const SizedBox(
              height: 20,
            ),
            Container(
              decoration: BoxDecoration(
                color: Colors.grey.withOpacity(.2),
                border: Border.all(
                  color: Colors.white
                ),
                borderRadius: BorderRadius.circular(10)
              ),
              width: MediaQuery.of(context).size.width,
              child: TextFormField(
                decoration: InputDecoration(
                  contentPadding: const EdgeInsets.symmetric(horizontal: 10, vertical: 2),
                  prefixIcon: const Icon(Icons.search),
                  hintText: "Search",
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide: const BorderSide(
                      color: Colors.white
                    )
                  ),
                  focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: const BorderSide(
                          color: Colors.white
                      )
                  ),
                ),
              ),
            ),
            
          ],
        ),
      ),
    );
  }
}
