import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../constants/fonts';
import { Colors } from '../constants/color';
import { PracticeModuleItem } from '../constants/mockData';

interface PracticeModuleCardProps {
  module: PracticeModuleItem;
  onPress: (module: PracticeModuleItem) => void;
}

export const PracticeModuleCard: React.FC<PracticeModuleCardProps> = ({
  module,
  onPress,
}) => {
  const getStatusBadge = () => {
    switch (module.status) {
      case 'New':
        return { bg: Colors.orange50, text: Colors.orange900 };
      case 'In Progress':
        return { bg: Colors.successLighter, text: Colors.successDark };
      case 'Not Started':
      default:
        return { bg: Colors.borderLight, text: Colors.slate500 };
    }
  };

  const statusStyle = getStatusBadge();
  const isPrimaryAction = module.status === 'New' || module.status === 'In Progress';

  return (
    <View style={styles.cardContainer}>
      <View style={styles.topRow}>
        {/* Left Avatar Graphic */}
        <View style={[styles.avatarBox, { backgroundColor: module.bgColor }]}>
          <Ionicons name={module.icon as any} size={28} color={module.color} />
        </View>

        {/* Details */}
        <View style={styles.infoWrapper}>
          <View style={styles.headerRow}>
            <Text style={styles.titleText}>{module.title}</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
              <Text style={[styles.statusBadgeText, { color: statusStyle.text }]}>
                {module.status}
              </Text>
            </View>
          </View>

          <Text style={styles.descriptionText} numberOfLines={2}>
            {module.description}
          </Text>

          {/* Meta & Button Row */}
          <View style={styles.bottomRow}>
            <View style={styles.metaGroup}>
              <View style={styles.metaItem}>
                <Ionicons name="book-outline" size={13} color={Colors.slate500} />
                <Text style={styles.metaText}>{module.lessons}</Text>
              </View>

              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={13} color={Colors.slate500} />
                <Text style={styles.metaText}>{module.duration}</Text>
              </View>

              <View style={styles.metaItem}>
                <Ionicons name="cellular-outline" size={13} color={Colors.slate500} />
                <Text style={styles.metaText}>{module.level}</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onPress(module)}
              style={[
                styles.actionButton,
                isPrimaryAction ? styles.primaryActionButton : styles.outlineActionButton,
              ]}
            >
              <Text
                style={[
                  styles.actionButtonText,
                  isPrimaryAction ? styles.primaryActionText : styles.outlineActionText,
                ]}
              >
                {module.actionText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.divider,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
  },
  avatarBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoWrapper: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  titleText: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    flex: 1,
    marginRight: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.semiBold,
  },
  descriptionText: {
    fontSize: Typography.size.xs,
    color: Colors.slate500,
    lineHeight: 16,
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontSize: Typography.size.xxs,
    color: Colors.slate500,
    fontWeight: Typography.weight.medium,
  },
  actionButton: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryActionButton: {
    backgroundColor: Colors.primary,
  },
  outlineActionButton: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  actionButtonText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
  },
  primaryActionText: {
    color: Colors.white,
  },
  outlineActionText: {
    color: Colors.primary,
  },
});

export default PracticeModuleCard;
