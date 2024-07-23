import 'package:fpdart/fpdart.dart';

import '../../../../../core/error/failure.dart';
import '../../data/models/conversation_model.dart';

abstract class GetAllConversationRepo{
  Future<Either<Failure, List<ConversationModel>>> getAllConversation();
}