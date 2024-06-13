import 'package:shared_preferences/shared_preferences.dart';

class Utils{

  static Future<void> manipulateLogin(context) async {
    var token = await getToken();
    if (token != '' || token != null) {
      //push Home Screen
    } else {
      //Push login screen
    }
  }

  static Future<void> saveToken(String token) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString("accessToken", token);
  }

  static Future<String?> getToken() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString("accessToken");
  }

  static Future<void> clearAllSavedData() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.clear();
  }
}

