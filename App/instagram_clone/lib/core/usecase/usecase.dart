
import 'package:fpdart/fpdart.dart';
import '../error/failure.dart';

abstract class UserCase<SuccessType, Params>{
  Future<Either<Failure, SuccessType>> call(Params params);
}