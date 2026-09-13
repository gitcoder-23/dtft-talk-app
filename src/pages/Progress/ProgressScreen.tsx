import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/color';
import { Typography } from '../../constants/fonts';
import { CURRENT_STUDENT } from '../../constants/mockData';
import { AppHeader } from '../../common/AppHeader';
import { CircularProgress } from '../../common/CircularProgress';

const { width } = Dimensions.get('window');

export const ProgressScreen: React.FC = () => {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <SafeAreaView style={styles.safeArea}>
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
                <Ionicons name="flame" size={28} color="#FF9800" />
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
                    color={idx < 5 ? '#FFFFFF' : '#FF9800'}
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
              <Ionicons name="mic-outline" size={18} color="#0084FF" />
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
              <Ionicons name="time-outline" size={18} color="#00C853" />
            </View>
            <Text style={styles.bigMetricNumber}>14.5</Text>
            <Text style={styles.metricUnit}>Hours Recorded</Text>
            <Text style={styles.metricNote}>Daily goal: 15 mins</Text>
          </View>

          {/* Vocabulary Learned */}
          <View style={styles.metricCard}>
            <View style={styles.metricTop}>
              <Text style={styles.metricLabel}>Vocabulary</Text>
              <Ionicons name="book-outline" size={18} color="#FFB300" />
            </View>
            <Text style={styles.bigMetricNumber}>480</Text>
            <Text style={styles.metricUnit}>Words Mastered</Text>
            <Text style={styles.metricNote}>Level: Beginner 2</Text>
          </View>

          {/* Lessons Completed */}
          <View style={styles.metricCard}>
            <View style={styles.metricTop}>
              <Text style={styles.metricLabel}>Lessons Done</Text>
              <Ionicons name="checkmark-done-outline" size={18} color="#8E24AA" />
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
              <View style={[styles.badgeCircle, { backgroundColor: '#E8F4FD' }]}>
                <Ionicons name="rocket-outline" size={24} color="#0084FF" />
              </View>
              <Text style={styles.badgeTitle}>Early Starter</Text>
            </View>

            <View style={styles.badgeItem}>
              <View style={[styles.badgeCircle, { backgroundColor: '#FEF9E7' }]}>
                <Ionicons name="flame-outline" size={24} color="#FF9800" />
              </View>
              <Text style={styles.badgeTitle}>7-Day Streak</Text>
            </View>

            <View style={styles.badgeItem}>
              <View style={[styles.badgeCircle, { backgroundColor: '#EAF7EE' }]}>
                <Ionicons name="mic-outline" size={24} color="#00C853" />
              </View>
              <Text style={styles.badgeTitle}>Fluent Voice</Text>
            </View>

            <View style={styles.badgeItem}>
              <View style={[styles.badgeCircle, { backgroundColor: '#F4EFFB' }]}>
                <Ionicons name="trophy-outline" size={24} color="#8E24AA" />
              </View>
              <Text style={styles.badgeTitle}>Top 10%</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    color: '#0F172A',
  },
  screenSubtitle: {
    fontSize: Typography.size.xs,
    color: '#64748B',
    marginTop: 2,
  },
  streakCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEF2F6',
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
    backgroundColor: '#FFF8E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakNumberText: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
    color: '#0F172A',
  },
  streakSubText: {
    fontSize: Typography.size.xxs,
    color: '#64748B',
    marginTop: 2,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
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
    backgroundColor: '#00C853',
    borderColor: '#00C853',
  },
  dayCircleActive: {
    backgroundColor: '#FFF8E1',
    borderColor: '#FF9800',
  },
  dayLabel: {
    fontSize: Typography.size.xxs,
    color: '#64748B',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    width: (width - 44) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EEF2F6',
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
    color: '#64748B',
  },
  circularWrapper: {
    alignItems: 'center',
    marginVertical: 4,
  },
  bigMetricNumber: {
    fontSize: 26,
    fontWeight: Typography.weight.extraBold,
    color: '#0F172A',
  },
  metricUnit: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.semiBold,
    color: '#334155',
    marginTop: 2,
  },
  metricNote: {
    fontSize: 10,
    color: '#0084FF',
    marginTop: 6,
    fontWeight: Typography.weight.medium,
  },
  achievementsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEF2F6',
  },
  sectionTitle: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
    color: '#0F172A',
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
    color: '#334155',
  },
});

export default ProgressScreen;
