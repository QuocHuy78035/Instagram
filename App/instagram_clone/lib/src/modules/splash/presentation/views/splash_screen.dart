import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:go_router/go_router.dart';
import 'package:instagram_clone/core/theme/app_assets.dart';
import '../../../../routes/app_route.dart';

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
    SchedulerBinding.instance.addPersistentFrameCallback((_) async{
      await Future.delayed(const Duration(seconds: 2));
      if(mounted){
        context.goNamed(AppRoute.login);
      }
    });
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
