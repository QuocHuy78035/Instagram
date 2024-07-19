import 'package:fpdart/fpdart.dart';
import 'package:instagram_clone/core/error/failure.dart';
import 'package:instagram_clone/src/modules/chat/domain/repos/create_conversation_repo.dart';
import '../datasources/create_conversation_data_src.dart';

class CreateConversationRepoImpl implements CreateConversationRepo{
  final CreateConversationDataSrc _createConversationDataSrc;
  CreateConversationRepoImpl(this._createConversationDataSrc);
  @override
  Future<Either<Failure, dynamic>> createConversation(List<String> userId) async {
    try {
      final conversation = await _createConversationDataSrc.createConversation(userId);
      return Right(conversation);
    } catch(e){
      return Left(Failure(e.toString()));
    }
  }
}