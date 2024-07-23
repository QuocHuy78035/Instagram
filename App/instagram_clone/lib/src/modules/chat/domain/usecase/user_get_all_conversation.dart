import 'package:fpdart/fpdart.dart';
import '../../../../../core/error/failure.dart';
import '../../../../../core/usecase/usecase.dart';
import '../../data/models/conversation_model.dart';
import '../repos/get_all_conversation_repo.dart';

class UserGetAllConversation extends UserCase{
  final GetAllConversationRepo _getAllConversationRepo;

  UserGetAllConversation(this._getAllConversationRepo);
  @override
  Future<Either<Failure, List<ConversationModel>>> call(params) {
    return _getAllConversationRepo.getAllConversation();
  }
}