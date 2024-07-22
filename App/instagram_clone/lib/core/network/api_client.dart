
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:instagram_clone/core/local_db_config/init_local_db.dart';
import 'api_constant.dart';
import 'api_exception.dart';

class ApiClient {
  late Dio dio;
  late BaseOptions baseOptions;

  ApiClient() {
    baseOptions = BaseOptions(
      baseUrl: ApiConstant.mainUrl,
       connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 10),
    );
    dio = Dio(baseOptions);
    // dio.interceptors.add(
    //   PrettyDioLogger(
    //     requestBody: true,
    //   ),
    // );
  }

  Options options = Options();

  /// GET REQUEST
  Future<Response> getRequest(
      {required String path, bool isTokenRequired = false}) async {
    if (isTokenRequired == true) {
      var token = SharedPreferencesRepository.getString('accessToken');
      var userId = SharedPreferencesRepository.getString('userId');
      options.headers = baseOptions.headers
        ..addAll({
          "authorization": token,
          'x-client-id': userId,
        });
    }
    try {
      var response = await dio.get(path, options: options);
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

  /// POST REQUEST
  Future<Response> postRequest(
      {required String path,
      dynamic body,
      bool isTokenRequired = false}) async {
    if (isTokenRequired == true) {
      var token = SharedPreferencesRepository.getString('accessToken');
      var userId = SharedPreferencesRepository.getString('userId');
      options.headers = baseOptions.headers
        ..addAll({
          "authorization": token,
          'x-client-id': userId,
        });
    }
    try {
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

  /// PATCH REQUEST
  Future<Response> patchRequest(
      {required String path,
      dynamic body,
      bool isTokenRequired = false}) async {
    if (isTokenRequired == true) {
      var token = SharedPreferencesRepository.getString('accessToken');
      var userId = SharedPreferencesRepository.getString('userId');
      options.headers = baseOptions.headers
        ..addAll({
          "authorization": token,
          'x-client-id': userId,
        });
    }

    try {
      var response = await dio.patch(path, data: body, options: options);
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
