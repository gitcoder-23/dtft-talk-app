import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../constants/fonts';
import { Colors } from '../constants/color';
import { NoteItem } from '../constants/mockData';

interface NoteCardProps {
  note: NoteItem;
  onPress: (note: NoteItem) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onPress }) => {
  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'Grammar':
        return { bg: Colors.redLight, text: Colors.red600 };
      case 'Vocabulary':
        return { bg: Colors.amber50, text: Colors.orange700 };
      case 'Conversation':
        return { bg: Colors.mint50, text: Colors.mintDark };
      case 'Speaking':
        return { bg: Colors.purple50, text: Colors.purple };
      case 'Listening':
        return { bg: Colors.tealLight, text: Colors.tealDark };
      default:
        return { bg: Colors.blue50, text: Colors.blue700 };
    }
  };

  const badgeStyle = getBadgeColor(note.category);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(note)}
      style={styles.cardContainer}
    >
      <View style={styles.cardContent}>
        {/* Left Icon Block */}
        <View style={[styles.iconBox, { backgroundColor: note.color }]}>
          <Ionicons name={note.icon as any} size={28} color={Colors.white} />
          <Text style={styles.iconTagText}>{note.category.slice(0, 4).toUpperCase()}</Text>
        </View>

        {/* Middle Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.titleText} numberOfLines={1}>
              {note.title}
            </Text>
            <View style={[styles.categoryBadge, { backgroundColor: badgeStyle.bg }]}>
              <Text style={[styles.categoryBadgeText, { color: badgeStyle.text }]}>
                {note.category}
              </Text>
            </View>
          </View>

          <Text style={styles.descriptionText} numberOfLines={2}>
            {note.description}
          </Text>

          {/* Meta Info Row */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="copy-outline" size={13} color={Colors.slate500} />
              <Text style={styles.metaText}>{note.pages} pages</Text>
            </View>

            <View style={styles.pdfBadge}>
              <Text style={styles.pdfText}>PDF</Text>
            </View>

            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={13} color={Colors.slate500} />
              <Text style={styles.metaText}>{note.fileSize}</Text>
            </View>
          </View>
        </View>

        {/* Right Arrow */}
        <View style={styles.arrowContainer}>
          <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.divider,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconTagText: {
    fontSize: 8,
    fontWeight: Typography.weight.bold,
    color: Colors.whiteAlpha90,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  detailsContainer: {
    flex: 1,
    marginRight: 8,
  },
  titleRow: {
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
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.semiBold,
  },
  descriptionText: {
    fontSize: Typography.size.xs,
    color: Colors.slate500,
    lineHeight: 16,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: Typography.size.xxs,
    color: Colors.slate500,
    fontWeight: Typography.weight.medium,
  },
  pdfBadge: {
    backgroundColor: Colors.red50,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  pdfText: {
    fontSize: 9,
    fontWeight: Typography.weight.bold,
    color: Colors.dangerDark,
  },
  arrowContainer: {
    paddingLeft: 4,
  },
});

export default NoteCard;
