import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../../constants/fonts';
import { Colors } from '../../constants/color';
import { CURRENT_STUDENT } from '../../constants/mockData';
import { AppHeader } from '../../common/AppHeader';
import { CircularProgress } from '../../common/CircularProgress';

const { width } = Dimensions.get('window');

export const ProgressScreen: React.FC = () => {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <View style={styles.safeArea}>
      <AppHeader showBack={false} hasUnreadNotifications={true} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Title */}
        <View style={styles.titleSection}>
          <Text style={styles.screenHeading}>Learning Analytics</Text>
          <Text style={styles.screenSubtitle}>
            Track your spoken English fluency and daily consistency.
          </Text>
        </View>

        {/* 7-Day Streak Card */}
        <View style={styles.streakCard}>
          <View style={styles.streakTopRow}>
            <View style={styles.streakLeft}>
              <View style={styles.flameCircle}>
                <Ionicons name="flame" size={28} color={Colors.orange500} />
              </View>
              <View>
                <Text style={styles.streakNumberText}>
                  {CURRENT_STUDENT.streakDays} Day Streak!
                </Text>
                <Text style={styles.streakSubText}>
                  You're on fire! 7 days of daily practice.
                </Text>
              </View>
            </View>
          </View>

          {/* Weekday dots */}
          <View style={styles.weekRow}>
            {weekDays.map((day, idx) => (
              <View key={day} style={styles.dayCol}>
                <View
                  style={[
                    styles.dayCircle,
                    idx < 5 ? styles.dayCircleCompleted : styles.dayCircleActive,
                  ]}
                >
                  <Ionicons
                    name="checkmark"
                    size={14}
                    color={idx < 5 ? Colors.white : Colors.orange500}
                  />
                </View>
                <Text style={styles.dayLabel}>{day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Metrics Grid */}
        <View style={styles.metricsGrid}>
          {/* Speaking Accuracy */}
          <View style={styles.metricCard}>
            <View style={styles.metricTop}>
              <Text style={styles.metricLabel}>Speaking Accuracy</Text>
              <Ionicons name="mic-outline" size={18} color={Colors.primary} />
            </View>
            <View style={styles.circularWrapper}>
              <CircularProgress percentage={68} size={64} strokeWidth={6} />
            </View>
            <Text style={styles.metricNote}>+4% from last week</Text>
          </View>

          {/* Practice Hours */}
          <View style={styles.metricCard}>
            <View style={styles.metricTop}>
              <Text style={styles.metricLabel}>Practice Hours</Text>
              <Ionicons name="time-outline" size={18} color={Colors.success} />
            </View>
            <Text style={styles.bigMetricNumber}>14.5</Text>
            <Text style={styles.metricUnit}>Hours Recorded</Text>
            <Text style={styles.metricNote}>Daily goal: 15 mins</Text>
          </View>

          {/* Vocabulary Learned */}
          <View style={styles.metricCard}>
            <View style={styles.metricTop}>
              <Text style={styles.metricLabel}>Vocabulary</Text>
              <Ionicons name="book-outline" size={18} color={Colors.warning} />
            </View>
            <Text style={styles.bigMetricNumber}>480</Text>
            <Text style={styles.metricUnit}>Words Mastered</Text>
            <Text style={styles.metricNote}>Level: Beginner 2</Text>
          </View>

          {/* Lessons Completed */}
          <View style={styles.metricCard}>
            <View style={styles.metricTop}>
              <Text style={styles.metricLabel}>Lessons Done</Text>
              <Ionicons name="checkmark-done-outline" size={18} color={Colors.purple} />
            </View>
            <Text style={styles.bigMetricNumber}>24</Text>
            <Text style={styles.metricUnit}>Out of 45 Lessons</Text>
            <Text style={styles.metricNote}>53% syllabus complete</Text>
          </View>
        </View>

        {/* Recent Achievements */}
        <View style={styles.achievementsCard}>
          <Text style={styles.sectionTitle}>Earned Badges</Text>
          <View style={styles.badgesRow}>
            <View style={styles.badgeItem}>
              <View style={[styles.badgeCircle, { backgroundColor: Colors.primaryLight }]}>
                <Ionicons name="rocket-outline" size={24} color={Colors.primary} />
              </View>
              <Text style={styles.badgeTitle}>Early Starter</Text>
            </View>

            <View style={styles.badgeItem}>
              <View style={[styles.badgeCircle, { backgroundColor: Colors.warningLight }]}>
                <Ionicons name="flame-outline" size={24} color={Colors.orange500} />
              </View>
              <Text style={styles.badgeTitle}>7-Day Streak</Text>
            </View>

            <View style={styles.badgeItem}>
              <View style={[styles.badgeCircle, { backgroundColor: Colors.successLight }]}>
                <Ionicons name="mic-outline" size={24} color={Colors.success} />
              </View>
              <Text style={styles.badgeTitle}>Fluent Voice</Text>
            </View>

            <View style={styles.badgeItem}>
              <View style={[styles.badgeCircle, { backgroundColor: Colors.purpleLight }]}>
                <Ionicons name="trophy-outline" size={24} color={Colors.purple} />
              </View>
              <Text style={styles.badgeTitle}>Top 10%</Text>
            </View>
          </View>
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 30,
  },
  titleSection: {
    marginBottom: 16,
  },
  screenHeading: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.extraBold,
    color: Colors.textPrimary,
  },
  screenSubtitle: {
    fontSize: Typography.size.xs,
    color: Colors.slate500,
    marginTop: 2,
  },
  streakCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.divider,
    marginBottom: 16,
  },
  streakTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  streakLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flameCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.amber50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakNumberText: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  streakSubText: {
    fontSize: Typography.size.xxs,
    color: Colors.slate500,
    marginTop: 2,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.background,
  },
  dayCol: {
    alignItems: 'center',
  },
  dayCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    borderWidth: 1,
  },
  dayCircleCompleted: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  dayCircleActive: {
    backgroundColor: Colors.amber50,
    borderColor: Colors.orange500,
  },
  dayLabel: {
    fontSize: Typography.size.xxs,
    color: Colors.slate500,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    width: (width - 44) / 2,
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  metricTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.bold,
    color: Colors.slate500,
  },
  circularWrapper: {
    alignItems: 'center',
    marginVertical: 4,
  },
  bigMetricNumber: {
    fontSize: 26,
    fontWeight: Typography.weight.extraBold,
    color: Colors.textPrimary,
  },
  metricUnit: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.semiBold,
    color: Colors.slate700,
    marginTop: 2,
  },
  metricNote: {
    fontSize: 10,
    color: Colors.primary,
    marginTop: 6,
    fontWeight: Typography.weight.medium,
  },
  achievementsCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  sectionTitle: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  badgeItem: {
    alignItems: 'center',
  },
  badgeCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  badgeTitle: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.semiBold,
    color: Colors.slate700,
  },
});

export default ProgressScreen;
