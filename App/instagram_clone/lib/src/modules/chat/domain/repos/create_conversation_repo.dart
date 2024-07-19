import 'package:fpdart/fpdart.dart';
import '../../../../../core/error/failure.dart';

abstract class CreateConversationRepo{
  Future<Either<Failure, dynamic>> createConversation(List<String> userId);
}