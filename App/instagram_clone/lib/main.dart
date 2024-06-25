import 'package:flutter/material.dart';
import 'package:instagram_clone/src/modules/instagram_app.dart';
import 'package:instagram_localization/strings.g.dart';
import 'di/di_container.dart';

void main() async{
  WidgetsFlutterBinding.ensureInitialized();
  await initDi();
  runApp(TranslationProvider(
    child: const InstagramApp(),
  ));
}


