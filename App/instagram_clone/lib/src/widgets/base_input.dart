import 'package:flutter/material.dart';

import '../../core/theme/app_color.dart';

class BaseInput extends StatefulWidget {
  final String? hintText;
  final void Function(String)? onChanged;
  final String? Function(String?)? validator;
  final Icon? icon;
  final bool? isPass;
  final TextInputAction? action;
  final TextInputType? keyBoardType;
  final TextEditingController? controller;

  const BaseInput({
    super.key,
    this.hintText,
    this.onChanged,
    this.validator,
    this.icon,
    this.controller,
    this.action,
    this.keyBoardType,
    this.isPass = false,
  });

  @override
  State<BaseInput> createState() => _BaseInputState();
}

class _BaseInputState extends State<BaseInput> {
  bool isHiddenPass = true;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 60,
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(.3),
        borderRadius: BorderRadius.circular(5),
      ),
      child: TextFormField(

        controller: widget.controller,
        keyboardType: widget.keyBoardType,
        textInputAction: widget.action,
        onChanged: widget.onChanged,
        obscureText: widget.isPass == true ? isHiddenPass : false,
        validator: widget.validator,
        decoration: InputDecoration(
          prefixIcon: widget.icon,
          hintText: widget.hintText,
          hintStyle: TextStyle(color: AppColor.greyColor),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(5),
          ),
          enabledBorder: OutlineInputBorder(
            borderSide: BorderSide(
              color: Colors.grey.withOpacity(0.8),
            ),
            borderRadius: BorderRadius.circular(5),
          ),
          errorBorder: OutlineInputBorder(
            borderSide: const BorderSide(
              color: AppColor.errorColor,
            ),
            borderRadius: BorderRadius.circular(5),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: const BorderSide(
              color: AppColor.primaryColor,
            ),
            borderRadius: BorderRadius.circular(5),
          ),
          suffixIcon: widget.isPass == true
              ? GestureDetector(
                  onTap: () {
                    setState(
                      () {
                        isHiddenPass = !isHiddenPass;
                      },
                    );
                  },
                  child: isHiddenPass == true
                      ? const Icon(Icons.visibility)
                      : const Icon(Icons.visibility_off),
                )
              : null,
        ),
      ),
    );
  }
}
