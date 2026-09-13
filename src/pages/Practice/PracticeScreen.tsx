import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Path, Rect, G } from 'react-native-svg';
import { Typography } from '../../constants/fonts';
import { SPEAKING_MODULES, PracticeModuleItem } from '../../constants/mockData';
import { AppHeader } from '../../common/AppHeader';
import { CategoryPill } from '../../common/CategoryPill';
import { PracticeModuleCard } from '../../common/PracticeModuleCard';
import { CircularProgress } from '../../common/CircularProgress';

const SPEAKING_CATEGORIES = [
  'All Speaking',
  'Basic Phrases',
  'Daily Conversation',
  'Interview Practice',
  'Travel English',
  'Group Discussion',
];

export const PracticeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All Speaking');

  const handleModulePress = (module: PracticeModuleItem) => {
    Alert.alert(
      `Speaking Practice: ${module.title}`,
      `Level: ${module.level} • Duration: ${module.duration}\n\nReady to listen, repeat, and record your sentence?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start Recording 🎙️',
          onPress: () => Alert.alert('Practice Session Started', 'Listen carefully to the audio prompt, then hold the microphone button to record!'),
        },
      ]
    );
  };

  const handleStartGeneralPractice = () => {
    Alert.alert('General Speaking Drill', 'Starting AI conversational speaking drill...');
  };

  return (
    <View style={styles.safeArea}>
      {/* App Header */}
      <AppHeader
        showBack={true}
        onBackPress={() => navigation.goBack()}
        hasUnreadNotifications={true}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Banner: Speaking Practice */}
        <View style={styles.heroBanner}>
          <View style={styles.heroLeft}>
            <View style={styles.micIconCircle}>
              <Ionicons name="mic" size={24} color="#0084FF" />
            </View>
            <Text style={styles.heroTitle}>Speaking Practice</Text>
            <Text style={styles.heroSubtitle}>
              Listen. Repeat. Record. Improve.
            </Text>
            <Text style={styles.heroDesc}>
              Build your confidence, one sentence at a time.
            </Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleStartGeneralPractice}
              style={styles.heroCtaBtn}
            >
              <Text style={styles.heroCtaText}>Start Practice →</Text>
            </TouchableOpacity>
          </View>

          {/* Right Mascot Artwork with Studio Mic */}
          <View style={styles.heroArtBox}>
            <Svg width="130" height="130" viewBox="0 0 140 140">
              {/* Studio Mic Stand */}
              <Rect x="100" y="60" width="10" height="16" rx="5" fill="#1E293B" />
              <Path d="M 95 68 A 10 10 0 0 0 115 68" stroke="#1E293B" strokeWidth="2.5" fill="none" />
              <Path d="M 105 78 L 105 92 M 98 92 L 112 92" stroke="#1E293B" strokeWidth="2.5" />

              {/* Boy Head & Headphones */}
              <Circle cx="60" cy="65" r="28" fill="#FCD34D" />
              {/* Blue Hoodie */}
              <Circle cx="60" cy="108" r="36" fill="#0084FF" />
              {/* Hair */}
              <Path d="M 36 60 C 36 34 84 34 84 60 C 80 50 70 46 60 48 C 50 46 40 50 36 60 Z" fill="#1E293B" />
              {/* Headphones Band & Pads */}
              <Path d="M 34 65 C 34 38 86 38 86 65" stroke="#005CE6" strokeWidth="4" fill="none" />
              <Rect x="30" y="58" width="8" height="18" rx="4" fill="#005CE6" />
              <Rect x="82" y="58" width="8" height="18" rx="4" fill="#005CE6" />

              {/* Eyes & Smile */}
              <Circle cx="54" cy="62" r="3" fill="#1E293B" />
              <Circle cx="68" cy="62" r="3" fill="#1E293B" />
              <Path d="M 55 70 Q 61 78 67 70" stroke="#E11D48" strokeWidth="2.5" fill="none" strokeLinecap="round" />

              {/* Speech Bubble: "Practice Makes Perfect!" */}
              <G transform="translate(68, 6)">
                <Rect x="0" y="0" width="70" height="28" rx="6" fill="#0084FF" />
                <Path d="M 10 28 L 6 34 L 16 28 Z" fill="#0084FF" />
              </G>
            </Svg>

            {/* Bubble Overlay Text */}
            <View style={styles.quoteBubbleOverlay}>
              <Text style={styles.quoteBubbleLine}>Practice</Text>
              <Text style={styles.quoteBubbleLine}>Makes Perfect!</Text>
            </View>
          </View>
        </View>

        {/* Horizontal Category Filter Pills */}
        <View style={styles.categoriesSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {SPEAKING_CATEGORIES.map((cat) => (
              <CategoryPill
                key={cat}
                label={cat}
                isActive={selectedCategory === cat}
                onPress={() => setSelectedCategory(cat)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Section Header: Speaking Practice Modules */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionHeaderLeft}>
            <Ionicons name="stats-chart" size={20} color="#0084FF" />
            <Text style={styles.sectionHeaderText}>Speaking Practice Modules</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All →</Text>
          </TouchableOpacity>
        </View>

        {/* Practice Module Cards */}
        <View style={styles.modulesList}>
          {SPEAKING_MODULES.map((mod) => (
            <PracticeModuleCard
              key={mod.id}
              module={mod}
              onPress={handleModulePress}
            />
          ))}
        </View>

        {/* Bottom Speaking Progress Card (68%) */}
        <TouchableOpacity
          style={styles.speakingProgressCard}
          activeOpacity={0.85}
          onPress={() => {}}
        >
          <View style={styles.targetIconBox}>
            <Ionicons name="disc-outline" size={28} color="#0084FF" />
          </View>

          <View style={styles.progressInfo}>
            <Text style={styles.progressCardTitle}>Your Speaking Progress</Text>
            <Text style={styles.progressCardSub}>
              You are doing great! Keep practicing!
            </Text>
          </View>

          <View style={styles.progressRingWrapper}>
            <CircularProgress percentage={68} size={54} strokeWidth={5} />
          </View>

          <Ionicons name="chevron-forward" size={20} color="#0084FF" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  heroBanner: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 20,
    backgroundColor: '#E6F4FE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#C7E8FD',
  },
  heroLeft: {
    flex: 1,
    zIndex: 2,
  },
  micIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    shadowColor: '#0084FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  heroTitle: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.extraBold,
    color: '#005CE6',
    marginBottom: 2,
  },
  heroSubtitle: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: '#1E293B',
  },
  heroDesc: {
    fontSize: Typography.size.xxs,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 10,
    lineHeight: 14,
  },
  heroCtaBtn: {
    backgroundColor: '#0084FF',
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  heroCtaText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: '#FFFFFF',
  },
  heroArtBox: {
    width: 130,
    height: 130,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteBubbleOverlay: {
    position: 'absolute',
    top: 8,
    right: 0,
    alignItems: 'center',
  },
  quoteBubbleLine: {
    fontSize: 8,
    fontWeight: Typography.weight.bold,
    color: '#FFFFFF',
  },
  categoriesSection: {
    marginTop: 14,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 10,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionHeaderText: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
    color: '#0F172A',
  },
  viewAllText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semiBold,
    color: '#0084FF',
  },
  modulesList: {
    paddingHorizontal: 16,
  },
  speakingProgressCard: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEF2F6',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  targetIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8F4FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  progressInfo: {
    flex: 1,
  },
  progressCardTitle: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: '#0F172A',
  },
  progressCardSub: {
    fontSize: Typography.size.xxs,
    color: '#64748B',
    marginTop: 2,
  },
  progressRingWrapper: {
    marginLeft: 6,
  },
});

export default PracticeScreen;
