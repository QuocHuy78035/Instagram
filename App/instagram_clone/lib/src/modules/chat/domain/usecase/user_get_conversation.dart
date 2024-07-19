import 'package:fpdart/fpdart.dart';
import '../../../../../core/error/failure.dart';
import '../../../../../core/usecase/usecase.dart';
import '../../data/models/conversation_model.dart';
import '../repos/get_conversation_repo.dart';

class UserGetConversation extends UserCase{
  final GetConversationRepo _getConversationRepo;

  UserGetConversation(this._getConversationRepo);
  @override
  Future<Either<Failure, ConversationModel>> call(params) {
    return _getConversationRepo.getConversation(params);
  }
}