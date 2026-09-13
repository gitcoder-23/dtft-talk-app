import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/color';
import { Typography } from '../constants/fonts';

interface CategoryPillProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  accentColor?: string;
  badge?: string | number;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({
  label,
  isActive,
  onPress,
  icon,
  accentColor = Colors.primary,
  badge,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[
        styles.pillContainer,
        isActive
          ? styles.activePill
          : [styles.inactivePill, { borderColor: accentColor ? `${accentColor}40` : Colors.border }],
      ]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={16}
          color={isActive ? Colors.white : accentColor}
          style={styles.icon}
        />
      )}
      <Text
        style={[
          styles.label,
          isActive ? styles.activeLabel : [styles.inactiveLabel, { color: accentColor }],
        ]}
      >
        {label}
      </Text>
      {badge !== undefined && (
        <View
          style={[
            styles.badgeWrapper,
            isActive ? styles.activeBadge : styles.inactiveBadge,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              isActive ? styles.activeBadgeText : styles.inactiveBadgeText,
            ]}
          >
            {badge}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activePill: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  inactivePill: {
    backgroundColor: Colors.white,
    borderWidth: 1,
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semiBold,
  },
  activeLabel: {
    color: Colors.white,
  },
  inactiveLabel: {
    color: Colors.slate800,
  },
  badgeWrapper: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  activeBadge: {
    backgroundColor: Colors.whiteAlpha25,
  },
  inactiveBadge: {
    backgroundColor: Colors.borderLight,
  },
  badgeText: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.bold,
  },
  activeBadgeText: {
    color: Colors.white,
  },
  inactiveBadgeText: {
    color: Colors.slate500,
  },
});

export default CategoryPill;
