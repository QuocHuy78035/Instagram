import 'package:flutter/material.dart';
import 'package:instagram_clone/core/theme/app_assets.dart';
import 'package:instagram_clone/src/modules/profile/presentation/views/profile_screen.dart';
import '../../../../../core/local_db_config/init_local_db.dart';
import '../../../home/presentation/views/home_screen.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  final PageController _pageController = PageController(initialPage: 0);

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
    _pageController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView(
        physics: const NeverScrollableScrollPhysics(),
        controller: _pageController,
        children: const [
          HomeScreen(),
          Text("1"),
          Text("2"),
          Text("3"),
          ProfileScreen(),
        ],
      ),
      bottomNavigationBar: _BottomNavigationBar(
        pageController: _pageController,
      ),
    );
  }
}

class _BottomNavigationBar extends StatefulWidget {
  final PageController pageController;

  const _BottomNavigationBar({required this.pageController});

  @override
  State<_BottomNavigationBar> createState() => _BottomNavigationBarState();
}

class _BottomNavigationBarState extends State<_BottomNavigationBar> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    final avt = SharedPreferencesRepository.getString('avt');
    return BottomNavigationBar(
      selectedItemColor: Colors.black,
      unselectedItemColor: Colors.grey,
      showSelectedLabels: false,
      showUnselectedLabels: false,
      type: BottomNavigationBarType.fixed,
      currentIndex: _currentIndex,
      onTap: (index) {
        widget.pageController.jumpToPage(index);
        setState(() {
          _currentIndex = index;
        });
      },
      items: [
        BottomNavigationBarItem(
          icon: _currentIndex == 0
              ? Image.asset(
                  AppAssets.homeSelectedIcon,
                  height: 22,
                  width: 24,
                )
              : Image.asset(
                  AppAssets.homeIcon,
                  height: 22,
                  width: 24,
                ),
          label: "",
        ),
        BottomNavigationBarItem(
          icon: _currentIndex == 1
              ? Image.asset(
                  AppAssets.searchSelectedIcon,
                  height: 22,
                  width: 24,
                )
              : Image.asset(
                  AppAssets.searchIcon,
                  height: 22,
                  width: 24,
                ),
          label: "",
        ),
        BottomNavigationBarItem(
          icon: _currentIndex == 2
              ? Image.asset(
                  AppAssets.createIcon,
                  height: 22,
                  width: 24,
                )
              : Image.asset(
                  AppAssets.createIcon,
                  height: 22,
                  width: 24,
                ),
          label: "",
        ),
        BottomNavigationBarItem(
          icon: _currentIndex == 3
              ? Image.asset(
                  AppAssets.heartSelectedIcon,
                  height: 22,
                  width: 24,
                )
              : Image.asset(
                  AppAssets.heartIcon,
                  height: 22,
                  width: 24,
                ),
          label: "",
        ),
        BottomNavigationBarItem(
          icon: _currentIndex == 4
              ? Container(
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: Colors.black,
                      width: 2
                    )
                  ),
                  child: Image.network(
                    avt,
                    height: 26,
                    width: 26,
                  ),
                )
              : Image.network(
                  avt,
                  height: 26,
                  width: 26,
                ),
          label: "",
        ),
      ],
    );
  }
}
