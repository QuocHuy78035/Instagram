import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/core/error/failure.dart';
import 'package:instagram_clone/src/modules/chat/data/datasources/send_message_data_src_impl.dart';
import 'package:instagram_clone/src/modules/chat/domain/repos/send_message_repo.dart';

class SendMessageRepoImpl implements SendMessageRepo{
  final SendMessageDataSrcImpl _sendMessageDataSrcImpl;
  SendMessageRepoImpl(this._sendMessageDataSrcImpl);
  @override
  Future<Either<Failure, dynamic>> sendMessage(String conversationId, String message) async {
    try {
      final chat = await _sendMessageDataSrcImpl.sendMessage(conversationId, message);
      return Right(chat);
    } catch(e){
      return Left(Failure(e.toString()));
    }
  }

}