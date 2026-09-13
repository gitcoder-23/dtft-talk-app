import { TextStyle } from 'react-native';

export const Typography = {
  // Font Sizes
  size: {
    xxs: 10,
    xs: 12,
    sm: 13,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
    xxxl: 26,
    hero: 30,
  },

  // Line Heights
  lineHeight: {
    tight: 1.15,
    normal: 1.35,
    relaxed: 1.5,
  },

  // Font Weights
  weight: {
    regular: '400' as TextStyle['fontWeight'],
    medium: '500' as TextStyle['fontWeight'],
    semiBold: '600' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight'],
    extraBold: '800' as TextStyle['fontWeight'],
  },
};

export default Typography;
