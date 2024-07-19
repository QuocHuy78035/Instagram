import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/core/error/failure.dart';

abstract class GetConversationRepo{
  Future<Either<Failure, dynamic>> getConversation(String conversationId);
}