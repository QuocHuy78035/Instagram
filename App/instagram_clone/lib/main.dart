import 'package:flutter/material.dart';
import 'package:instagram_clone/src/modules/instagram_app.dart';
import 'core/local_db_config/init_local_db.dart';
import 'di/di_config.dart' as di;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await di.init();
  await SharedPreferencesRepository.init();
  runApp(const InstagramApp());
}
