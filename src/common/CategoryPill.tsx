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
          : [styles.inactivePill, { borderColor: accentColor ? `${accentColor}40` : '#E2E8F0' }],
      ]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={16}
          color={isActive ? '#FFFFFF' : accentColor}
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
    backgroundColor: '#0084FF',
    shadowColor: '#0084FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  inactivePill: {
    backgroundColor: '#FFFFFF',
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
    color: '#FFFFFF',
  },
  inactiveLabel: {
    color: '#1E293B',
  },
  badgeWrapper: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  activeBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  inactiveBadge: {
    backgroundColor: '#F1F5F9',
  },
  badgeText: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.bold,
  },
  activeBadgeText: {
    color: '#FFFFFF',
  },
  inactiveBadgeText: {
    color: '#64748B',
  },
});

export default CategoryPill;
