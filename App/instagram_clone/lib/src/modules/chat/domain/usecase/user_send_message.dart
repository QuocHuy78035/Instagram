import 'package:fpdart/fpdart.dart';
import '../../../../../core/error/failure.dart';
import '../../../../../core/usecase/usecase.dart';
import '../repos/send_message_repo.dart';

class UserSendMessage extends UserCase<dynamic, SendMessageParams>{
  final SendMessageRepo _sendMessageRepo;

  UserSendMessage(this._sendMessageRepo);
  @override
  Future<Either<Failure, dynamic>> call(SendMessageParams params) {
    return _sendMessageRepo.sendMessage(params.conversationId, params.message);
  }
}

class SendMessageParams {
  final String conversationId;
  final String message;

  const SendMessageParams({
    required this.conversationId,
    required this.message,
  });
}
