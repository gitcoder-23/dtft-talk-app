import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
  Platform,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, {
  Rect,
  Circle,
  Path,
  G,
} from 'react-native-svg';
import { Typography } from '../../constants/fonts';
import { Colors } from '../../constants/color';
import { COMPLETE_COURSE_DATA } from '../../constants/mockData';
import { AppHeader } from '../../common/AppHeader';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DETAIL_SUB_TABS = [
  { id: 'overview', label: 'Overview', icon: 'document-text' },
  { id: 'what_learn', label: "What You'll Learn", icon: 'disc' },
  { id: 'curriculum', label: 'Curriculum', icon: 'list' },
  { id: 'projects', label: 'Projects', icon: 'code-slash' },
  { id: 'instructor', label: 'Instructor', icon: 'person' },
  { id: 'reviews', label: 'Reviews', icon: 'star' },
  { id: 'faq', label: 'FAQ', icon: 'help-circle' },
] as const;

export const CourseDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState('overview');
  const [isSaved, setIsSaved] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [expandedModules, setExpandedModules] = useState<number[]>([1]); // module 1 open by default
  const [expandedFaqs, setExpandedFaqs] = useState<string[]>(['1']); // faq 1 open by default

  const toggleModule = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const toggleAllModules = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expandedModules.length === COMPLETE_COURSE_DATA.curriculum.length) {
      setExpandedModules([]);
    } else {
      setExpandedModules(COMPLETE_COURSE_DATA.curriculum.map((c) => c.id));
    }
  };

  const toggleFaq = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedFaqs((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Join me on DTFT Talk to master Spoken English! Download the app: https://dtfttalk.com/course',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
    Alert.alert(
      !isSaved ? 'Course Saved! 🔖' : 'Removed from Saved',
      !isSaved
        ? 'Spoken English (Complete Course) has been added to your saved courses list.'
        : 'Course removed from your saved list.'
    );
  };

  const handleEnroll = () => {
    Alert.alert(
      'Enroll in Spoken English Course',
      `Special Fee: ${COMPLETE_COURSE_DATA.price} (${COMPLETE_COURSE_DATA.discount})\nOriginal Price: ${COMPLETE_COURSE_DATA.originalPrice}\n\nIncludes 12 Weeks of live interactive mentoring, audio speaking drills, downloadable PDF notes, and verified certificate.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Proceed to Pay ₹2,999',
          onPress: () => {
            setIsEnrolled(true);
            Alert.alert(
              'Enrollment Successful! 🎉',
              'Welcome to Spoken English (Complete Course)! Your learning journey starts now.',
              [
                {
                  text: 'Go to Speak Practice',
                  onPress: () => navigation.navigate('MainTabs', { screen: 'PracticeTab' }),
                },
                { text: 'OK', style: 'default' },
              ]
            );
          },
        },
      ]
    );
  };

  const handleProjectPress = (projectTitle: string) => {
    Alert.alert(
      `Project: ${projectTitle}`,
      'Ready to start this practical speaking exercise and role play?',
      [
        { text: 'Later', style: 'cancel' },
        {
          text: 'Start Now 🚀',
          onPress: () => navigation.navigate('MainTabs', { screen: 'PracticeTab' }),
        },
      ]
    );
  };

  const handleInstructorProfile = () => {
    Alert.alert(
      COMPLETE_COURSE_DATA.instructor.name,
      `${COMPLETE_COURSE_DATA.instructor.title}\n\nOver 8+ years guiding 15,000+ students to fluent English with practical accent, grammar, and real-life confidence coaching.\n\n"${COMPLETE_COURSE_DATA.instructor.quote}"`
    );
  };

  return (
    <View style={styles.safeArea}>
      {/* App Header with Back and Share icons */}
      <AppHeader
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightIcon="share"
        onSharePress={handleShare}
        onAvatarPress={() => navigation.navigate('MainTabs', { screen: 'ProfileTab' })}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 85 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Course Hero Banner */}
        <View style={styles.heroCard}>
          {/* Top Pill Badge */}
          <View style={styles.heroTopRow}>
            <View style={styles.spokenEnglishBadge}>
              <Text style={styles.spokenEnglishBadgeText}>{COMPLETE_COURSE_DATA.tag}</Text>
            </View>
          </View>

          {/* Title & Artwork Row */}
          <View style={styles.heroContentRow}>
            <View style={styles.heroLeftDetails}>
              <Text style={styles.courseTitle}>Spoken English</Text>
              <Text style={styles.courseTitleSub}>(Complete Course)</Text>
              <Text style={styles.courseSubtitle}>{COMPLETE_COURSE_DATA.subtitle}</Text>

              {/* Stats Row */}
              <View style={styles.statsRow}>
                {/* Duration */}
                <View style={styles.statItem}>
                  <View style={styles.statIconCircle}>
                    <Ionicons name="time-outline" size={13} color={Colors.primary} />
                  </View>
                  <View style={styles.statTextCol}>
                    <Text style={styles.statLabel}>Duration</Text>
                    <Text style={styles.statValue}>{COMPLETE_COURSE_DATA.duration}</Text>
                  </View>
                </View>

                {/* Level */}
                <View style={styles.statItem}>
                  <View style={styles.statIconCircle}>
                    <Ionicons name="bar-chart-outline" size={13} color={Colors.primary} />
                  </View>
                  <View style={styles.statTextCol}>
                    <Text style={styles.statLabel}>Level</Text>
                    <Text style={styles.statValue}>{COMPLETE_COURSE_DATA.level}</Text>
                  </View>
                </View>

                {/* Students */}
                <View style={styles.statItem}>
                  <View style={styles.statIconCircle}>
                    <Ionicons name="people-outline" size={13} color={Colors.primary} />
                  </View>
                  <View style={styles.statTextCol}>
                    <Text style={styles.statLabel}>Students</Text>
                    <Text style={styles.statValue}>{COMPLETE_COURSE_DATA.students}</Text>
                  </View>
                </View>
              </View>

              {/* Rating Row */}
              <View style={styles.ratingRow}>
                <View style={styles.starsGroup}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Ionicons key={s} name="star" size={13} color={Colors.amber} style={{ marginRight: 2 }} />
                  ))}
                </View>
                <Text style={styles.ratingNumber}>{COMPLETE_COURSE_DATA.rating}</Text>
                <Text style={styles.reviewsCount}>({COMPLETE_COURSE_DATA.reviewsCount})</Text>
              </View>
            </View>

            {/* Right Artwork: Mascot with "Speak English" Book & Bubbles */}
            <View style={styles.mascotArtBox}>
              <Svg width="125" height="150" viewBox="0 0 135 160">
                {/* Big Ben Outline in background */}
                <Path d="M 102 160 L 102 75 L 110 60 L 118 75 L 118 160 Z" fill={Colors.sky200} opacity={0.65} />
                <Circle cx="110" cy="85" r="4" fill={Colors.white} opacity={0.9} />
                <Path d="M 110 50 L 110 60" stroke={Colors.sky200} strokeWidth="1.5" />

                {/* Boy Mascot in Blue Hoodie */}
                <Circle cx="64" cy="98" r="32" fill={Colors.primary} />
                <Circle cx="64" cy="64" r="26" fill={Colors.amber300} />
                {/* Hair */}
                <Path d="M 40 62 C 40 38 88 38 88 62 C 84 52 74 48 64 50 C 54 48 44 52 40 62 Z" fill={Colors.slate800} />
                {/* Eyes & Smile */}
                <Circle cx="56" cy="62" r="3" fill={Colors.slate800} />
                <Circle cx="72" cy="62" r="3" fill={Colors.slate800} />
                <Path d="M 58 71 Q 64 78 70 71" stroke={Colors.rose600} strokeWidth="2.5" fill="none" strokeLinecap="round" />

                {/* Book: "Speak English" */}
                <Rect x="46" y="104" width="36" height="34" rx="4" fill={Colors.primaryDarker} stroke={Colors.white} strokeWidth="1.5" />
                <Rect x="48" y="106" width="32" height="3" fill={Colors.amber} />
                <Path d="M 52 118 L 76 118 M 52 126 L 72 126" stroke={Colors.white} strokeWidth="2" strokeLinecap="round" />

                {/* Floating Chips / Speech Bubbles: Listen, Speak, Practice, Grow */}
                {/* 1. Listen (Blue speech bubble) */}
                <G transform="translate(4, 42)">
                  <Rect x="0" y="0" width="46" height="22" rx="11" fill={Colors.primary} />
                  <Path d="M 23 22 L 28 27 L 29 22 Z" fill={Colors.primary} />
                </G>

                {/* 2. Speak (Red speech bubble) */}
                <G transform="translate(86, 34)">
                  <Rect x="0" y="0" width="45" height="22" rx="11" fill={Colors.danger} />
                  <Path d="M 12 22 L 8 27 L 18 22 Z" fill={Colors.danger} />
                </G>

                {/* 3. Practice (Amber pill) */}
                <Rect x="88" y="68" width="46" height="20" rx="10" fill={Colors.amber500} />

                {/* 4. Grow (Green pill) */}
                <Rect x="90" y="100" width="44" height="20" rx="10" fill={Colors.success} />
              </Svg>

              {/* Text overlays for chips */}
              <View style={[styles.bubbleChipOverlay, { top: 46, left: 10 }]}>
                <Text style={styles.bubbleChipText}>Listen</Text>
              </View>
              <View style={[styles.bubbleChipOverlay, { top: 38, right: 9 }]}>
                <Text style={styles.bubbleChipText}>Speak</Text>
              </View>
              <View style={[styles.bubbleChipOverlay, { top: 71, right: 7 }]}>
                <Text style={styles.bubbleChipText}>Practice</Text>
              </View>
              <View style={[styles.bubbleChipOverlay, { top: 103, right: 8 }]}>
                <Text style={styles.bubbleChipText}>Grow</Text>
              </View>
            </View>
          </View>

          {/* Hero Action Buttons: Enroll Now & Save for Later */}
          <View style={styles.heroButtonsRow}>
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleEnroll}
              style={styles.heroEnrollBtn}
            >
              <Ionicons name="school-outline" size={17} color={Colors.white} style={{ marginRight: 6 }} />
              <Text style={styles.heroEnrollText}>
                {isEnrolled ? 'Enrolled ✓' : 'Enroll Now'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleSaveToggle}
              style={[
                styles.heroSaveBtn,
                isSaved && styles.heroSaveBtnActive,
              ]}
            >
              <Ionicons
                name={isSaved ? 'bookmark' : 'bookmark-outline'}
                size={16}
                color={Colors.primary}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.heroSaveText}>
                {isSaved ? 'Saved' : 'Save for Later'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 7 Sub-Navigation Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsScroll}
          >
            {DETAIL_SUB_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <TouchableOpacity
                  key={tab.id}
                  activeOpacity={0.75}
                  onPress={() => setActiveTab(tab.id)}
                  style={[
                    styles.tabPill,
                    isActive && styles.activeTabPill,
                  ]}
                >
                  <Ionicons
                    name={tab.icon as any}
                    size={14}
                    color={isActive ? Colors.white : Colors.slate500}
                    style={{ marginRight: 5 }}
                  />
                  <Text
                    style={[
                      styles.tabPillText,
                      isActive && styles.activeTabPillText,
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Section 1: Course Overview */}
        <View style={styles.sectionCard}>
          <View style={styles.overviewRow}>
            {/* Left Graphic with "Hello!" bubble */}
            <View style={styles.overviewGraphicBox}>
              <Svg width="78" height="78" viewBox="0 0 80 80">
                <Rect x="0" y="0" width="80" height="80" rx="14" fill={Colors.sky100} />
                <Circle cx="70" cy="70" r="28" fill={Colors.amber300} opacity={0.6} />
                <Circle cx="12" cy="72" r="24" fill={Colors.indigo} />
                <Circle cx="12" cy="46" r="14" fill={Colors.amber200} />
                {/* Speech Bubble "Hello!" */}
                <Rect x="26" y="12" width="50" height="24" rx="8" fill={Colors.primary} />
                <Path d="M 32 36 L 28 42 L 38 36 Z" fill={Colors.primary} />
              </Svg>
              <View style={styles.helloBubbleOverlay}>
                <Text style={styles.helloText}>Hello!</Text>
              </View>
            </View>

            {/* Right Overview Details */}
            <View style={styles.overviewTextCol}>
              <View style={styles.sectionHeaderLine}>
                <Ionicons name="newspaper-outline" size={16} color={Colors.primary} style={{ marginRight: 6 }} />
                <Text style={styles.sectionTitleText}>Course Overview</Text>
              </View>
              <Text style={styles.overviewParagraph}>
                {COMPLETE_COURSE_DATA.overview}
              </Text>
            </View>
          </View>
        </View>

        {/* Section 2: What You'll Learn */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderLine}>
            <Ionicons name="disc-outline" size={18} color={Colors.success} style={{ marginRight: 6 }} />
            <Text style={styles.sectionTitleText}>What You'll Learn</Text>
          </View>

          <View style={styles.learnGrid}>
            <View style={styles.learnColumn}>
              {COMPLETE_COURSE_DATA.keyOutcomes.slice(0, 4).map((item, idx) => (
                <View key={idx} style={styles.learnItemRow}>
                  <Ionicons name="checkmark-circle" size={16} color={Colors.success} style={{ marginRight: 6 }} />
                  <Text style={styles.learnItemText}>{item}</Text>
                </View>
              ))}
            </View>

            <View style={styles.learnColumn}>
              {COMPLETE_COURSE_DATA.keyOutcomes.slice(4, 8).map((item, idx) => (
                <View key={idx} style={styles.learnItemRow}>
                  <Ionicons name="checkmark-circle" size={16} color={Colors.success} style={{ marginRight: 6 }} />
                  <Text style={styles.learnItemText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Section 3: Course Curriculum */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderBetween}>
            <View style={styles.sectionHeaderLine}>
              <View style={styles.curriculumHeaderIcon}>
                <Ionicons name="school" size={14} color={Colors.white} />
              </View>
              <Text style={styles.sectionTitleText}>Course Curriculum</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={toggleAllModules}>
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.curriculumAccordionList}>
            {COMPLETE_COURSE_DATA.curriculum.map((module) => {
              const isExpanded = expandedModules.includes(module.id);
              return (
                <View key={module.id} style={styles.accordionCard}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => toggleModule(module.id)}
                    style={styles.accordionHeader}
                  >
                    {/* Circle Number Badge */}
                    <View style={[styles.moduleNumberCircle, { backgroundColor: module.color }]}>
                      <Text style={styles.moduleNumberText}>{module.step}</Text>
                    </View>

                    {/* Module Title & Meta */}
                    <View style={styles.moduleInfoCol}>
                      <Text style={styles.moduleTitleText}>{module.title}</Text>
                      <Text style={styles.moduleMetaText}>
                        {module.lessons} • {module.duration}
                      </Text>
                    </View>

                    {/* Chevron Toggle */}
                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>

                  {/* Expanded Lesson Sub-Items */}
                  {isExpanded && (
                    <View style={styles.accordionBody}>
                      {module.lessonList.map((lesson, lIdx) => (
                        <View key={lIdx} style={styles.lessonSubItem}>
                          <Ionicons name="play-circle-outline" size={15} color={module.color} style={{ marginRight: 8 }} />
                          <Text style={styles.lessonSubText}>{lesson}</Text>
                          <Ionicons name="time-outline" size={13} color={Colors.slate400} style={{ marginLeft: 'auto', marginRight: 4 }} />
                          <Text style={styles.lessonDurationSub}>10 min</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Section 4: Projects & Practice */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderLine}>
            <View style={styles.projectIconBadge}>
              <Ionicons name="folder-open" size={13} color={Colors.white} />
            </View>
            <Text style={styles.sectionTitleText}>Projects & Practice</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.projectsScroll}
          >
            {COMPLETE_COURSE_DATA.projectsAndPractice.map((proj) => (
              <TouchableOpacity
                key={proj.id}
                activeOpacity={0.8}
                onPress={() => handleProjectPress(proj.title)}
                style={[styles.projectTile, { backgroundColor: proj.bgColor }]}
              >
                <View style={styles.projectIconCircle}>
                  <Ionicons name={proj.icon as any} size={24} color={proj.color} />
                </View>
                <Text style={styles.projectTileTitle}>{proj.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Section 5: Your Instructor */}
        <View style={styles.sectionCard}>
          <View style={styles.instructorHeaderRow}>
            {/* Instructor Avatar Graphic */}
            <View style={styles.instructorAvatarCircle}>
              <Svg width="54" height="54" viewBox="0 0 60 60">
                <Circle cx="30" cy="30" r="28" fill={Colors.slate200} />
                <Circle cx="30" cy="24" r="14" fill={Colors.amber300} />
                {/* Hair */}
                <Path d="M 14 26 C 14 8 46 8 46 26 C 44 18 36 14 30 16 C 24 14 16 18 14 26 Z" fill={Colors.slate800} />
                {/* Professional Suit */}
                <Circle cx="30" cy="52" r="18" fill={Colors.slate800} />
                <Path d="M 26 42 L 30 48 L 34 42 Z" fill={Colors.white} />
              </Svg>
            </View>

            {/* Instructor Information */}
            <View style={styles.instructorInfoCol}>
              <View style={styles.instructorTagRow}>
                <Ionicons name="people" size={13} color={Colors.primary} style={{ marginRight: 4 }} />
                <Text style={styles.instructorTagText}>Your Instructor</Text>
              </View>
              <Text style={styles.instructorNameText}>{COMPLETE_COURSE_DATA.instructor.name}</Text>
              <Text style={styles.instructorBioText}>{COMPLETE_COURSE_DATA.instructor.title}</Text>
              <Text style={styles.instructorQuoteText}>
                "{COMPLETE_COURSE_DATA.instructor.quote}"
              </Text>
            </View>

            {/* View Profile Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleInstructorProfile}
              style={styles.viewProfileBtn}
            >
              <Ionicons name="person-outline" size={13} color={Colors.primary} style={{ marginRight: 4 }} />
              <Text style={styles.viewProfileText}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section 6: Student Reviews */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderBetween}>
            <View style={styles.sectionHeaderLine}>
              <View style={styles.reviewStarBadge}>
                <Ionicons name="star" size={13} color={Colors.white} />
              </View>
              <Text style={styles.sectionTitleText}>Student Reviews</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={() => Alert.alert('All Reviews', 'Viewing all 2,356 student reviews...')}>
              <Text style={styles.viewAllText}>See All Reviews →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.reviewsContentRow}>
            {/* Rating Summary Box */}
            <View style={styles.ratingSummaryCard}>
              <View style={styles.starsRowCompact}>
                <Ionicons name="star" size={14} color={Colors.amber} />
                <Ionicons name="star" size={14} color={Colors.amber} />
              </View>
              <Text style={styles.ratingBigNumber}>{COMPLETE_COURSE_DATA.reviews.average}</Text>
              <Text style={styles.ratingTotalText}>({COMPLETE_COURSE_DATA.reviews.totalCount})</Text>
            </View>

            {/* Two Review Cards Horizontal */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.reviewsScroll}
            >
              {COMPLETE_COURSE_DATA.reviews.list.map((rev) => (
                <View key={rev.id} style={styles.reviewItemCard}>
                  <View style={styles.reviewUserRow}>
                    <View style={[styles.reviewAvatarBox, { backgroundColor: rev.avatarColor }]}>
                      <Ionicons name="person" size={14} color={Colors.primary} />
                    </View>
                    <View style={{ flex: 1, marginLeft: 6 }}>
                      <Text style={styles.reviewUserName}>{rev.name}</Text>
                      <View style={styles.starsRowCompact}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Ionicons key={s} name="star" size={10} color={Colors.amber} style={{ marginRight: 1 }} />
                        ))}
                      </View>
                    </View>
                  </View>
                  <Text style={styles.reviewCommentText} numberOfLines={3}>
                    {rev.comment}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Section 7: Frequently Asked Questions */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderBetween}>
            <View style={styles.sectionHeaderLine}>
              <Ionicons name="help-circle" size={18} color={Colors.primary} style={{ marginRight: 6 }} />
              <Text style={styles.sectionTitleText}>Frequently Asked Questions</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                setExpandedFaqs(
                  expandedFaqs.length === COMPLETE_COURSE_DATA.faqs.length
                    ? []
                    : COMPLETE_COURSE_DATA.faqs.map((f) => f.id)
                )
              }
            >
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.faqsList}>
            {COMPLETE_COURSE_DATA.faqs.map((faq) => {
              const isOpen = expandedFaqs.includes(faq.id);
              return (
                <View key={faq.id} style={styles.faqCard}>
                  <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => toggleFaq(faq.id)}
                    style={styles.faqHeaderRow}
                  >
                    <Text style={styles.faqQuestionText}>{faq.question}</Text>
                    <Ionicons
                      name={isOpen ? 'chevron-up' : 'chevron-down'}
                      size={16}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                  {isOpen && (
                    <View style={styles.faqAnswerBox}>
                      <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar: Enroll Now & Price */}
      <View style={[styles.bottomStickyBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={handleEnroll}
          style={styles.bottomEnrollBtn}
        >
          <Ionicons name="school-outline" size={18} color={Colors.white} style={{ marginRight: 6 }} />
          <Text style={styles.bottomEnrollText}>
            {isEnrolled ? 'Enrolled ✓' : 'Enroll Now'}
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomPriceGroup}>
          <Text style={styles.bottomOriginalPrice}>{COMPLETE_COURSE_DATA.originalPrice}</Text>
          <Text style={styles.bottomCurrentPrice}>{COMPLETE_COURSE_DATA.price}</Text>
          <View style={styles.bottomDiscountBadge}>
            <Text style={styles.bottomDiscountText}>{COMPLETE_COURSE_DATA.discount}</Text>
          </View>
        </View>
      </View>
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
    paddingTop: 8,
  },
  // Hero Card
  heroCard: {
    marginHorizontal: 12,
    marginTop: 6,
    borderRadius: 18,
    backgroundColor: Colors.primaryLighter,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.sky150,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  spokenEnglishBadge: {
    backgroundColor: Colors.purple,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  spokenEnglishBadgeText: {
    color: Colors.white,
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.bold,
  },
  heroContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroLeftDetails: {
    flex: 1,
    paddingRight: 6,
  },
  courseTitle: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
    color: Colors.slate900,
    lineHeight: 22,
  },
  courseTitleSub: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.slate900,
    marginBottom: 4,
  },
  courseSubtitle: {
    fontSize: Typography.size.xxs,
    color: Colors.slate600,
    lineHeight: 15,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  statTextCol: {
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 9,
    color: Colors.slate500,
  },
  statValue: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.bold,
    color: Colors.slate900,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsGroup: {
    flexDirection: 'row',
    marginRight: 4,
  },
  ratingNumber: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.slate900,
    marginRight: 4,
  },
  reviewsCount: {
    fontSize: Typography.size.xxs,
    color: Colors.slate500,
  },
  mascotArtBox: {
    width: 125,
    height: 150,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleChipOverlay: {
    position: 'absolute',
    zIndex: 10,
  },
  bubbleChipText: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: Typography.weight.bold,
  },
  heroButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  heroEnrollBtn: {
    flex: 1.35,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  heroEnrollText: {
    color: Colors.white,
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
  },
  heroSaveBtn: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  heroSaveBtnActive: {
    backgroundColor: Colors.primaryLight,
  },
  heroSaveText: {
    color: Colors.primary,
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
  },
  // Sub-Navigation Tabs
  tabsContainer: {
    marginTop: 10,
    marginBottom: 4,
  },
  tabsScroll: {
    paddingHorizontal: 12,
    gap: 8,
  },
  tabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeTabPill: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabPillText: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.medium,
    color: Colors.slate600,
  },
  activeTabPillText: {
    color: Colors.white,
    fontWeight: Typography.weight.bold,
  },
  // Generic Section Card
  sectionCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.divider,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionHeaderLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeaderBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitleText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.slate900,
  },
  viewAllText: {
    fontSize: Typography.size.xxs,
    color: Colors.primary,
    fontWeight: Typography.weight.bold,
  },
  // Section 1: Overview
  overviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  overviewGraphicBox: {
    width: 78,
    height: 78,
    position: 'relative',
  },
  helloBubbleOverlay: {
    position: 'absolute',
    top: 16,
    left: 36,
  },
  helloText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: Typography.weight.bold,
  },
  overviewTextCol: {
    flex: 1,
  },
  overviewParagraph: {
    fontSize: Typography.size.xxs,
    color: Colors.slate600,
    lineHeight: 16,
    marginTop: 4,
  },
  // Section 2: What You'll Learn
  learnGrid: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 12,
  },
  learnColumn: {
    flex: 1,
    gap: 8,
  },
  learnItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  learnItemText: {
    fontSize: Typography.size.xxs,
    color: Colors.slate700,
    flex: 1,
    lineHeight: 14,
  },
  // Section 3: Curriculum
  curriculumHeaderIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  curriculumAccordionList: {
    gap: 8,
  },
  accordionCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.slate200,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  moduleNumberCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  moduleNumberText: {
    color: Colors.white,
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.bold,
  },
  moduleInfoCol: {
    flex: 1,
  },
  moduleTitleText: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.bold,
    color: Colors.slate900,
  },
  moduleMetaText: {
    fontSize: 10,
    color: Colors.slate500,
    marginTop: 2,
  },
  accordionBody: {
    paddingHorizontal: 12,
    paddingBottom: 10,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    backgroundColor: Colors.white,
    gap: 6,
  },
  lessonSubItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
  },
  lessonSubText: {
    fontSize: Typography.size.xxs,
    color: Colors.slate700,
    flex: 1,
  },
  lessonDurationSub: {
    fontSize: 10,
    color: Colors.slate400,
  },
  // Section 4: Projects & Practice
  projectIconBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.orange500,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  projectsScroll: {
    marginTop: 10,
    gap: 10,
    paddingRight: 6,
  },
  projectTile: {
    width: 96,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  projectIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  projectTileTitle: {
    fontSize: 10,
    fontWeight: Typography.weight.bold,
    color: Colors.slate800,
    textAlign: 'center',
    lineHeight: 13,
  },
  // Section 5: Your Instructor
  instructorHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorAvatarCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.sky150,
    marginRight: 10,
  },
  instructorInfoCol: {
    flex: 1,
  },
  instructorTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorTagText: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: Typography.weight.bold,
  },
  instructorNameText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.slate900,
    marginTop: 1,
  },
  instructorBioText: {
    fontSize: 9,
    color: Colors.slate500,
    marginTop: 1,
  },
  instructorQuoteText: {
    fontSize: 9,
    fontStyle: 'italic',
    color: Colors.slate600,
    marginTop: 2,
    lineHeight: 12,
  },
  viewProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'center',
    marginLeft: 6,
  },
  viewProfileText: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: Typography.weight.bold,
  },
  // Section 6: Student Reviews
  reviewStarBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.amber500,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  reviewsContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingSummaryCard: {
    width: 82,
    backgroundColor: Colors.slate50,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  starsRowCompact: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingBigNumber: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
    color: Colors.slate900,
    marginTop: 2,
  },
  ratingTotalText: {
    fontSize: 9,
    color: Colors.slate500,
  },
  reviewsScroll: {
    gap: 8,
  },
  reviewItemCard: {
    width: 140,
    backgroundColor: Colors.slate50,
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reviewUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewAvatarBox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewUserName: {
    fontSize: 10,
    fontWeight: Typography.weight.bold,
    color: Colors.slate900,
  },
  reviewCommentText: {
    fontSize: 9,
    color: Colors.slate600,
    lineHeight: 12,
  },
  // Section 7: FAQs
  faqsList: {
    gap: 6,
    marginTop: 6,
  },
  faqCard: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.slate200,
    overflow: 'hidden',
  },
  faqHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 9,
    paddingHorizontal: 10,
  },
  faqQuestionText: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.medium,
    color: Colors.slate800,
    flex: 1,
    paddingRight: 6,
  },
  faqAnswerBox: {
    paddingHorizontal: 10,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    backgroundColor: Colors.white,
  },
  faqAnswerText: {
    fontSize: Typography.size.xxs,
    color: Colors.slate600,
    lineHeight: 15,
    marginTop: 4,
  },
  // Sticky Bottom Bar
  bottomStickyBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 10,
  },
  bottomEnrollBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    height: 42,
    borderRadius: 21,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  bottomEnrollText: {
    color: Colors.white,
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
  },
  bottomPriceGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bottomOriginalPrice: {
    fontSize: Typography.size.xxs,
    color: Colors.slate400,
    textDecorationLine: 'line-through',
  },
  bottomCurrentPrice: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.primaryDarker,
  },
  bottomDiscountBadge: {
    backgroundColor: Colors.successLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: Colors.success,
  },
  bottomDiscountText: {
    color: Colors.success,
    fontSize: 9,
    fontWeight: Typography.weight.bold,
  },
});

export default CourseDetailScreen;
