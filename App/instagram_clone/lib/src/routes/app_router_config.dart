import 'package:go_router/go_router.dart';
import 'package:instagram_clone/src/modules/auth/presentation/views/login_screen.dart';
import 'package:instagram_clone/src/modules/auth/presentation/views/register_screen.dart';
import 'package:instagram_clone/src/modules/home/presentation/views/home_screen.dart';
import 'package:instagram_clone/src/modules/main/presentation/views/main_screen.dart';
import 'package:instagram_clone/src/modules/profile/presentation/views/profile_screen.dart';

import '../modules/splash/presentation/views/splash_screen.dart';
import 'app_route.dart';

class AppRouterConfig {
  late final GoRouter router =
      GoRouter(routes: _routes, initialLocation: AppRoute.root);

  void dispose() {}

  late final _routes = <RouteBase>[
    GoRoute(
      path: '/',
      name: AppRoute.root,
      builder: (context, state) => const SplashScreen(),
    ),
    GoRoute(
        path: '/home',
        name: AppRoute.home,
        builder: (context, state) => const HomeScreen()
    ),
    GoRoute(
        path: '/login',
        name: AppRoute.login,
        builder: (context, state) => const LoginScreen()
    ),
    GoRoute(
        path: '/register',
        name: AppRoute.register,
        builder: (context, state) => const RegisterScreen()
    ),
    GoRoute(
        path: '/profile',
        name: AppRoute.profile,
        builder: (context, state) => const ProfileScreen()
    ),
    GoRoute(
      path: '/main',
      name: AppRoute.main,
      builder: (context, state) => const MainScreen()
    )
    // GoRoute(
    //   path: '/main',
    //   name: AppRoute.main,
    //   builder: (context, state) => BlocProvider(
    //     create: (_) => HomeBloc(
    //       inject(),
    //     ),
    //     child: MainScreen(
    //       viewModel: MainScreenViewModel(),
    //     ),
    //   ),
    // )
  ];
}
