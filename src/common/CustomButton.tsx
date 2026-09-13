import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/color';
import { Typography } from '../constants/fonts';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'gradient' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  showArrow?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconColor?: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  showArrow = false,
  leftIcon,
  rightIcon,
  disabled = false,
  loading = false,
  style,
  textStyle,
  iconColor,
}) => {
  const isOutline = variant === 'outline';
  const isGradient = variant === 'gradient' || variant === 'primary';
  const isSmall = size === 'small';
  const isLarge = size === 'large';

  const defaultIconColor = isOutline
    ? iconColor || Colors.primary
    : iconColor || Colors.white;

  const buttonContent = (
    <View style={styles.contentRow}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isOutline ? Colors.primary : Colors.white}
        />
      ) : (
        <>
          {leftIcon && (
            <Ionicons
              name={leftIcon}
              size={isSmall ? 16 : isLarge ? 20 : 18}
              color={defaultIconColor}
              style={styles.leftIcon}
            />
          )}
          <Text
            style={[
              styles.baseText,
              isSmall && styles.smallText,
              isLarge && styles.largeText,
              isOutline ? styles.outlineText : styles.primaryText,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {showArrow && (
            <Ionicons
              name="arrow-forward"
              size={isSmall ? 14 : isLarge ? 18 : 16}
              color={defaultIconColor}
              style={styles.rightIcon}
            />
          )}
          {rightIcon && !showArrow && (
            <Ionicons
              name={rightIcon}
              size={isSmall ? 14 : isLarge ? 18 : 16}
              color={defaultIconColor}
              style={styles.rightIcon}
            />
          )}
        </>
      )}
    </View>
  );

  if (isGradient && !disabled) {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        disabled={disabled || loading}
        style={[styles.container, isSmall && styles.smallContainer, isLarge && styles.largeContainer, style]}
      >
        <LinearGradient
          colors={Colors.buttonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.gradientWrapper,
            isSmall && styles.smallWrapper,
            isLarge && styles.largeWrapper,
          ]}
        >
          {buttonContent}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.container,
        isOutline && styles.outlineContainer,
        variant === 'secondary' && styles.secondaryContainer,
        isSmall && styles.smallContainer,
        isLarge && styles.largeContainer,
        disabled && styles.disabledContainer,
        style,
      ]}
    >
      <View
        style={[
          styles.innerWrapper,
          isSmall && styles.smallWrapper,
          isLarge && styles.largeWrapper,
        ]}
      >
        {buttonContent}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    overflow: 'hidden',
  },
  gradientWrapper: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerWrapper: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineContainer: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  secondaryContainer: {
    backgroundColor: Colors.primaryLight,
  },
  disabledContainer: {
    opacity: 0.5,
  },
  smallContainer: {
    borderRadius: 20,
  },
  largeContainer: {
    borderRadius: 32,
  },
  smallWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  largeWrapper: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
  },
  smallText: {
    fontSize: Typography.size.xs,
  },
  largeText: {
    fontSize: Typography.size.lg,
  },
  primaryText: {
    color: Colors.white,
  },
  outlineText: {
    color: Colors.primary,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default CustomButton;
