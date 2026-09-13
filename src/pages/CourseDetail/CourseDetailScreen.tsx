import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  Share,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
import { Colors } from '../../constants/color';
import { Typography } from '../../constants/fonts';
import { AssetImages } from '../../constants/assetImages';
import { COMPLETE_COURSE_DATA } from '../../constants/mockData';
import { AppHeader } from '../../common/AppHeader';

const DETAIL_SUB_TABS = [
  { id: 'overview', label: 'Overview', icon: 'document-text' },
  { id: 'outcomes', label: "What You'll Learn", icon: 'disc' },
  { id: 'curriculum', label: 'Curriculum', icon: 'list' },
  { id: 'reviews', label: 'Reviews', icon: 'star' },
  { id: 'faq', label: 'FAQ', icon: 'help-circle' },
] as const;

export const CourseDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEnrolled, setIsEnrolled] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Join me on DTFT Talk to master Spoken English! Download the app: https://dtfttalk.com/course',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleEnroll = () => {
    Alert.alert(
      'Enroll in Spoken English Course',
      'Special discounted fee: ₹2,999 (Original ₹4,999 - 40% OFF)\n\nIncludes 12 Weeks of live mentoring, audio practice, downloadable PDF notes, and certificate.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Proceed to Pay ₹2,999',
          onPress: () => {
            setIsEnrolled(true);
            Alert.alert('Congratulations! 🎉', 'You have successfully enrolled in Spoken English (Complete Course)!');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
        {/* Course Hero Banner */}
        <View style={styles.heroCard}>
          {/* Top Row: Badge and Share */}
          <View style={styles.heroTopRow}>
            <View style={styles.beginnerBadge}>
              <Text style={styles.beginnerBadgeText}>{COMPLETE_COURSE_DATA.tag}</Text>
            </View>
            <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
              <Ionicons name="share-social-outline" size={18} color="#0084FF" />
            </TouchableOpacity>
          </View>

          {/* Title & Subtitle */}
          <View style={styles.heroContentRow}>
            <View style={styles.heroLeftDetails}>
              <Text style={styles.courseTitle}>{COMPLETE_COURSE_DATA.title}</Text>
              <Text style={styles.courseSub}>{COMPLETE_COURSE_DATA.subtitle}</Text>

              {/* Stats Row */}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Ionicons name="time-outline" size={14} color="#0084FF" />
                  <View style={styles.statTextCol}>
                    <Text style={styles.statLabel}>Duration</Text>
                    <Text style={styles.statValue}>{COMPLETE_COURSE_DATA.duration}</Text>
                  </View>
                </View>

                <View style={styles.statItem}>
                  <Ionicons name="bar-chart-outline" size={14} color="#00C853" />
                  <View style={styles.statTextCol}>
                    <Text style={styles.statLabel}>Level</Text>
                    <Text style={styles.statValue}>{COMPLETE_COURSE_DATA.level}</Text>
                  </View>
                </View>

                <View style={styles.statItem}>
                  <Ionicons name="people-outline" size={14} color="#FF9800" />
                  <View style={styles.statTextCol}>
                    <Text style={styles.statLabel}>Students</Text>
                    <Text style={styles.statValue}>{COMPLETE_COURSE_DATA.students}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Right Artwork: Mascot with "Speak English" Book & Bubbles */}
            <View style={styles.mascotArtBox}>
              <Svg width="130" height="150" viewBox="0 0 140 160">
                {/* Big Ben Outline in background */}
                <Path d="M 108 160 L 108 85 L 114 75 L 120 85 L 120 160 Z" fill="#BAE6FD" opacity={0.6} />

                {/* Boy Mascot in Blue Hoodie */}
                <Circle cx="70" cy="95" r="32" fill="#0084FF" />
                <Circle cx="70" cy="65" r="25" fill="#FCD34D" />
                <Path d="M 47 62 C 47 38 93 38 93 62 C 90 54 80 50 70 52 C 60 50 50 54 47 62 Z" fill="#1E293B" />
                <Circle cx="63" cy="63" r="3" fill="#1E293B" />
                <Circle cx="77" cy="63" r="3" fill="#1E293B" />
                <Path d="M 65 72 Q 70 78 75 72" stroke="#E11D48" strokeWidth="2" fill="none" strokeLinecap="round" />

                {/* Book: "Speak English" */}
                <Rect x="54" y="102" width="34" height="32" rx="4" fill="#005CE6" stroke="#FFFFFF" strokeWidth="1.5" />
                <Rect x="56" y="104" width="30" height="3" fill="#FFC107" />

                {/* Floating Chips: Listen, Speak, Practice, Grow */}
                <Circle cx="20" cy="60" r="14" fill="#0084FF" />
                <Circle cx="118" cy="48" r="14" fill="#FF3B30" />
                <Circle cx="122" cy="80" r="14" fill="#FFB300" />
                <Circle cx="120" cy="115" r="14" fill="#00C853" />
              </Svg>

              {/* Text labels for bubbles */}
              <View style={[styles.bubbleTag, { top: 52, left: 10 }]}>
                <Text style={styles.bubbleTagText}>Listen</Text>
              </View>
              <View style={[styles.bubbleTag, { top: 40, right: 6 }]}>
                <Text style={styles.bubbleTagText}>Speak</Text>
              </View>
              <View style={[styles.bubbleTag, { top: 72, right: 2 }]}>
                <Text style={styles.bubbleTagText}>Practice</Text>
              </View>
              <View style={[styles.bubbleTag, { top: 107, right: 4 }]}>
                <Text style={styles.bubbleTagText}>Grow</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Sub-Navigation Tabs */}
        <View style={styles.tabsRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
            {DETAIL_SUB_TABS.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                activeOpacity={0.8}
                onPress={() => setActiveTab(tab.id)}
                style={[
                  styles.tabPill,
                  activeTab === tab.id && styles.activeTabPill,
                ]}
              >
                <Ionicons
                  name={tab.icon as any}
                  size={15}
                  color={activeTab === tab.id ? '#FFFFFF' : '#64748B'}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.tabPillText,
                    activeTab === tab.id && styles.activeTabPillText,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Section: Course Overview */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="book" size={20} color="#0084FF" />
            <Text style={styles.sectionTitleText}>Course Overview</Text>
          </View>

          <View style={styles.overviewRow}>
            <Text style={styles.overviewParagraph}>
              {COMPLETE_COURSE_DATA.overview}
            </Text>

            {/* Sticky Quote Note */}
            <View style={styles.stickyNote}>
              <Ionicons name="sparkles" size={14} color="#FFB300" style={styles.sparkleIcon} />
              <Text style={styles.stickyNoteText}>
                “Better English{'\n'}Brighter Future”
              </Text>
            </View>
          </View>
        </View>

        {/* Section: Key Learning Outcomes */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="disc" size={20} color="#00C853" />
            <Text style={styles.sectionTitleText}>Key Learning Outcomes</Text>
          </View>

          <View style={styles.outcomesGrid}>
            {COMPLETE_COURSE_DATA.keyOutcomes.map((outcome, index) => (
              <View key={index} style={styles.outcomeItem}>
                <Ionicons name="checkmark-circle" size={18} color="#00C853" style={styles.checkIcon} />
                <Text style={styles.outcomeText}>{outcome}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Section: Course Curriculum */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleRowSpace}>
            <View style={styles.sectionTitleLeft}>
              <Ionicons name="school" size={20} color="#8E24AA" />
              <Text style={styles.sectionTitleText}>Course Curriculum</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.curriculumList}>
            {COMPLETE_COURSE_DATA.curriculum.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.curriculumRow}
                activeOpacity={0.7}
                onPress={() => Alert.alert(item.title, `Modules in ${item.title}:\n• 8 Video Lessons\n• Interactive Speaking Drill\n• Vocabulary Flashcards\n• Quiz`)}
              >
                <View style={[styles.stepCircle, { backgroundColor: item.color }]}>
                  <Text style={styles.stepCircleText}>{item.step}</Text>
                </View>

                <View style={styles.curriculumDetails}>
                  <Text style={styles.curriculumTitle}>{item.title}</Text>
                  <Text style={styles.curriculumMeta}>
                    {item.lessons} • {item.duration}
                  </Text>
                </View>

                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Section: Course Highlights */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="star" size={20} color="#FFB300" />
            <Text style={styles.sectionTitleText}>Course Highlights</Text>
          </View>

          <View style={styles.highlightsGrid}>
            {COMPLETE_COURSE_DATA.highlights.map((highlight) => (
              <View
                key={highlight.id}
                style={[styles.highlightBox, { backgroundColor: highlight.bgColor }]}
              >
                <View style={[styles.highlightIconCircle, { backgroundColor: '#FFFFFF' }]}>
                  <Ionicons name={highlight.icon as any} size={22} color={highlight.color} />
                </View>
                <Text style={styles.highlightTitle}>{highlight.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Section: Instructor Spotlight (Ananya Ma'am) */}
        <View style={styles.instructorCard}>
          <Image
            source={AssetImages.instructorAvatar}
            style={styles.instructorAvatar}
          />
          <View style={styles.instructorInfo}>
            <Text style={styles.instructorLearnFrom}>Learn from</Text>
            <Text style={styles.instructorName}>{COMPLETE_COURSE_DATA.instructor.name}</Text>
            <Text style={styles.instructorRole}>{COMPLETE_COURSE_DATA.instructor.title}</Text>
            <Text style={styles.instructorQuote}>{COMPLETE_COURSE_DATA.instructor.quote}</Text>
          </View>
          <TouchableOpacity
            style={styles.viewProfileBtn}
            onPress={() => Alert.alert("Ananya Ma'am", 'Senior Master Trainer at DTFT Talk with 8+ years of ESL & accent neutralisation training.')}
          >
            <Text style={styles.viewProfileText}>View Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Section: Student Reviews */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleRowSpace}>
            <View style={styles.sectionTitleLeft}>
              <Ionicons name="star" size={20} color="#FFB300" />
              <Text style={styles.sectionTitleText}>Student Reviews</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>See All Reviews →</Text>
            </TouchableOpacity>
          </View>

          {/* Rating Summary */}
          <View style={styles.ratingSummaryRow}>
            <View style={styles.bigRatingBox}>
              <Ionicons name="star" size={22} color="#FFB300" />
              <Text style={styles.bigRatingNumber}>{COMPLETE_COURSE_DATA.reviews.average}</Text>
            </View>
            <Text style={styles.ratingCountText}>({COMPLETE_COURSE_DATA.reviews.totalCount})</Text>
          </View>

          {/* Testimonial Cards */}
          <View style={styles.testimonialsCol}>
            {COMPLETE_COURSE_DATA.reviews.list.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={[styles.reviewAvatar, { backgroundColor: review.avatarColor }]}>
                    <Text style={styles.reviewAvatarLetter}>{review.name[0]}</Text>
                  </View>
                  <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerName}>{review.name}</Text>
                    <View style={styles.starsRow}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Ionicons key={s} name="star" size={13} color="#FFB300" />
                      ))}
                    </View>
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Enrollment Bar */}
      <View style={styles.stickyBottomBar}>
        <TouchableOpacity
          style={styles.enrollCtaBtn}
          activeOpacity={0.85}
          onPress={handleEnroll}
        >
          <Ionicons name="school" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.enrollCtaText}>
            {isEnrolled ? 'Enrolled ✓' : 'Enroll Now'}
          </Text>
        </TouchableOpacity>

        <View style={styles.pricingWrapper}>
          <Text style={styles.priceMain}>{COMPLETE_COURSE_DATA.price}</Text>
          <Text style={styles.priceStrike}>{COMPLETE_COURSE_DATA.originalPrice}</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{COMPLETE_COURSE_DATA.discount}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
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
    paddingBottom: 90,
  },
  heroCard: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 22,
    backgroundColor: '#E1F3FD',
    padding: 16,
    borderWidth: 1,
    borderColor: '#C7E8FD',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  beginnerBadge: {
    backgroundColor: '#8E24AA',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  beginnerBadgeText: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.bold,
    color: '#FFFFFF',
  },
  shareBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLeftDetails: {
    flex: 1.2,
  },
  courseTitle: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.extraBold,
    color: '#0F172A',
    lineHeight: 22,
    marginBottom: 4,
  },
  courseSub: {
    fontSize: Typography.size.xxs,
    color: '#475569',
    lineHeight: 14,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statTextCol: {},
  statLabel: {
    fontSize: 9,
    color: '#64748B',
  },
  statValue: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.bold,
    color: '#0F172A',
  },
  mascotArtBox: {
    width: 120,
    height: 140,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleTag: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleTagText: {
    fontSize: 8,
    fontWeight: Typography.weight.bold,
    color: '#FFFFFF',
  },
  tabsRow: {
    marginTop: 14,
  },
  tabsScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeTabPill: {
    backgroundColor: '#0084FF',
    borderColor: '#0084FF',
  },
  tabPillText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semiBold,
    color: '#64748B',
  },
  activeTabPillText: {
    color: '#FFFFFF',
    fontWeight: Typography.weight.bold,
  },
  sectionCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEF2F6',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  sectionTitleRowSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  overviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  overviewParagraph: {
    flex: 1,
    fontSize: Typography.size.xs,
    color: '#475569',
    lineHeight: 18,
    marginRight: 10,
  },
  stickyNote: {
    width: 100,
    backgroundColor: '#FEF9E7',
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
    position: 'relative',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sparkleIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  stickyNoteText: {
    fontSize: 9,
    fontWeight: Typography.weight.bold,
    color: '#B45309',
    textAlign: 'center',
    lineHeight: 13,
  },
  outcomesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  outcomeItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkIcon: {
    marginRight: 6,
    marginTop: 2,
  },
  outcomeText: {
    flex: 1,
    fontSize: Typography.size.xxs,
    color: '#334155',
    lineHeight: 15,
  },
  curriculumList: {
    gap: 10,
  },
  curriculumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepCircleText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: '#FFFFFF',
  },
  curriculumDetails: {
    flex: 1,
  },
  curriculumTitle: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semiBold,
    color: '#0F172A',
  },
  curriculumMeta: {
    fontSize: Typography.size.xxs,
    color: '#64748B',
    marginTop: 2,
  },
  highlightsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  highlightBox: {
    flex: 1,
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
  },
  highlightIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  highlightTitle: {
    fontSize: 9,
    fontWeight: Typography.weight.bold,
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 12,
  },
  instructorCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEF2F6',
  },
  instructorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  instructorInfo: {
    flex: 1,
  },
  instructorLearnFrom: {
    fontSize: 9,
    color: '#64748B',
  },
  instructorName: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: '#0F172A',
  },
  instructorRole: {
    fontSize: Typography.size.xxs,
    color: '#0084FF',
    fontWeight: Typography.weight.medium,
    marginBottom: 2,
  },
  instructorQuote: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#64748B',
    lineHeight: 13,
  },
  viewProfileBtn: {
    borderWidth: 1.5,
    borderColor: '#0084FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  viewProfileText: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.bold,
    color: '#0084FF',
  },
  ratingSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  bigRatingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bigRatingNumber: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.extraBold,
    color: '#0F172A',
  },
  ratingCountText: {
    fontSize: Typography.size.xs,
    color: '#64748B',
  },
  testimonialsCol: {
    gap: 10,
  },
  reviewCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  reviewAvatarLetter: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: '#0084FF',
  },
  reviewerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewerName: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: '#0F172A',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewComment: {
    fontSize: Typography.size.xxs,
    color: '#475569',
    lineHeight: 15,
  },
  stickyBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0084FF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  enrollCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  enrollCtaText: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
    color: '#FFFFFF',
  },
  pricingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceMain: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.extraBold,
    color: '#FFFFFF',
  },
  priceStrike: {
    fontSize: Typography.size.xs,
    color: 'rgba(255,255,255,0.7)',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#00C853',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discountText: {
    fontSize: 10,
    fontWeight: Typography.weight.bold,
    color: '#FFFFFF',
  },
});

export default CourseDetailScreen;
