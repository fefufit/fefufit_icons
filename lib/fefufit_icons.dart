import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:fefufit_icons/icons_data.dart';

class FFIcons {
  FFIcons._();

  static final Color _defaultColor = Color.fromRGBO(67, 67, 244, 1);

  static SvgPicture person({double size = 24, Color? color}) =>
      SvgPicture.string(
        personSvg,
        width: size,
        colorFilter: ColorFilter.mode(color ?? _defaultColor, BlendMode.srcIn),
      );

  static SvgPicture location({double size = 24, Color? color}) =>
      SvgPicture.string(
        locationSvg,
        width: size,
        colorFilter: ColorFilter.mode(color ?? _defaultColor, BlendMode.srcIn),
      );
}
