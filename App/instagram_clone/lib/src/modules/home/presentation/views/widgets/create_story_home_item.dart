import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:image_picker/image_picker.dart';
import 'package:instagram_clone/src/modules/home/presentation/bloc/home_bloc.dart';
import 'package:instagram_clone/src/modules/home/presentation/views/widgets/type_story_item.dart';
import 'package:instagram_clone/src/modules/main/presentation/views/main_screen.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:story_maker/story_maker.dart';

class CreateStoryHomeItem extends StatefulWidget {
  const CreateStoryHomeItem({super.key});

  @override
  State<CreateStoryHomeItem> createState() => _CreateStoryHomeItemState();
}

class _CreateStoryHomeItemState extends State<CreateStoryHomeItem> {
  File? image;

  createStory(File file) {
    context.read<HomeBloc>().add(CreateStory(file: file));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: const Text(
          "Add to your story",
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        centerTitle: true,
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: const Icon(
            Icons.close,
            color: Colors.white,
            size: 22,
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10),
        child: Center(
          child: Column(
            children: [
              const SizedBox(
                height: 20,
              ),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    BlocConsumer<HomeBloc, HomeState>(
                        builder: (context, state) {
                      return GestureDetector(
                        onTap: () async {
                          image = await _handleImagePick(ImageSource.camera);
                          if (image != null) {
                            createStory(image!);
                          }
                        },
                        child: const TypeStoryItem(
                            type: "Camera", icon: (Icons.camera_alt_outlined)),
                      );
                    }, listener: (context, state) {
                      if (state is CreateStoryLoading) {
                        EasyLoading.show(status: 'Please wait.');
                      }
                      if (state is CreateStorySuccess) {
                        EasyLoading.dismiss();
                        Navigator.pushAndRemoveUntil(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const MainScreen()),
                          (Route<dynamic> route) => false,
                        );
                      }
                    }),
                    const SizedBox(
                      width: 20,
                    ),
                    BlocConsumer<HomeBloc, HomeState>(
                        builder: (context, state) {
                          return GestureDetector(
                            onTap: () async {
                              image = await _handleImagePick(ImageSource.gallery);
                              if (image != null) {
                                createStory(image!);
                              }
                            },
                            child: const TypeStoryItem(
                                type: "Photos", icon: (Icons.photo_outlined)),
                          );
                        }, listener: (context, state) {
                      if (state is CreateStoryLoading) {
                        EasyLoading.show(status: 'Please wait.');
                      }
                      if (state is CreateStorySuccess) {
                        EasyLoading.dismiss();
                        Navigator.pushAndRemoveUntil(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const MainScreen()),
                              (Route<dynamic> route) => false,
                        );
                      }
                    }),
                    const SizedBox(
                      width: 20,
                    ),
                    GestureDetector(
                      // onTap: () async {
                      //   await [
                      //     Permission.photos,
                      //     Permission.storage,
                      //   ].request();
                      //   final picker = ImagePicker();
                      //   await picker
                      //       .pickVideo(source: ImageSource.gallery)
                      //       .then((file) async {
                      //     final File editedFile =
                      //         await Navigator.of(context).push(
                      //       MaterialPageRoute(
                      //         builder: (context) => StoryMaker(
                      //           filePath: file!.path,
                      //         ),
                      //       ),
                      //     );
                      //     setState(() {
                      //       image = editedFile;
                      //     });
                      //     if (kDebugMode) {
                      //       print('editedFile: ${image.path}');
                      //     }
                      //   });
                      // },
                      child: const TypeStoryItem(
                          type: "Videos",
                          icon: (Icons.slow_motion_video_rounded)),
                    )
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<File?> _handleImagePick(ImageSource source) async {
    File? editedFile;
    await Permission.storage.request();
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: source);

    if (pickedFile != null) {
      if(mounted){
        editedFile = await Navigator.of(context).push<File?>(
          MaterialPageRoute(
            builder: (context) => StoryMaker(
              filePath: pickedFile.path,
            ),
          ),
        );
      }
    }
    return editedFile;
  }

// Future<void> _handleImagePick(ImageSource source) async {
//   await [
//     //Permission.photos,
//     Permission.storage,
//   ].request();
//   final picker = ImagePicker();
//   final pickedFile = await picker.pickImage(source: source);
//
//   if (pickedFile != null) {
//     if (mounted) {
//       final editedFile = await Navigator.of(context).push<File?>(
//         MaterialPageRoute(
//           builder: (context) => StoryMaker(
//             filePath: pickedFile.path,
//           ),
//         ),
//       );
//       if (editedFile != null) {
//         // setState(() {
//         //   image = editedFile;
//         // });
//         if (mounted) {
//           context.read<HomeBloc>().add(CreateStory(file: editedFile));
//         }
//         if (kDebugMode) {
//           print('editedFile: ${image.path}');
//         }
//       }
//     }
//   }
// }
}
