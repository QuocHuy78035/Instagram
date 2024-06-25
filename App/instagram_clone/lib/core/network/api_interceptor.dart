import 'dart:developer';
import 'dart:io';

import 'package:dio/dio.dart';

const _baseHeaders = {
  'Content-Type': 'application/json',
  'charset': 'utf-8',
};

class UnauthorizedRequestInterceptor extends QueuedInterceptor {
  @override
  void onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) {
    options.headers.addAll(_baseHeaders);
    log('On UnAuthorizedRequestInterceptor: ');

    log('${options.method} >>> ${options.uri}');
    log('Query parameters: ${options.queryParameters}');
    log('Request data: ${options.data}');
    super.onRequest(options, handler);
  }

  @override
  void onResponse(
    Response response,
    ResponseInterceptorHandler handler,
  ) {
    log('${response.requestOptions.method} <<< ${response.requestOptions.uri}');
    log('Response data UnauthorizedRequestInterceptor: ${response.data}');
    super.onResponse(response, handler);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    log('${err.requestOptions.method} <<< ${err.requestOptions.uri}');
    log('Error data: ${err.response?.data}');
    handler.next(err);
  }
}

class AuthorizedRequestInterceptor extends UnauthorizedRequestInterceptor {
  //final TokenRepository _tokenRepository;

  //AuthorizedRequestInterceptor(this._tokenRepository);

  @override
  void onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    try {
      options.headers[HttpHeaders.authorizationHeader] = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2NhMGE3ODAyYmI2NWExYjljZGFlYTJlMDY3M2QwYiIsIm5iZiI6MTcxOTMwMDQ0MS45MzA4Mywic3ViIjoiNjY3YTZkYjVmYWUwOTc1MTcxM2I2MTI4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cjHf9GqRJtS2SW5UAQH_2PWmf9BlXkogUXfaOzTrq6M";
      // await _tokenRepository.getBearerToken();
      super.onRequest(options, handler);
      log('On AuthorizedRequestInterceptor: ');

    } on DioException catch (e) {
      handler.reject(e);
    } on Object catch (e) {
      log(e.toString());
    }
  }

  @override
  void onResponse(
      Response response,
      ResponseInterceptorHandler handler,
      ) {
    log('${response.requestOptions.method} <<< ${response.requestOptions.uri}');
    log('Author Response data: ${response.data}');
    super.onResponse(response, handler);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    if (err.response?.statusCode == HttpStatus.unauthorized) {
      // TODO: refresh token when access token expired
    } else {
      super.onError(err, handler);
    }
  }
}
