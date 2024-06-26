import 'package:get_it/get_it.dart';
import 'package:instagram_clone/src/modules/auth/data/datasources/auth_remote_data_src.dart';
import 'package:instagram_clone/src/modules/auth/data/datasources/auth_remote_data_src_impl.dart';
import 'package:instagram_clone/src/modules/auth/data/repos/auth_repo_impl.dart';
import 'package:instagram_clone/src/modules/auth/domain/repos/auth_repo.dart';
import 'package:instagram_clone/src/modules/auth/domain/usecase/user_login.dart';
import 'package:instagram_clone/src/modules/auth/domain/usecase/user_sign_up.dart';
import 'package:instagram_clone/src/modules/auth/presentation/bloc/auth_bloc.dart';
import 'package:instagram_clone/src/modules/main/data/datasources/get_info_user_remote_data_src.dart';
import 'package:instagram_clone/src/modules/main/data/datasources/get_info_user_remote_data_src_impl.dart';
import 'package:instagram_clone/src/modules/main/data/repos/get_info_user_repo_impl.dart';
import 'package:instagram_clone/src/modules/main/domain/repos/get_info_user_repo.dart';
import 'package:instagram_clone/src/modules/main/domain/usecase/get_info_user.dart';
import 'package:instagram_clone/src/modules/main/presentation/bloc/main_bloc.dart';

import '../core/network/api_client.dart';


final sl = GetIt.instance;

Future<void> init() async {

  // Bloc

  sl.registerFactory(() => AuthBloc(userSignUp: sl(), userLogin: sl()));

  sl.registerLazySingleton(() => MainBloc(getInfoUser: sl()));

  // Use cases
  sl.registerLazySingleton(() => UserLogin(sl()));
  sl.registerLazySingleton(() => UserSignUp(sl()));

  sl.registerLazySingleton(() => GetInfoUser(sl()));


  // Repository
  sl.registerLazySingleton<AuthRepo>(() => AuthRepoImpl(sl()));
  sl.registerLazySingleton<GetInfoUserRepo>(() => GetInfoUserRepoImpl(sl()));


  // Data sources
  sl.registerLazySingleton<AuthRemoteDataSrc>(
          () => AuthRemoteDataSrcImpl(sl()));

  sl.registerLazySingleton<GetInfoUserRemoteDataSrc>(() =>  GetInfoUserRemoteDataSrcImpl(sl()));


  //net work
  sl.registerLazySingleton<ApiClient>(() => ApiClient());

  // //! Core
  //
  // sl.registerLazySingleton<NetworkInfo>(() => NetworkInfoImpl(sl()));
}