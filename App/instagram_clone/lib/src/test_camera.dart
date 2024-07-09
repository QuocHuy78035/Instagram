import 'dart:io';
import 'package:permission_handler/permission_handler.dart';
import 'package:story_maker/story_maker.dart';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class TestCamera extends StatefulWidget {
  const TestCamera({super.key});

  @override
  State<TestCamera> createState() => _TestCameraState();
}

class _TestCameraState extends State<TestCamera> {
  File? image;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Story Designer Example'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () async {
                await [
                  Permission.photos,
                  Permission.storage,
                ].request();
                final picker = ImagePicker();
                await picker
                    .pickImage(source: ImageSource.camera)
                    .then((file) async {
                  final File editedFile = await Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (context) => StoryMaker(
                        filePath: file!.path,
                      ),
                    ),
                  );
                  setState(() {
                    image = editedFile;
                  });
                  print('editedFile: ${image!.path}');
                });
              },
              child: const Text('Pick Image'),
            ),
            if (image != null)
              Expanded(
                child: Image.file(image!),
              ),
          ],
        ),
      ),
    );
  }
}
