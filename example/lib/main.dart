import 'package:fefufit_icons/fefufit_icons.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fefufit Icons',
      theme: ThemeData.light(),
      darkTheme: ThemeData.dark(),
      themeMode: ThemeMode.system,
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Fefufit Icons'),
        ),
        body: const Center(child: IconsList()),
      ),
    );
  }
}

class IconsList extends StatelessWidget {
  const IconsList({super.key});

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 8,
      children: [
        FFIcons.person(color: Theme.of(context).colorScheme.primary),
        FFIcons.location(color: Theme.of(context).colorScheme.primary),
      ],
    );
  }
}
