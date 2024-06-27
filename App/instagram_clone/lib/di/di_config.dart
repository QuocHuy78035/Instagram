import 'package:get_it/get_it.dart';
import 'package:instagram_clone/src/modules/auth/data/datasources/auth_remote_data_src.dart';
import 'package:instagram_clone/src/modules/auth/data/datasources/auth_remote_data_src_impl.dart';
import 'package:instagram_clone/src/modules/auth/data/repos/auth_repo_impl.dart';
import 'package:instagram_clone/src/modules/auth/domain/repos/auth_repo.dart';
import 'package:instagram_clone/src/modules/auth/domain/usecase/user_login.dart';
import 'package:instagram_clone/src/modules/auth/domain/usecase/user_sign_up.dart';
import 'package:instagram_clone/src/modules/auth/presentation/bloc/auth_bloc.dart';

import '../core/network/api_client.dart';


final sl = GetIt.instance;

Future<void> init() async {

  // Bloc
  sl.registerFactory(() => AuthBloc(userSignUp: sl(), userLogin: sl()));

  // Use cases
  sl.registerLazySingleton(() => UserLogin(sl()));
  sl.registerLazySingleton(() => UserSignUp(sl()));

  // Repository
  sl.registerLazySingleton<AuthRepo>(() => AuthRepoImpl(sl()));

  // Data sources
  sl.registerLazySingleton<AuthRemoteDataSrc>(
          () => AuthRemoteDataSrcImpl(sl()));

  sl.registerLazySingleton<ApiClient>(() => ApiClient());

  // //! Core
  //
  // sl.registerLazySingleton<NetworkInfo>(() => NetworkInfoImpl(sl()));
}