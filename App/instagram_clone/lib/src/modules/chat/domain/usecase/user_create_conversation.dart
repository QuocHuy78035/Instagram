import 'package:fpdart/fpdart.dart';

import '../../../../../core/error/failure.dart';
import '../../../../../core/usecase/usecase.dart';
import '../repos/create_conversation_repo.dart';

class UserCreateConversation extends UserCase{
  final CreateConversationRepo _createConversationRepo;

  UserCreateConversation(this._createConversationRepo);
  @override
  Future<Either<Failure, dynamic>> call(params) {
    return _createConversationRepo.createConversation(params);
  }
}