import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:go_router/go_router.dart';
import 'package:instagram_clone/core/theme/app_assets.dart';
import 'package:instagram_clone/src/extensions/flushbar_extension.dart';
import 'package:instagram_clone/src/modules/auth/presentation/bloc/auth_bloc.dart';
import 'package:instagram_clone/src/routes/app_route.dart';
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
      backgroundColor: AppColor.whiteColor,
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
    return SingleChildScrollView(
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10),
        height: MediaQuery.of(context).size.height,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFFe5d3d3), Color(0xFFf7f4f4)],
          ),
        ),
        child: Form(
          key: formKeyBody,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const SizedBox(
                height: 49 * 3,
              ),
              Center(
                child: SvgPicture.asset(
                  AppAssets.instagramIcon,
                  height: 70,
                ),
              ),
              const SizedBox(
                height: 80,
              ),
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
              const SizedBox(
                height: 20,
              ),
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
              const SizedBox(
                height: 40,
              ),
              BlocConsumer<AuthBloc, AuthState>(
                builder: (context, state) {
                  return BaseButton(
                    title: 'Login',
                    onPressed: () {
                      if (formKeyBody.currentState!.validate()) {
                        context.read<AuthBloc>().add(
                              LoginEvent(
                                emailOrPhone: emailController.text.trim(),
                                password: passController.text.trim(),
                              ),
                            );
                      }
                    },
                  );
                },
                listener: (context, state) {
                  if (state is AuthLoadingState) {
                    EasyLoading.show();
                  }
                  if (state is AuthErrorState) {
                    EasyLoading.dismiss();
                    context.flushBarErrorMessage(message: state.errorMessage);
                  } else if (state is LoggedInState) {
                    EasyLoading.dismiss();
                    context.pushReplacement(AppRoute.main);
                  }
                },
              ),
              const SizedBox(
                height: 30,
              ),
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
                        //fontWeight: FontWeight.bold,
                      ),
                    ),
                  )
                ],
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
