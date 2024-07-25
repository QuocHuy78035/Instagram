import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/core/error/failure.dart';
import 'package:instagram_clone/src/modules/chat/domain/repos/get_conversation_repo.dart';

import '../datasources/get_conversation_data_src_impl.dart';
import '../models/conversation_model.dart';

class GetConversationRepoImpl implements GetConversationRepo{
  final GetConversationDataSrcImpl _getConversationDataSrcImpl;
  GetConversationRepoImpl(this._getConversationDataSrcImpl);
  @override
  Future<Either<Failure, ConversationModel>> getConversation(String conversationId) async {
    try {
      final chat = await _getConversationDataSrcImpl.getConversation(conversationId);
      return Right(chat);
    } catch(e){
      return Left(Failure(e.toString()));
    }
  }
}