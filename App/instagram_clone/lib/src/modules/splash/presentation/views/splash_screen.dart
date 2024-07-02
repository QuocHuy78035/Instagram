import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:instagram_clone/core/local_db_config/init_local_db.dart';
import 'package:instagram_clone/core/theme/app_assets.dart';
import 'package:instagram_clone/src/modules/auth/presentation/views/login_remember_screen.dart';
import 'package:instagram_clone/src/modules/auth/presentation/views/login_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    navigateToNextScreen();
  }

  Future<void> navigateToNextScreen() async {
    await Future.delayed(const Duration(seconds: 2));

    String? accessToken = SharedPreferencesRepository.getString('accessToken');
    if (mounted && accessToken.isNotEmpty && accessToken != '') {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => const LoginRememberScreen(),
        ),
      );
    } else if (mounted) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => const LoginScreen(),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SvgPicture.asset(
          AppAssets.instagramIcon,
          height: 88,
        ),
      ),
    );
  }
}
