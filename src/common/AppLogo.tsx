import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';
import { Colors } from '../constants/color';
import { Typography } from '../constants/fonts';

interface AppLogoProps {
  variant?: 'speechBubble' | 'fourCircle';
  size?: 'small' | 'medium' | 'large';
  showTagline?: boolean;
  onPress?: () => void;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  variant = 'speechBubble',
  size = 'medium',
  showTagline = true,
  onPress,
}) => {
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  const iconDimension = isSmall ? 36 : isLarge ? 56 : 44;

  if (variant === 'fourCircle') {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        disabled={!onPress}
        style={styles.fourCircleContainer}
      >
        <View style={styles.circlesRow}>
          <View style={[styles.circleBadge, { backgroundColor: Colors.circleRed }]}>
            <Text style={styles.circleLetter}>D</Text>
          </View>
          <View style={[styles.circleBadge, { backgroundColor: Colors.circleCyan }]}>
            <Text style={styles.circleLetter}>T</Text>
          </View>
          <View style={[styles.circleBadge, { backgroundColor: Colors.circleAmber }]}>
            <Text style={styles.circleLetter}>F</Text>
          </View>
          <View style={[styles.circleBadge, { backgroundColor: Colors.circleBlue }]}>
            <Text style={styles.circleLetter}>T</Text>
          </View>
        </View>
        <View style={styles.fourCircleTextWrapper}>
          <Text style={styles.fourCircleTitle}>
            DTFT <Text style={{ color: Colors.secondary }}>TALK</Text>
          </Text>
          {showTagline && (
            <Text style={styles.fourCircleTagline}>
              Training and Skill Development Unit of DTFT Solutions
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={!onPress}
      style={styles.container}
    >
      {/* 4-Color Speech Bubble Icon */}
      <View style={{ width: iconDimension, height: iconDimension }}>
        <Svg width={iconDimension} height={iconDimension} viewBox="0 0 100 100">
          <G>
            {/* Top-Left: Blue */}
            <Path
              d="M 50 10 A 40 40 0 0 0 10 50 L 50 50 Z"
              fill={Colors.brandBlue}
            />
            {/* Top-Right: Red */}
            <Path
              d="M 50 10 A 40 40 0 0 1 90 50 L 50 50 Z"
              fill={Colors.brandRed}
            />
            {/* Bottom-Right: Green */}
            <Path
              d="M 90 50 A 40 40 0 0 1 50 90 L 50 50 Z"
              fill={Colors.brandGreen}
            />
            {/* Bottom-Left: Yellow with speech bubble tail */}
            <Path
              d="M 50 90 A 40 40 0 0 1 10 50 L 50 50 Z"
              fill={Colors.brandYellow}
            />
            {/* Tail */}
            <Path
              d="M 22 72 L 6 92 L 38 84 Z"
              fill={Colors.brandYellow}
            />
            {/* Inner White Circle */}
            <Circle cx="50" cy="50" r="26" fill={Colors.white} />
            {/* Inner Mic / Sound Wave Graphic */}
            <Rect x="44" y="36" width="12" height="18" rx="6" fill={Colors.brandDark} />
            <Path
              d="M 38 48 A 12 12 0 0 0 62 48"
              stroke={Colors.brandDark}
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
            <Rect x="48.5" y="60" width="3" height="6" fill={Colors.brandDark} />
            <Rect x="42" y="65" width="16" height="3" rx="1.5" fill={Colors.brandDark} />
          </G>
        </Svg>
      </View>

      {/* Brand Text */}
      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          <Text style={[styles.titleDtft, isSmall && styles.titleDtftSmall]}>DTFT </Text>
          <Text style={[styles.titleTalk, isSmall && styles.titleTalkSmall]}>Talk</Text>
        </View>
        {showTagline && (
          <Text style={[styles.tagline, isSmall && styles.taglineSmall]}>
            Speak • Learn • Grow
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  titleDtft: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.extraBold,
    color: Colors.primaryBlueDark,
    letterSpacing: -0.5,
  },
  titleDtftSmall: {
    fontSize: Typography.size.md,
  },
  titleTalk: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.extraBold,
    color: Colors.secondary,
    letterSpacing: -0.5,
  },
  titleTalkSmall: {
    fontSize: Typography.size.md,
  },
  tagline: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.medium,
    color: Colors.textSecondary,
    letterSpacing: 0.2,
    marginTop: -2,
  },
  taglineSmall: {
    fontSize: 9,
  },
  fourCircleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circlesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  circleBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  circleLetter: {
    fontSize: 24,
    fontWeight: Typography.weight.extraBold,
    color: Colors.white,
  },
  fourCircleTextWrapper: {
    alignItems: 'center',
    marginTop: 8,
  },
  fourCircleTitle: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.extraBold,
    color: Colors.brandRed,
    letterSpacing: 1,
  },
  fourCircleTagline: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.medium,
    color: Colors.primaryDark,
    textAlign: 'center',
    marginTop: 2,
  },
});

export default AppLogo;
