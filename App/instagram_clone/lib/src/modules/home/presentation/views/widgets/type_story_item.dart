import 'package:flutter/material.dart';

class TypeStoryItem extends StatelessWidget {
  final String type;
  final IconData icon;

  const TypeStoryItem({super.key, required this.type, required this.icon});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 90,
      height: 80,
      decoration: BoxDecoration(
        color: Colors.grey.withOpacity(.4),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            icon,
            color: Colors.white,
          ),
          const SizedBox(
            height: 6,
          ),
          Text(
            type,
            style: const TextStyle(color: Colors.white),
          )
        ],
      ),
    );
  }
}
