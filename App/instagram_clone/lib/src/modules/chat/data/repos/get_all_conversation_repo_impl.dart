import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/core/error/failure.dart';
import 'package:instagram_clone/src/modules/chat/domain/repos/get_all_conversation_repo.dart';
import 'package:instagram_clone/src/modules/chat/domain/repos/get_conversation_repo.dart';

import '../datasources/get_all_conversation_data_src_impl.dart';
import '../datasources/get_conversation_data_src_impl.dart';
import '../models/conversation_model.dart';

class GetAllConversationRepoImpl implements GetAllConversationRepo{
  final GetAllConversationDataSrcImpl _getAllConversationDataSrcImpl;
  GetAllConversationRepoImpl(this._getAllConversationDataSrcImpl);
  @override
  Future<Either<Failure, List<ConversationModel>>> getAllConversation() async {
    try {
      final conversation = await _getAllConversationDataSrcImpl.getAllConversation();
      return Right(conversation);
    } catch(e){
      return Left(Failure(e.toString()));
    }
  }
}