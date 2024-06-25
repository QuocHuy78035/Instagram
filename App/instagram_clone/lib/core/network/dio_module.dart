import 'package:dio/dio.dart';
import 'package:injectable/injectable.dart';

import 'api_interceptor.dart';

const _baseUrl = "https://catfact.ninja/";
const _requestTimeOutInSeconds = Duration(seconds: 7);

@module
abstract class DioModule {
  // Dio getAuthorizedDioClient(TokenRepository repository) {
  //   final dioClient = _dioClient();
  //   dioClient.interceptors.addAll([
  //     AuthorizedRequestInterceptor(repository)
  //   ]);
  //   return dioClient;
  // }

  @Named("UnAuthorized")
  @Singleton()
  Dio getUnAuthorizedDioClient() {
    final dioClient = _dioClient();
    dioClient.interceptors.addAll([
      UnauthorizedRequestInterceptor()
    ]);
    return dioClient;
  }

  Dio _dioClient() {
    final baseOptions = BaseOptions(
      baseUrl: _baseUrl,
      receiveDataWhenStatusError: true,
      connectTimeout: _requestTimeOutInSeconds,
      receiveTimeout: _requestTimeOutInSeconds,
    );
    return Dio(baseOptions);
  }
}
