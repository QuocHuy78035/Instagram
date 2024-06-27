import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:instagram_clone/src/modules/auth/presentation/bloc/auth_bloc.dart';
import 'package:instagram_clone/src/modules/main/presentation/bloc/main_bloc.dart';
import 'package:instagram_clone/src/routes/app_router_config.dart';
import 'package:instagram_localization/strings.g.dart';
import '../../di/di_config.dart' as di;

class InstagramApp extends StatefulWidget {
  const InstagramApp({super.key});

  @override
  State<InstagramApp> createState() => _InstagramAppState();
}

class _InstagramAppState extends State<InstagramApp> {
  final _appRouterConfig = AppRouterConfig();

  @override
  void dispose() {
    // TODO: implement dispose
    _appRouterConfig.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(
          create: (_) => di.sl<AuthBloc>(),
        ),
        BlocProvider(
          create: (_) => di.sl<MainBloc>(),
        ),
      ],
      child: MaterialApp.router(
        builder: EasyLoading.init(),
        debugShowCheckedModeBanner: false,
        routerConfig: _appRouterConfig.router,
        locale: TranslationProvider.of(context).flutterLocale,
        supportedLocales: AppLocaleUtils.supportedLocales,
        localizationsDelegates: const [
          GlobalMaterialLocalizations.delegate,
          GlobalWidgetsLocalizations.delegate,
          GlobalCupertinoLocalizations.delegate
        ],
      ),
    );
  }
}
