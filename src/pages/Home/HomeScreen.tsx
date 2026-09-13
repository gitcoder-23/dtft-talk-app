import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Svg, {
  Rect,
  Circle,
  Path,
  G,
  LinearGradient as SvgGradient,
  Stop,
  Defs,
} from 'react-native-svg';
import { RootStackParamList } from '../../appNavigation/navigationTypes';
import { Typography } from '../../constants/fonts';
import {
  HOME_QUICK_CATEGORIES,
  CONTINUE_LEARNING_ITEM,
  TODAY_PRACTICE_ITEMS,
  POPULAR_TOPICS,
} from '../../constants/mockData';
import { AppHeader } from '../../common/AppHeader';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleNavigateToCourse = () => {
    navigation.navigate('CourseDetail');
  };

  const handleQuickCategoryPress = (category: typeof HOME_QUICK_CATEGORIES[0]) => {
    if (category.targetScreen === 'Notes') {
      navigation.navigate('MainTabs', { screen: 'NotesTab' });
    } else {
      navigation.navigate('MainTabs', { screen: 'PracticeTab' });
    }
  };

  return (
    <View style={styles.safeArea}>
      {/* App Header */}
      <AppHeader
        showBack={false}
        hasUnreadNotifications={true}
        onNotificationPress={() => {}}
        onAvatarPress={() => navigation.navigate('MainTabs', { screen: 'ProfileTab' })}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Banner: Start Your Spoken English Journey Today! */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleNavigateToCourse}
          style={styles.heroBannerCard}
        >
          {/* Left Text & CTA */}
          <View style={styles.heroLeft}>
            <Text style={styles.heroSub}>Start Your</Text>
            <Text style={styles.heroTitle}>Spoken English{'\n'}Journey Today!</Text>
            <Text style={styles.heroTag}>Small steps. Big confidence.</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleNavigateToCourse}
              style={styles.heroCtaBtn}
            >
              <Text style={styles.heroCtaText}>Let's Learn →</Text>
            </TouchableOpacity>
          </View>

          {/* Right Mascot with "Speak English" book & Big Ben */}
          <View style={styles.heroRightArt}>
            <Svg width="150" height="150" viewBox="0 0 160 160">
              <Defs>
                <SvgGradient id="skyGrad" x1="0" y1="0" x2="1" y2="1">
                  <Stop offset="0" stopColor="#BAE6FD" />
                  <Stop offset="1" stopColor="#E0F2FE" />
                </SvgGradient>
              </Defs>

              {/* Big Ben Outline / London Skyline */}
              <Path
                d="M 120 160 L 120 90 L 126 80 L 132 90 L 132 160 Z"
                fill="#93C5FD"
                opacity={0.6}
              />
              <Rect x="123" y="92" width="6" height="6" rx="3" fill="#FFFFFF" opacity={0.8} />
              <Path d="M 126 70 L 126 80" stroke="#93C5FD" strokeWidth="2" />

              {/* Boy Mascot in Blue Hoodie */}
              <Circle cx="80" cy="90" r="34" fill="#0084FF" />
              <Circle cx="80" cy="58" r="26" fill="#FCD34D" />
              {/* Hair */}
              <Path d="M 56 56 C 56 32 104 32 104 56 C 100 48 90 44 80 46 C 70 44 60 48 56 56 Z" fill="#1E293B" />
              {/* Eyes & Smile */}
              <Circle cx="72" cy="56" r="3" fill="#1E293B" />
              <Circle cx="88" cy="56" r="3" fill="#1E293B" />
              <Path d="M 74 65 Q 80 72 86 65" stroke="#E11D48" strokeWidth="2.5" fill="none" strokeLinecap="round" />

              {/* Holding Book: "Speak English" */}
              <Rect x="62" y="98" width="40" height="36" rx="4" fill="#005CE6" stroke="#FFFFFF" strokeWidth="1.5" />
              <Rect x="64" y="100" width="36" height="4" fill="#FFC107" />
              <Path d="M 66 112 L 94 112 M 66 120 L 90 120" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

              {/* Floating Quote Bubble */}
              <G transform="translate(70, 6)">
                <Rect x="0" y="0" width="85" height="34" rx="8" fill="#FFFFFF" />
                <Path d="M 14 34 L 10 40 L 22 34 Z" fill="#FFFFFF" />
                <Circle cx="8" cy="17" r="4" fill="#FFB300" />
              </G>
            </Svg>

            {/* Bubble Overlay Text */}
            <View style={styles.quoteBubbleTextOverlay}>
              <Text style={styles.quoteBubbleLine1}>Better English</Text>
              <Text style={styles.quoteBubbleLine2}>Brighter Future</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Quick Category Horizontal Scroll / Chips */}
        <View style={styles.quickCategoriesSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickCategoriesScroll}
          >
            {HOME_QUICK_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                activeOpacity={0.75}
                onPress={() => handleQuickCategoryPress(cat)}
                style={styles.quickCategoryTile}
              >
                <View style={[styles.quickCatIconBox, { backgroundColor: cat.bgColor }]}>
                  <Ionicons name={cat.icon as any} size={24} color={cat.color} />
                </View>
                <Text style={styles.quickCatTitle}>{cat.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Dual Card: 7 Day Streak & Beginner Level */}
        <View style={styles.streakLevelCard}>
          {/* Left: Streak */}
          <View style={styles.streakHalf}>
            <View style={styles.streakIconCircle}>
              <Ionicons name="flame" size={24} color="#FF9800" />
            </View>
            <View style={styles.streakInfo}>
              <Text style={styles.streakTitle}>
                <Text style={styles.streakNumber}>7 </Text>Day Streak
              </Text>
              <Text style={styles.streakSubtitle}>Keep going! You're doing great!</Text>
            </View>
          </View>

          {/* Middle Divider */}
          <View style={styles.streakDivider} />

          {/* Right: Level */}
          <TouchableOpacity
            style={styles.levelHalf}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('MainTabs', { screen: 'ProgressTab' })}
          >
            <Ionicons name="star" size={22} color="#FFC107" />
            <View style={styles.levelInfo}>
              <Text style={styles.levelLabel}>Your Level</Text>
              <Text style={styles.levelValue}>Beginner</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#0084FF" />
          </TouchableOpacity>
        </View>

        {/* Continue Learning Section */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleLeft}>
            <Ionicons name="book" size={20} color="#0084FF" />
            <Text style={styles.sectionTitleText}>Continue Learning</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('MainTabs', { screen: 'NotesTab' })}
          >
            <Text style={styles.viewAllText}>View All →</Text>
          </TouchableOpacity>
        </View>

        {/* Continue Learning Card */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleNavigateToCourse}
          style={styles.continueCard}
        >
          {/* Left Notebook Graphic */}
          <View style={styles.notebookGraphicBox}>
            <View style={styles.notebookHeader}>
              <Text style={styles.notebookHeaderTitle}>Present Simple Tense</Text>
              <View style={styles.grammarBadge}>
                <Text style={styles.grammarBadgeText}>Grammar</Text>
              </View>
            </View>
            <View style={styles.notebookPage}>
              <Text style={styles.notebookPageText}>{CONTINUE_LEARNING_ITEM.exampleText}</Text>
            </View>
          </View>

          {/* Right Lesson Info */}
          <View style={styles.continueInfo}>
            <Text style={styles.continueTitle}>{CONTINUE_LEARNING_ITEM.title}</Text>
            <Text style={styles.continueDesc} numberOfLines={2}>
              {CONTINUE_LEARNING_ITEM.description}
            </Text>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBarTrack}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${CONTINUE_LEARNING_ITEM.progressPercent}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressLabel}>
                {CONTINUE_LEARNING_ITEM.completedLessons}/{CONTINUE_LEARNING_ITEM.totalLessons} Lessons
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleNavigateToCourse}
              style={styles.continueBtn}
            >
              <Text style={styles.continueBtnText}>Continue →</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Today's Practice Section */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleLeft}>
            <Ionicons name="disc-outline" size={20} color="#FF3B30" />
            <Text style={styles.sectionTitleText}>Today's Practice</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.changeGoalText}>Change Daily Goal</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Practice 4 Cards */}
        <View style={styles.practiceCardsGrid}>
          {TODAY_PRACTICE_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('MainTabs', { screen: 'PracticeTab' })}
              style={[styles.practiceMiniCard, { backgroundColor: item.bgColor }]}
            >
              <View style={[styles.practiceIconCircle, { backgroundColor: '#FFFFFF' }]}>
                <Ionicons name={item.icon as any} size={22} color={item.color} />
              </View>
              <Text style={styles.practiceMiniTitle}>{item.title}</Text>
              <Text style={styles.practiceMiniSub}>{item.subtitle}</Text>
              <View style={[styles.practiceMiniBtn, { borderColor: item.color }]}>
                <Text style={[styles.practiceMiniBtnText, { color: item.color }]}>
                  {item.actionText}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Topics Section */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleLeft}>
            <Ionicons name="flame-outline" size={20} color="#FF9800" />
            <Text style={styles.sectionTitleText}>Popular Topics</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('MainTabs', { screen: 'NotesTab' })}
          >
            <Text style={styles.viewAllText}>View All →</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Topics 8 Items Grid */}
        <View style={styles.topicsGrid}>
          {POPULAR_TOPICS.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              activeOpacity={0.75}
              onPress={() => navigation.navigate('MainTabs', { screen: 'NotesTab' })}
              style={styles.topicPillItem}
            >
              <View style={[styles.topicIconSmall, { backgroundColor: topic.bgColor }]}>
                <Ionicons name={topic.icon as any} size={16} color={topic.color} />
              </View>
              <Text style={styles.topicTitleText}>{topic.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Interactive Tour Banner */}
        <View style={styles.tourBanner}>
          <View style={styles.tourIconCircle}>
            <Ionicons name="bulb-outline" size={22} color="#FFB300" />
          </View>
          <View style={styles.tourTextInfo}>
            <Text style={styles.tourTitle}>New to DTFT Talk?</Text>
            <Text style={styles.tourSubtitle}>
              Take a quick tour and explore all features.
            </Text>
          </View>
          <TouchableOpacity style={styles.tourBtn} activeOpacity={0.8}>
            <Text style={styles.tourBtnText}>Take Tour →</Text>
          </TouchableOpacity>
        </View>
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
  heroBannerCard: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 22,
    backgroundColor: '#E1F3FD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#C7E8FD',
    shadowColor: '#0084FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  heroLeft: {
    flex: 1,
    zIndex: 2,
  },
  heroSub: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: '#0062E0',
  },
  heroTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.extraBold,
    color: '#005CE6',
    lineHeight: 24,
    marginVertical: 4,
  },
  heroTag: {
    fontSize: Typography.size.xxs,
    color: '#475569',
    fontWeight: Typography.weight.medium,
    marginBottom: 12,
  },
  heroCtaBtn: {
    backgroundColor: '#0084FF',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignSelf: 'flex-start',
    shadowColor: '#0084FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  heroCtaText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: '#FFFFFF',
  },
  heroRightArt: {
    width: 140,
    height: 140,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteBubbleTextOverlay: {
    position: 'absolute',
    top: 10,
    right: 0,
    alignItems: 'center',
  },
  quoteBubbleLine1: {
    fontSize: 9,
    fontWeight: Typography.weight.bold,
    color: '#0084FF',
  },
  quoteBubbleLine2: {
    fontSize: 8,
    fontWeight: Typography.weight.medium,
    color: '#FF9500',
  },
  quickCategoriesSection: {
    marginTop: 16,
  },
  quickCategoriesScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  quickCategoryTile: {
    alignItems: 'center',
    width: 76,
  },
  quickCatIconBox: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#EEF2F6',
  },
  quickCatTitle: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.semiBold,
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 13,
  },
  streakLevelCard: {
    marginHorizontal: 16,
    marginTop: 18,
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
  streakHalf: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  streakIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF8E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakInfo: {},
  streakTitle: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: '#0F172A',
  },
  streakNumber: {
    color: '#FF9800',
    fontWeight: Typography.weight.extraBold,
  },
  streakSubtitle: {
    fontSize: Typography.size.xxs,
    color: '#64748B',
    marginTop: 2,
  },
  streakDivider: {
    width: 1,
    height: 38,
    backgroundColor: '#EEF2F6',
    marginHorizontal: 8,
  },
  levelHalf: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 4,
  },
  levelInfo: {
    marginLeft: 6,
  },
  levelLabel: {
    fontSize: Typography.size.xxs,
    color: '#64748B',
  },
  levelValue: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: '#0084FF',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitleText: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
    color: '#0F172A',
  },
  viewAllText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semiBold,
    color: '#0084FF',
  },
  changeGoalText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semiBold,
    color: '#0084FF',
  },
  continueCard: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
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
  notebookGraphicBox: {
    width: 120,
    backgroundColor: '#0084FF',
    borderRadius: 12,
    padding: 8,
    marginRight: 12,
  },
  notebookHeader: {
    marginBottom: 6,
  },
  notebookHeaderTitle: {
    fontSize: 10,
    fontWeight: Typography.weight.bold,
    color: '#FFFFFF',
  },
  grammarBadge: {
    backgroundColor: '#FFC107',
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    marginTop: 3,
  },
  grammarBadgeText: {
    fontSize: 8,
    fontWeight: Typography.weight.bold,
    color: '#1E293B',
  },
  notebookPage: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    padding: 6,
  },
  notebookPageText: {
    fontSize: 9,
    color: '#1E293B',
    lineHeight: 12,
    fontWeight: Typography.weight.medium,
  },
  continueInfo: {
    flex: 1,
  },
  continueTitle: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: '#0F172A',
  },
  continueDesc: {
    fontSize: Typography.size.xxs,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 14,
  },
  progressContainer: {
    marginVertical: 6,
  },
  progressBarTrack: {
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 3,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0084FF',
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: Typography.size.xxs,
    color: '#64748B',
    fontWeight: Typography.weight.medium,
  },
  continueBtn: {
    backgroundColor: '#0084FF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  continueBtnText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: '#FFFFFF',
  },
  practiceCardsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 8,
  },
  practiceMiniCard: {
    flex: 1,
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  practiceIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  practiceMiniTitle: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: '#0F172A',
    marginBottom: 2,
  },
  practiceMiniSub: {
    fontSize: 9,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 12,
    marginBottom: 8,
  },
  practiceMiniBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  practiceMiniBtnText: {
    fontSize: 9,
    fontWeight: Typography.weight.bold,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    gap: 10,
  },
  topicPillItem: {
    width: (width - 42) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEF2F6',
  },
  topicIconSmall: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  topicTitleText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semiBold,
    color: '#0F172A',
    flex: 1,
  },
  tourBanner: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEF2F6',
  },
  tourIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF9E7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  tourTextInfo: {
    flex: 1,
  },
  tourTitle: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: '#0F172A',
  },
  tourSubtitle: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 1,
  },
  tourBtn: {
    backgroundColor: '#0084FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  tourBtnText: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.bold,
    color: '#FFFFFF',
  },
});

export default HomeScreen;
