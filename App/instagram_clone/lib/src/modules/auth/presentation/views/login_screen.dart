import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:instagram_clone/core/theme/app_assets.dart';
import 'package:instagram_clone/src/extensions/flushbar_extension.dart';
import 'package:instagram_clone/src/modules/auth/presentation/bloc/auth_bloc.dart';
import 'package:instagram_clone/src/modules/main/presentation/views/main_screen.dart';
import '../../../../../core/theme/app_color.dart';
import '../../../../widgets/base_button.dart';
import '../../../../widgets/base_input.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passController = TextEditingController();
  final GlobalKey<FormState> _key = GlobalKey();

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
    emailController.dispose();
    passController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: _BodyLogin(
        emailController: emailController,
        passController: passController,
        formKeyBody: _key,
      ),
    );
  }
}

class _BodyLogin extends StatelessWidget {
  final TextEditingController emailController;
  final TextEditingController passController;
  final GlobalKey<FormState> formKeyBody;

  const _BodyLogin(
      {required this.emailController,
      required this.passController,
      required this.formKeyBody});

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      scrollDirection: Axis.vertical,
      slivers: [
        SliverFillRemaining(
          hasScrollBody: false,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: Form(
              key: formKeyBody,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const SizedBox(
                    height: 30,
                  ),
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Center(
                          child: SvgPicture.asset(
                            AppAssets.instagramIcon,
                            height: 70,
                          ),
                        ),
                        const SizedBox(height: 80),
                        BaseInput(
                          validator: (value) {
                            if (value!.isEmpty) {
                              return "Please enter your email.";
                            }
                            return null;
                          },
                          hintText: "Email or mobile number",
                          controller: emailController,
                        ),
                        const SizedBox(height: 20),
                        BaseInput(
                          validator: (value) {
                            if (value!.isEmpty) {
                              return "Please enter your password.";
                            }
                            return null;
                          },
                          hintText: "Password",
                          isPass: true,
                          controller: passController,
                        ),
                        const SizedBox(height: 40),
                        BlocConsumer<AuthBloc, AuthState>(
                          builder: (context, state) {
                            return BaseButton(
                              title: state is AuthLoadingState ? const Center(
                                child: CircularProgressIndicator(color: Colors.white,),
                              ) : const Text(
                                "Log in",
                                style: TextStyle(fontSize: 18, color: AppColor.whiteColor),
                              ),
                              onPressed: () {
                                if (formKeyBody.currentState!.validate()) {
                                  context.read<AuthBloc>().add(
                                        LoginEvent(
                                          emailOrPhone:
                                              emailController.text.trim(),
                                          password: passController.text.trim(),
                                        ),
                                      );
                                }
                              },
                            );
                          },
                          listener: (context, state) {
                            // if (state is AuthLoadingState) {
                            //   EasyLoading.show();
                            // }
                            if (state is AuthErrorState) {
                              //EasyLoading.dismiss();
                              context.flushBarErrorMessage(
                                  message: state.errorMessage);
                            } else if (state is LoggedInState) {
                              //EasyLoading.dismiss();

                              //remove another routes
                              Navigator.pushAndRemoveUntil(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => const MainScreen(),
                                ),
                                (Route<dynamic> route) => false,
                              );
                            }
                          },
                        ),
                        const SizedBox(height: 30),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            TextButton(
                              onPressed: () {},
                              child: const Text(
                                "Forgot password?",
                                style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 16,
                                ),
                              ),
                            )
                          ],
                        ),
                        const Spacer(), // Pushes the next column to the bottom
                      ],
                    ),
                  ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      OutlinedButton(
                        style: OutlinedButton.styleFrom(
                          minimumSize:
                              Size(MediaQuery.of(context).size.width, 50),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(25),
                          ),
                          side: const BorderSide(color: AppColor.primaryColor),
                        ),
                        onPressed: () {
                          // Action to perform when create account button is pressed
                        },
                        child: const Text(
                          "Create new account",
                          style: TextStyle(
                              fontSize: 18, color: AppColor.primaryColor),
                        ),
                      ),
                      const SizedBox(height: 10), // Adjust spacing as needed
                      Image.asset(
                        AppAssets.instagramImageLogo,
                        height: 70,
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}
