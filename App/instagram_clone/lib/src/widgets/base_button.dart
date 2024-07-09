import 'package:flutter/material.dart';

import '../../core/theme/app_color.dart';

class BaseButton extends StatelessWidget {
  final Widget title;
  final double? height;
  final void Function()? onPressed;

  const BaseButton({super.key, required this.title, required this.onPressed, this.height = 50});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColor.primaryColor,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(25),
        ),
        minimumSize: Size(MediaQuery.of(context).size.width, height!),
      ),
      onPressed: onPressed,
      child: title,
    );
  }
}
