part of 'login_imports.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: MyColors.whiteColor,
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: SizedBox(
          height: MediaQuery.of(context).size.height,
          child: Column(
            children: [
              SizedBox(
                height: 49 * 3,
              ),
              Center(
                child: Image.asset(
                  MyAssets.instagramTextLogo,
                  height: 49,
                  width: 182,
                ),
              ),
              SizedBox(
                height: 60,
              ),
              BaseInput(
                hintText: "Email",
              ),
              SizedBox(
                height: 20,
              ),
              BaseInput(
                hintText: "Password",
                isPass: true,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton(
                    onPressed: () {},
                    child: Text(
                      "Forgot password?",
                      style: TextStyle(color: MyColors.primaryColor),
                    ),
                  )
                ],
              ),
              SizedBox(
                height: 40,
              ),
              BaseButton(
                title: 'Login',
                onPressed: () {},
              ),
              SizedBox(
                height: 50,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    height: 1,
                    width: 132,
                    color: MyColors.greyColor,
                  ),
                  Text(
                    "OR",
                    style: TextStyle(
                        color: MyColors.greyColor,
                        fontWeight: FontWeight.bold,
                        fontSize: 17),
                  ),
                  Container(
                    height: 1,
                    width: 132,
                    color: MyColors.greyColor,
                  ),
                ],
              ),
              SizedBox(
                height: 50,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    "Don't have account?",
                    style: TextStyle(color: MyColors.greyColor, fontSize: 16),
                  ),
                  TextButton(
                    onPressed: () {},
                    child: const Text(
                      "Sign up.",
                      style:
                          TextStyle(color: MyColors.primaryColor, fontSize: 16),
                    ),
                  )
                ],
              ),
              Spacer(),
              Image.asset(
                "assets/images/meta_logo.png",
                height: 30,
              )
            ],
          ),
        ),
      ),
    );
  }
}
