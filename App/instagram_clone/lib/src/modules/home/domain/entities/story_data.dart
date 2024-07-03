import 'package:equatable/equatable.dart';

class StoryData extends Equatable {
  final String id;
  final String userId;
  final String image;
  final String text;
  final List<String> userViewed;
  final String posted;

  const StoryData(
      {required this.id,
      required this.userId,
        required this.userViewed,
      required this.image,
      required this.text,
      required this.posted});

  @override
  // TODO: implement props
  List<Object?> get props => [id, userId, image, text, posted, userViewed];
}
