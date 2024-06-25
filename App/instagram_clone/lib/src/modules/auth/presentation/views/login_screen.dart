import 'package:flutter/material.dart';
import 'package:instagram_clone/core/theme/app_assets.dart';

import '../../../../../core/theme/app_color.dart';
import '../../../../widgets/base_button.dart';
import '../../../../widgets/base_input.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColor.whiteColor,
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: SizedBox(
          height: MediaQuery.of(context).size.height,
          child: Column(
            children: [
              const SizedBox(
                height: 49 * 3,
              ),
              Center(
                child: Image.asset(
                  AppAssets.instagramTextLogo,
                  height: 49,
                  width: 182,
                ),
              ),
              const SizedBox(
                height: 60,
              ),
              const BaseInput(
                hintText: "Email",
              ),
              const SizedBox(
                height: 20,
              ),
              const BaseInput(
                hintText: "Password",
                isPass: true,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton(
                    onPressed: () {},
                    child: const Text(
                      "Forgot password?",
                      style: TextStyle(color: AppColor.primaryColor),
                    ),
                  )
                ],
              ),
              const SizedBox(
                height: 40,
              ),
              BaseButton(
                title: 'Login',
                onPressed: () {},
              ),
              const SizedBox(
                height: 50,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    height: 1,
                    width: 132,
                    color: AppColor.greyColor,
                  ),
                  Text(
                    "OR",
                    style: TextStyle(
                        color: AppColor.greyColor,
                        fontWeight: FontWeight.bold,
                        fontSize: 17),
                  ),
                  Container(
                    height: 1,
                    width: 132,
                    color: AppColor.greyColor,
                  ),
                ],
              ),
              const SizedBox(
                height: 50,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    "Don't have account?",
                    style: TextStyle(color: AppColor.greyColor, fontSize: 16),
                  ),
                  TextButton(
                    onPressed: () {},
                    child: const Text(
                      "Sign up.",
                      style:
                      TextStyle(color: AppColor.primaryColor, fontSize: 16),
                    ),
                  )
                ],
              ),
              const Spacer(),
              Image.asset(
                "assets/images/meta_logo.png",
                height: 70,
              )
            ],
          ),
        ),
      ),
    );
  }
}
