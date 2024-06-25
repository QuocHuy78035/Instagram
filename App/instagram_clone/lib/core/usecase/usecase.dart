import '../error/failure.dart';

abstract interface class UserCase<SuccessType, Params>{
  Future<Map<Failure, SuccessType>> call(Params params);
}