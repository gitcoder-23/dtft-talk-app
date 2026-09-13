import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../appNavigation/navigationTypes';
import { Colors } from '../../constants/color';
import { Typography } from '../../constants/fonts';
import { AssetImages } from '../../constants/assetImages';
import { CURRENT_STUDENT } from '../../constants/mockData';
import { AppHeader } from '../../common/AppHeader';

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out of DTFT Talk?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => navigation.navigate('Welcome'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader showBack={false} hasUnreadNotifications={false} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={AssetImages.studentAvatar}
            style={styles.avatarImage}
          />
          <View style={styles.profileDetails}>
            <View style={styles.nameBadgeRow}>
              <Text style={styles.studentName}>{CURRENT_STUDENT.name}</Text>
              <View style={styles.levelPill}>
                <Text style={styles.levelPillText}>Beginner L2</Text>
              </View>
            </View>
            <Text style={styles.studentIdText}>ID: {CURRENT_STUDENT.id}</Text>
            <Text style={styles.emailText}>rahul.sharma@dtfttalk.com</Text>
          </View>
        </View>

        {/* Mini Stats Bar */}
        <View style={styles.statsBar}>
          <View style={styles.statCol}>
            <Text style={styles.statNum}>1</Text>
            <Text style={styles.statLabel}>Course Enrolled</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCol}>
            <Text style={styles.statNum}>24</Text>
            <Text style={styles.statLabel}>Notes Saved</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCol}>
            <Text style={styles.statNum}>4</Text>
            <Text style={styles.statLabel}>Certificates</Text>
          </View>
        </View>

        {/* Menu Options Group 1 */}
        <View style={styles.menuGroup}>
          <Text style={styles.groupHeading}>Learning Hub</Text>

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('CourseDetail')}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#E8F4FD' }]}>
              <Ionicons name="book-outline" size={20} color="#0084FF" />
            </View>
            <Text style={styles.menuItemText}>My Enrolled Course</Text>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('MainTabs', { screen: 'NotesTab' })}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#EAF7EE' }]}>
              <Ionicons name="download-outline" size={20} color="#00C853" />
            </View>
            <Text style={styles.menuItemText}>Downloaded Study Notes</Text>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => Alert.alert('Certificates', 'Your Spoken English certificate will be unlocked upon 100% course completion!')}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#FEF9E7' }]}>
              <Ionicons name="ribbon-outline" size={20} color="#FFB300" />
            </View>
            <Text style={styles.menuItemText}>Certificates & Achievements</Text>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Menu Options Group 2: Settings */}
        <View style={styles.menuGroup}>
          <Text style={styles.groupHeading}>Preferences & App</Text>

          <View style={styles.menuItem}>
            <View style={[styles.menuIconCircle, { backgroundColor: '#F4EFFB' }]}>
              <Ionicons name="moon-outline" size={20} color="#8E24AA" />
            </View>
            <Text style={styles.menuItemText}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: '#E2E8F0', true: '#0084FF' }}
            />
          </View>

          <View style={styles.menuItem}>
            <View style={[styles.menuIconCircle, { backgroundColor: '#E8F4FD' }]}>
              <Ionicons name="notifications-outline" size={20} color="#0084FF" />
            </View>
            <Text style={styles.menuItemText}>Practice Reminders</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E2E8F0', true: '#0084FF' }}
            />
          </View>

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => Alert.alert('DTFT Talk Support', 'Contact us 24x7 at support@dtfttalk.com or call +91 800-DTFT-TALK')}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#E0F7FA' }]}>
              <Ionicons name="help-circle-outline" size={20} color="#00ACC1" />
            </View>
            <Text style={styles.menuItemText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Log Out Button */}
        <TouchableOpacity
          style={styles.logoutBtn}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#FF3B30" style={{ marginRight: 8 }} />
          <Text style={styles.logoutBtnText}>Log Out from DTFT Talk</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>DTFT Talk App v1.0.0 (Build 57)</Text>
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
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEF2F6',
    marginBottom: 16,
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#0084FF',
    marginRight: 14,
  },
  profileDetails: {
    flex: 1,
  },
  nameBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  studentName: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
    color: '#0F172A',
  },
  levelPill: {
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  levelPillText: {
    fontSize: 10,
    fontWeight: Typography.weight.bold,
    color: '#0084FF',
  },
  studentIdText: {
    fontSize: Typography.size.xxs,
    color: '#64748B',
    fontWeight: Typography.weight.medium,
  },
  emailText: {
    fontSize: Typography.size.xxs,
    color: '#94A3B8',
    marginTop: 2,
  },
  statsBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#EEF2F6',
    marginBottom: 20,
  },
  statCol: {
    alignItems: 'center',
  },
  statNum: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
    color: '#0084FF',
  },
  statLabel: {
    fontSize: Typography.size.xxs,
    color: '#64748B',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#EEF2F6',
  },
  menuGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    marginBottom: 16,
  },
  groupHeading: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  menuIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semiBold,
    color: '#1E293B',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF0F2',
    borderRadius: 16,
    paddingVertical: 14,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#FFEBEB',
  },
  logoutBtnText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: '#FF3B30',
  },
  versionText: {
    fontSize: 10,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 18,
  },
});

export default ProfileScreen;
