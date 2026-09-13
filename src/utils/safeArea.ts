import { Platform, Dimensions } from 'react-native';

/**
 * Returns a robust, device-safe bottom padding that prevents
 * the bottom tab bar and sticky action bars from being overlapped
 * by Android 3-button navigation bars, gesture navigation bars,
 * or iOS home indicators.
 */
export const getSafeBottomPadding = (
  insetsBottom: number = 0,
  defaultPadding: number = 10
): number => {
  if (Platform.OS === 'ios') {
    return Math.max(insetsBottom, defaultPadding);
  }

  if (Platform.OS === 'android') {
    const screenHeight = Dimensions.get('screen').height;
    const windowHeight = Dimensions.get('window').height;
    const rawNavBarDiff = Math.max(0, screenHeight - windowHeight);

    // If the OS/safe area reports a reliable bottom inset (e.g. >= 20dp, such as 48dp on 3-button nav)
    if (insetsBottom >= 20) {
      return insetsBottom;
    }

    // If screen height exceeds window height by at least 20dp, that difference is the navigation bar
    if (rawNavBarDiff >= 20) {
      return rawNavBarDiff;
    }

    // If insetsBottom is non-zero but small (e.g. 10-18dp for gesture navigation bar)
    if (insetsBottom > 0) {
      return Math.max(insetsBottom, defaultPadding);
    }

    // Critical Fallback for Android:
    // On devices where edge-to-edge draws under the system navigation bar
    // but insets.bottom returns 0, provide at least 28dp clearance so
    // 3-button navigation buttons (<, O, |||) never overlap the tab bar.
    return 28;
  }

  return defaultPadding;
};

export default getSafeBottomPadding;
