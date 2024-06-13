import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';
import '../../../utils/utils.dart';
import 'api_constant.dart';
import 'api_exception.dart';

class ApiClient {
  late Dio dio;
  late BaseOptions baseOptions;

  ApiClient() {
    baseOptions = BaseOptions(baseUrl: ApiConstant.baseUrl);
    dio = Dio(baseOptions);
  }

  Options options = Options();

  Future<Response> getRequest({required String path, bool isTokenRequired = false}) async {

    if (isTokenRequired == true) {
      var token = await Utils.getToken();
      options.headers = baseOptions.headers
        ..addAll({"Authorization": "Bearer $token"});
    }

    dio.interceptors.add(PrettyDioLogger());
    try {
      debugPrint(
          "🚀========================API REQUEST========================🚀");
      var response = await dio.get(path, options: options);
      return response;
    } on DioException catch (e) {
      if (e.response != null) {
        debugPrint(e.response!.data);
        debugPrint(e.response!.headers.toString());
        debugPrint(e.response!.requestOptions.toString());
        throw ApiException(message: e.response!.statusMessage);
      } else {
        debugPrint(e.requestOptions.toString());
        debugPrint(e.message);
        throw ApiException(message: e.message);
      }
    }
  }

  Future<Response> postRequest(
      {required String path,
      dynamic body,
      bool isTokenRequired = false}) async {
    if (isTokenRequired == true) {
      var token = await Utils.getToken();
      options.headers = baseOptions.headers
        ..addAll({"Authorization": token});
    }

    dio.interceptors.add(PrettyDioLogger());
    try {
      debugPrint(
          "🚀========================API REQUEST========================🚀");
      debugPrint("Body: $body");
      var response = await dio.post(path, data: body, options: options);
      return response;
    } on DioException catch (e) {
      if (e.response != null) {
        debugPrint(e.response!.data.toString());
        debugPrint(e.response!.headers.toString());
        debugPrint(e.response!.requestOptions.toString());
        throw ApiException(message: e.response!.statusMessage);
      } else {
        debugPrint(e.requestOptions.toString());
        debugPrint(e.message);
        throw ApiException(message: e.message);
      }
    }
  }
}
