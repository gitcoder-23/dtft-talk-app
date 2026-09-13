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
import { Colors } from '../../constants/color';
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
                  <Stop offset="0" stopColor={Colors.sky200} />
                  <Stop offset="1" stopColor={Colors.sky50} />
                </SvgGradient>
              </Defs>

              {/* Big Ben Outline / London Skyline */}
              <Path
                d="M 120 160 L 120 90 L 126 80 L 132 90 L 132 160 Z"
                fill={Colors.blue200}
                opacity={0.6}
              />
              <Rect x="123" y="92" width="6" height="6" rx="3" fill={Colors.white} opacity={0.8} />
              <Path d="M 126 70 L 126 80" stroke={Colors.blue200} strokeWidth="2" />

              {/* Boy Mascot in Blue Hoodie */}
              <Circle cx="80" cy="90" r="34" fill={Colors.primary} />
              <Circle cx="80" cy="58" r="26" fill={Colors.amber300} />
              {/* Hair */}
              <Path d="M 56 56 C 56 32 104 32 104 56 C 100 48 90 44 80 46 C 70 44 60 48 56 56 Z" fill={Colors.slate800} />
              {/* Eyes & Smile */}
              <Circle cx="72" cy="56" r="3" fill={Colors.slate800} />
              <Circle cx="88" cy="56" r="3" fill={Colors.slate800} />
              <Path d="M 74 65 Q 80 72 86 65" stroke={Colors.rose600} strokeWidth="2.5" fill="none" strokeLinecap="round" />

              {/* Holding Book: "Speak English" */}
              <Rect x="62" y="98" width="40" height="36" rx="4" fill={Colors.primaryDarker} stroke={Colors.white} strokeWidth="1.5" />
              <Rect x="64" y="100" width="36" height="4" fill={Colors.amber} />
              <Path d="M 66 112 L 94 112 M 66 120 L 90 120" stroke={Colors.white} strokeWidth="2" strokeLinecap="round" />

              {/* Floating Quote Bubble */}
              <G transform="translate(70, 6)">
                <Rect x="0" y="0" width="85" height="34" rx="8" fill={Colors.white} />
                <Path d="M 14 34 L 10 40 L 22 34 Z" fill={Colors.white} />
                <Circle cx="8" cy="17" r="4" fill={Colors.warning} />
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
              <Ionicons name="flame" size={24} color={Colors.orange500} />
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
            <Ionicons name="star" size={22} color={Colors.amber} />
            <View style={styles.levelInfo}>
              <Text style={styles.levelLabel}>Your Level</Text>
              <Text style={styles.levelValue}>Beginner</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Continue Learning Section */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleLeft}>
            <Ionicons name="book" size={20} color={Colors.primary} />
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
            <Ionicons name="disc-outline" size={20} color={Colors.danger} />
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
              <View style={[styles.practiceIconCircle, { backgroundColor: Colors.white }]}>
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
            <Ionicons name="flame-outline" size={20} color={Colors.orange500} />
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
            <Ionicons name="bulb-outline" size={22} color={Colors.warning} />
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
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  heroBannerCard: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 22,
    backgroundColor: Colors.sky100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.sky150,
    shadowColor: Colors.primary,
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
    color: Colors.primaryBlueDark,
  },
  heroTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.extraBold,
    color: Colors.primaryDarker,
    lineHeight: 24,
    marginVertical: 4,
  },
  heroTag: {
    fontSize: Typography.size.xxs,
    color: Colors.slate600,
    fontWeight: Typography.weight.medium,
    marginBottom: 12,
  },
  heroCtaBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignSelf: 'flex-start',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  heroCtaText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.white,
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
    color: Colors.primary,
  },
  quoteBubbleLine2: {
    fontSize: 8,
    fontWeight: Typography.weight.medium,
    color: Colors.secondary,
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
    borderColor: Colors.divider,
  },
  quickCatTitle: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.semiBold,
    color: Colors.slate800,
    textAlign: 'center',
    lineHeight: 13,
  },
  streakLevelCard: {
    marginHorizontal: 16,
    marginTop: 18,
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.divider,
    shadowColor: Colors.shadowColor,
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
    backgroundColor: Colors.amber50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakInfo: {},
  streakTitle: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  streakNumber: {
    color: Colors.orange500,
    fontWeight: Typography.weight.extraBold,
  },
  streakSubtitle: {
    fontSize: Typography.size.xxs,
    color: Colors.slate500,
    marginTop: 2,
  },
  streakDivider: {
    width: 1,
    height: 38,
    backgroundColor: Colors.divider,
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
    color: Colors.slate500,
  },
  levelValue: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.primary,
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
    color: Colors.textPrimary,
  },
  viewAllText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semiBold,
    color: Colors.primary,
  },
  changeGoalText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semiBold,
    color: Colors.primary,
  },
  continueCard: {
    marginHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.divider,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  notebookGraphicBox: {
    width: 120,
    backgroundColor: Colors.primary,
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
    color: Colors.white,
  },
  grammarBadge: {
    backgroundColor: Colors.amber,
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    marginTop: 3,
  },
  grammarBadgeText: {
    fontSize: 8,
    fontWeight: Typography.weight.bold,
    color: Colors.slate800,
  },
  notebookPage: {
    backgroundColor: Colors.white,
    borderRadius: 6,
    padding: 6,
  },
  notebookPageText: {
    fontSize: 9,
    color: Colors.slate800,
    lineHeight: 12,
    fontWeight: Typography.weight.medium,
  },
  continueInfo: {
    flex: 1,
  },
  continueTitle: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  continueDesc: {
    fontSize: Typography.size.xxs,
    color: Colors.slate500,
    marginTop: 2,
    lineHeight: 14,
  },
  progressContainer: {
    marginVertical: 6,
  },
  progressBarTrack: {
    height: 5,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 3,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: Typography.size.xxs,
    color: Colors.slate500,
    fontWeight: Typography.weight.medium,
  },
  continueBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  continueBtnText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.white,
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
    borderColor: Colors.shadowLight,
  },
  practiceIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  practiceMiniTitle: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  practiceMiniSub: {
    fontSize: 9,
    color: Colors.slate500,
    textAlign: 'center',
    lineHeight: 12,
    marginBottom: 8,
  },
  practiceMiniBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: Colors.white,
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
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.divider,
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
    color: Colors.textPrimary,
    flex: 1,
  },
  tourBanner: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  tourIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.warningLight,
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
    color: Colors.textPrimary,
  },
  tourSubtitle: {
    fontSize: 10,
    color: Colors.slate500,
    marginTop: 1,
  },
  tourBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  tourBtnText: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.bold,
    color: Colors.white,
  },
});

export default HomeScreen;
