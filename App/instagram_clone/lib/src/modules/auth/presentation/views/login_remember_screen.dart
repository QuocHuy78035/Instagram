import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:instagram_clone/core/local_db_config/init_local_db.dart';
import 'package:instagram_clone/core/theme/app_assets.dart';
import 'package:instagram_clone/src/modules/auth/presentation/bloc/auth_bloc.dart';
import 'package:instagram_clone/src/modules/auth/presentation/views/login_screen.dart';
import 'package:instagram_clone/src/modules/main/presentation/views/main_screen.dart';
import 'package:shimmer/shimmer.dart';

import '../../../../../core/theme/app_color.dart';
import '../../../../widgets/base_button.dart';

class LoginRememberScreen extends StatelessWidget {
  const LoginRememberScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final avt = SharedPreferencesRepository.getString('avt');
    final userName = SharedPreferencesRepository.getString('userName');
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10),
          child: Column(
            children: [
              const SizedBox(
                height: 40,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SvgPicture.asset(
                    AppAssets.instagramIcon,
                    height: 55,
                  ),
                ],
              ),
              const SizedBox(
                height: 30,
              ),
              Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(color: Colors.grey.withOpacity(.1), width: 5),
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(100),
                  child: CachedNetworkImage(
                    imageUrl: avt,
                    fit: BoxFit.fill,
                    width: 160,
                    placeholder: (context, url) => SizedBox(
                      width: 160,
                      height: 160,
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
                    errorWidget: (context, url, error) =>
                        const Icon(Icons.error),
                  ),
                ),
              ),
              const SizedBox(
                height: 30,
              ),
              Text(
                userName,
                style:
                    const TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
              ),
              const SizedBox(
                height: 50,
              ),
              BlocConsumer<AuthBloc, AuthState>(builder: (context, state) {
                return BaseButton(
                  title: 'Login',
                  onPressed: () {
                    final emailOrPhone =
                        SharedPreferencesRepository.getString("emailOrPhone");
                    final password =
                        SharedPreferencesRepository.getString("password");
                    context.read<AuthBloc>().add(
                          LoginEvent(
                              emailOrPhone: emailOrPhone, password: password),
                        );
                  },
                );
              }, listener: (context, state) {
                if (state is AuthLoadingState) {
                  EasyLoading.show();
                }
                if (state is LoggedInState) {
                  EasyLoading.dismiss();
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const MainScreen(),
                    ),
                  );
                }
              }),
              const SizedBox(
                height: 20,
              ),
              OutlinedButton(
                style: OutlinedButton.styleFrom(
                  minimumSize: Size(MediaQuery.of(context).size.width, 50),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(25),
                  ),
                  side: const BorderSide(color: Colors.grey),
                ),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const LoginScreen(),
                    ),
                  );
                },
                child: const Text(
                  "Log into another account",
                  style: TextStyle(fontSize: 18, color: Colors.black),
                ),
              ),
              const Spacer(),
              OutlinedButton(
                style: OutlinedButton.styleFrom(
                  minimumSize: Size(MediaQuery.of(context).size.width, 50),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(25),
                  ),
                  side: const BorderSide(color: AppColor.primaryColor),
                ),
                onPressed: () {},
                child: const Text(
                  "Create new account",
                  style: TextStyle(fontSize: 18, color: AppColor.primaryColor),
                ),
              ),
              Image.asset(
                AppAssets.instagramImageLogo,
                height: 70,
              )
            ],
          ),
        ),
      ),
    );
  }
}
