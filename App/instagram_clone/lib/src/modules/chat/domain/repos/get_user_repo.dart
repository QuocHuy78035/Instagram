import 'package:fpdart/fpdart.dart';

import '../../../../../core/error/failure.dart';
import '../../../auth/data/models/user_model.dart';

abstract class GetUserRepo{
  Future<Either<Failure, UserModel>> getUser(String userId);
}