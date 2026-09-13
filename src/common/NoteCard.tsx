import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/color';
import { Typography } from '../constants/fonts';
import { NoteItem } from '../constants/mockData';

interface NoteCardProps {
  note: NoteItem;
  onPress: (note: NoteItem) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onPress }) => {
  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'Grammar':
        return { bg: '#FFEBEB', text: '#E53935' };
      case 'Vocabulary':
        return { bg: '#FFF8E1', text: '#F57C00' };
      case 'Conversation':
        return { bg: '#E8F8F5', text: '#00897B' };
      case 'Speaking':
        return { bg: '#F3E5F5', text: '#8E24AA' };
      case 'Listening':
        return { bg: '#E0F7FA', text: '#00838F' };
      default:
        return { bg: '#E3F2FD', text: '#1976D2' };
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
          <Ionicons name={note.icon as any} size={28} color="#FFFFFF" />
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
              <Ionicons name="copy-outline" size={13} color="#64748B" />
              <Text style={styles.metaText}>{note.pages} pages</Text>
            </View>

            <View style={styles.pdfBadge}>
              <Text style={styles.pdfText}>PDF</Text>
            </View>

            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={13} color="#64748B" />
              <Text style={styles.metaText}>{note.fileSize}</Text>
            </View>
          </View>
        </View>

        {/* Right Arrow */}
        <View style={styles.arrowContainer}>
          <Ionicons name="chevron-forward" size={20} color="#0084FF" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    shadowColor: '#0F172A',
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
    color: 'rgba(255, 255, 255, 0.9)',
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
    color: '#0F172A',
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
    color: '#64748B',
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
    color: '#64748B',
    fontWeight: Typography.weight.medium,
  },
  pdfBadge: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  pdfText: {
    fontSize: 9,
    fontWeight: Typography.weight.bold,
    color: '#D32F2F',
  },
  arrowContainer: {
    paddingLeft: 4,
  },
});

export default NoteCard;
