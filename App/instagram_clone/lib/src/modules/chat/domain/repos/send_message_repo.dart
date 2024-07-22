import 'package:fpdart/fpdart.dart';

import '../../../../../core/error/failure.dart';

abstract class SendMessageRepo{
  Future<Either<Failure, dynamic>> sendMessage(String conversationId, String message);
}