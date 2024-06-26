import 'package:fefufit_icons/fefufit_icons.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:url_launcher/url_launcher.dart';

void main() {
  runApp(const App());
}

class App extends StatefulWidget {
  const App({super.key});

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  ThemeMode themeMode = ThemeMode.light;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fefufit Icons',
      theme: ThemeData.light(),
      darkTheme: ThemeData.dark(),
      themeMode: themeMode,
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Fefufit Icons'),
          actions: [
            const GithubLink(),
            ThemeSwitcher(
              selectedThemeMode: themeMode,
              changeTheme: () {
                setState(() {
                  themeMode = themeMode == ThemeMode.light
                      ? ThemeMode.dark
                      : ThemeMode.light;
                });
              },
            )
          ],
        ),
        body: const Center(child: IconsList()),
      ),
    );
  }
}

class GithubLink extends StatelessWidget {
  const GithubLink({super.key});

  @override
  Widget build(BuildContext context) {
    return IconButton(
      onPressed: _launchURL,
      icon: SvgPicture.asset(
        'assets/github-mark.svg',
        width: 24,
        height: 24,
        colorFilter: ColorFilter.mode(
            Theme.of(context).iconTheme.color ?? Colors.white, BlendMode.srcIn),
      ),
    );
  }

  Future<void> _launchURL() async {
    const url = 'https://github.com/fefufit/icons';
    await launchUrl(Uri.parse(url));
  }
}

class ThemeSwitcher extends StatelessWidget {
  const ThemeSwitcher(
      {super.key, required this.selectedThemeMode, required this.changeTheme});

  final ThemeMode selectedThemeMode;
  final void Function() changeTheme;

  @override
  Widget build(BuildContext context) {
    IconData icon = selectedThemeMode == ThemeMode.light
        ? Icons.light_mode
        : Icons.dark_mode;

    return IconButton(onPressed: changeTheme, icon: Icon(icon));
  }
}

class IconsList extends StatelessWidget {
  const IconsList({super.key});

  @override
  Widget build(BuildContext context) {
    return const Wrap(
      spacing: 8,
      children: [
        Icon(FFIcons.location),
        Icon(FFIcons.person),
        Icon(FFIcons.home),
        Icon(FFIcons.timetable),
        Icon(FFIcons.edit),
        Icon(FFIcons.search),
        Icon(FFIcons.filters),
        Icon(FFIcons.notification),
        Icon(FFIcons.arrowForward),
        Icon(FFIcons.info),
        Icon(FFIcons.logo),
        Icon(FFIcons.services),
      ],
    );
  }
}
