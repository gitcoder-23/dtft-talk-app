import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Svg, {
  Circle,
  Path,
  Rect,
  G,
  LinearGradient as SvgGradient,
  Stop,
  Defs,
} from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../appNavigation/navigationTypes';
import { Colors } from '../../constants/color';
import { Typography } from '../../constants/fonts';
import { CustomButton } from '../../common/CustomButton';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('MainTabs');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Background Decorative Top & Bottom Shapes */}
        <View style={styles.topRightWave}>
          <Svg width="120" height="100" viewBox="0 0 120 100">
            <Path
              d="M 120 0 Q 70 30 60 70 Q 50 100 0 100 L 120 100 Z"
              fill="rgba(255, 59, 48, 0.8)"
            />
          </Svg>
        </View>

        {/* Top Logo Section: 4 Circles DTFT Logo */}
        <View style={styles.logoSection}>
          <View style={styles.fourCircleRow}>
            <View style={[styles.circleBadge, { backgroundColor: '#F44336' }]}>
              <Text style={styles.circleLetter}>D</Text>
            </View>
            <View style={[styles.circleBadge, { backgroundColor: '#00BCD4' }]}>
              <Text style={styles.circleLetter}>T</Text>
            </View>
            <View style={[styles.circleBadge, { backgroundColor: '#FFC107' }]}>
              <Text style={styles.circleLetter}>F</Text>
            </View>
            <View style={[styles.circleBadge, { backgroundColor: '#1E88E5' }]}>
              <Text style={styles.circleLetter}>T</Text>
            </View>
          </View>

          <View style={styles.brandTitleRow}>
            <Text style={styles.brandSubtitleMain}>
              TALK <Text style={{ color: '#0084FF' }}>|</Text> SCHOOL OF ENGLISH & AI
            </Text>
          </View>
          <Text style={styles.brandSubtitleSec}>
            Training and Skill Development Unit of DTFT Solutions
          </Text>
        </View>

        {/* Hero Section: Boy Mascot & Floating Badges */}
        <View style={styles.heroSection}>
          {/* Left Headlines */}
          <View style={styles.headlineContainer}>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <View style={styles.dtftTitleRow}>
              <Text style={[styles.bigTitle, { color: '#F44336' }]}>D</Text>
              <Text style={[styles.bigTitle, { color: '#00BCD4' }]}>T</Text>
              <Text style={[styles.bigTitle, { color: '#0084FF' }]}>F</Text>
              <Text style={[styles.bigTitle, { color: '#0062E0' }]}>T </Text>
              <Text style={[styles.bigTitle, { color: '#FF9500' }]}>Talk</Text>
            </View>
            <Text style={styles.centreSubtitle}>
              Spoken English & Skill Development Centre
            </Text>
            <Text style={styles.taglineText}>
              <Text style={{ color: '#0084FF' }}>Learn </Text>
              <Text style={{ color: '#F44336' }}>Today. </Text>
              <Text style={{ color: '#0084FF' }}>Lead </Text>
              <Text style={{ color: '#00C853' }}>Tomorrow.</Text>
            </Text>
          </View>

          {/* Right Mascot & Activity Chips */}
          <View style={styles.mascotArtContainer}>
            {/* SVG 3D Student with Laptop & AI Chip Graphic */}
            <Svg width="180" height="190" viewBox="0 0 200 210">
              <Defs>
                <SvgGradient id="hoodieGrad" x1="0" y1="0" x2="1" y2="1">
                  <Stop offset="0" stopColor="#0084FF" />
                  <Stop offset="1" stopColor="#005CE6" />
                </SvgGradient>
                <SvgGradient id="laptopGrad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#E2E8F0" />
                  <Stop offset="1" stopColor="#CBD5E1" />
                </SvgGradient>
              </Defs>

              {/* Glowing AI Chip overhead */}
              <G transform="translate(10, 20)">
                <Rect x="0" y="0" width="34" height="34" rx="8" fill="#E8F4FD" stroke="#0084FF" strokeWidth="2" />
                <Circle cx="17" cy="17" r="10" fill="#0084FF" />
                <Path d="M 17 2 L 17 7 M 17 27 L 17 32 M 2 17 L 7 17 M 27 17 L 32 17" stroke="#0084FF" strokeWidth="2" />
              </G>

              {/* Student Body & Hoodie */}
              <Circle cx="120" cy="110" r="42" fill="url(#hoodieGrad)" />
              <Circle cx="120" cy="72" r="32" fill="#FCD34D" />
              {/* Hair */}
              <Path d="M 90 70 C 90 40 150 40 150 70 C 145 60 130 55 120 58 C 110 55 95 60 90 70 Z" fill="#1E293B" />
              {/* Smile & Eyes */}
              <Circle cx="110" cy="70" r="3.5" fill="#1E293B" />
              <Circle cx="130" cy="70" r="3.5" fill="#1E293B" />
              <Path d="M 112 80 Q 120 90 128 80" stroke="#E11D48" strokeWidth="2.5" fill="none" strokeLinecap="round" />

              {/* Laptop & Desk */}
              <Rect x="85" y="125" width="70" height="42" rx="4" fill="url(#laptopGrad)" />
              <Path d="M 80 167 L 160 167 L 155 174 L 85 174 Z" fill="#94A3B8" />
              {/* Apple / DTFT Logo on Laptop */}
              <Circle cx="120" cy="146" r="5" fill="#FFFFFF" />

              {/* Books Stack */}
              <Rect x="148" y="148" width="46" height="10" rx="2" fill="#00C853" />
              <Rect x="145" y="158" width="50" height="10" rx="2" fill="#FF3B30" />
              <Rect x="142" y="168" width="54" height="10" rx="2" fill="#0084FF" />

              {/* Plant Pot */}
              <Rect x="175" y="128" width="16" height="18" rx="3" fill="#F59E0B" />
              <Path d="M 183 128 Q 175 112 183 105 Q 192 115 183 128" fill="#10B981" />
            </Svg>

            {/* Floating Activity Badges */}
            <View style={styles.floatingBadgesColumn}>
              <View style={[styles.activityPill, { backgroundColor: '#0084FF' }]}>
                <Text style={styles.activityPillText}>Learn</Text>
              </View>
              <View style={[styles.activityPill, { backgroundColor: '#FF3B30' }]}>
                <Text style={styles.activityPillText}>Practice</Text>
              </View>
              <View style={[styles.activityPill, { backgroundColor: '#FFB300' }]}>
                <Text style={styles.activityPillText}>Build</Text>
              </View>
              <View style={[styles.activityPill, { backgroundColor: '#00C853' }]}>
                <Text style={styles.activityPillText}>Grow</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 4 Circular Category Cards */}
        <View style={styles.categoriesRow}>
          <TouchableOpacity activeOpacity={0.8} style={styles.categoryTile}>
            <View style={[styles.categoryCircle, { backgroundColor: '#EBF5FF' }]}>
              <Ionicons name="desktop-outline" size={28} color="#0084FF" />
            </View>
            <Text style={styles.categoryTileText}>Computer{'\n'}Courses</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.categoryTile}>
            <View style={[styles.categoryCircle, { backgroundColor: '#FFEBEB' }]}>
              <Ionicons name="hardware-chip-outline" size={28} color="#FF3B30" />
            </View>
            <Text style={styles.categoryTileText}>AI &{'\n'}Technology</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.categoryTile}>
            <View style={[styles.categoryCircle, { backgroundColor: '#FFF8E1' }]}>
              <Ionicons name="color-palette-outline" size={28} color="#FFB300" />
            </View>
            <Text style={styles.categoryTileText}>Creative{'\n'}Skills</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.categoryTile}>
            <View style={[styles.categoryCircle, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="trending-up-outline" size={28} color="#00C853" />
            </View>
            <Text style={styles.categoryTileText}>Career{'\n'}Growth</Text>
          </TouchableOpacity>
        </View>

        {/* Feature Card: Build Your Skills for a Better Future */}
        <View style={styles.featureBannerCard}>
          <View style={styles.featureLeftInfo}>
            <Text style={styles.featureSubHeading}>Build Your</Text>
            <Text style={styles.featureMainHeading}>
              Skills for a{'\n'}
              <Text style={{ color: '#0084FF' }}>Better </Text>
              <Text style={{ color: '#00C853' }}>Future</Text>
            </Text>
            <View style={styles.featureBullets}>
              <Text style={styles.bulletItem}>Practical Training • Expert Guidance</Text>
              <Text style={styles.bulletItem}>Certification • Job Support</Text>
            </View>
          </View>

          {/* Feature Laptop / Hat Illustration */}
          <View style={styles.featureIllustration}>
            <Svg width="120" height="110" viewBox="0 0 130 120">
              {/* Laptop Graphic */}
              <Rect x="20" y="45" width="85" height="52" rx="6" fill="#0084FF" />
              <Rect x="25" y="50" width="75" height="42" rx="4" fill="#FFFFFF" />
              {/* Graduation Hat on Screen */}
              <Path d="M 62 60 L 40 70 L 62 78 L 84 70 Z" fill="#005CE6" />
              <Rect x="54" y="74" width="16" height="10" fill="#005CE6" />
              <Path d="M 80 73 L 86 85" stroke="#FFB300" strokeWidth="2.5" />
              {/* Laptop Base */}
              <Path d="M 12 97 L 112 97 L 105 104 L 20 104 Z" fill="#94A3B8" />

              {/* Floating Icons */}
              {/* Lightbulb */}
              <Circle cx="24" cy="30" r="14" fill="#FEF9E7" />
              <Path d="M 24 22 A 6 6 0 0 1 24 34 L 24 36" stroke="#FFB300" strokeWidth="2.5" />
              {/* Code */}
              <Circle cx="104" cy="28" r="14" fill="#E8F4FD" />
              <Path d="M 98 28 L 101 25 M 101 31 L 98 28 M 110 28 L 107 25 M 107 31 L 110 28" stroke="#0084FF" strokeWidth="2" strokeLinecap="round" />
            </Svg>
          </View>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonsSection}>
          <CustomButton
            title="Get Started"
            showArrow
            onPress={handleGetStarted}
            size="large"
            style={styles.primaryBtn}
          />
          <CustomButton
            title="Login"
            variant="outline"
            onPress={handleLogin}
            size="large"
            style={styles.outlineBtn}
          />
        </View>

        {/* Footer: Safe • Secure • Trusted */}
        <View style={styles.footerSection}>
          <View style={styles.trustBadge}>
            <Ionicons name="shield-checkmark" size={18} color="#0084FF" />
            <Text style={styles.trustText}>Safe • Secure • Trusted</Text>
          </View>
        </View>

        {/* Bottom Corner Wave Curves */}
        <View style={styles.bottomWaves}>
          <View style={styles.bottomLeftYellow}>
            <Svg width="100" height="90" viewBox="0 0 100 90">
              <Path
                d="M 0 90 L 100 90 Q 50 30 0 0 Z"
                fill="#FFC107"
              />
            </Svg>
          </View>
          <View style={styles.bottomRightGreen}>
            <Svg width="120" height="90" viewBox="0 0 120 90">
              <Path
                d="M 120 90 L 0 90 Q 60 30 120 0 Z"
                fill="#00C853"
              />
            </Svg>
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
  scrollContent: {
    paddingBottom: 20,
    position: 'relative',
  },
  topRightWave: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 0,
  },
  logoSection: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 12,
  },
  fourCircleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  circleBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  circleLetter: {
    fontSize: 22,
    fontWeight: Typography.weight.extraBold,
    color: '#FFFFFF',
  },
  brandTitleRow: {
    marginTop: 8,
  },
  brandSubtitleMain: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.extraBold,
    color: '#D32F2F',
    letterSpacing: 1.2,
  },
  brandSubtitleSec: {
    fontSize: Typography.size.xxs,
    color: '#005CE6',
    fontWeight: Typography.weight.medium,
    marginTop: 2,
  },
  heroSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  headlineContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
    color: '#1E293B',
  },
  dtftTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 2,
  },
  bigTitle: {
    fontSize: Typography.size.xxxl,
    fontWeight: Typography.weight.extraBold,
    letterSpacing: -0.5,
  },
  centreSubtitle: {
    fontSize: Typography.size.xs,
    color: '#475569',
    fontWeight: Typography.weight.medium,
    marginTop: 2,
  },
  taglineText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    marginTop: 6,
  },
  mascotArtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  floatingBadgesColumn: {
    marginLeft: -10,
    gap: 6,
  },
  activityPill: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  activityPillText: {
    fontSize: 10,
    fontWeight: Typography.weight.bold,
    color: '#FFFFFF',
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    marginVertical: 18,
  },
  categoryTile: {
    alignItems: 'center',
    width: width * 0.21,
  },
  categoryCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryTileText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 14,
  },
  featureBannerCard: {
    backgroundColor: '#F0F9FF',
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0F2FE',
    shadowColor: '#0084FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  featureLeftInfo: {
    flex: 1,
  },
  featureSubHeading: {
    fontSize: Typography.size.sm,
    color: '#0084FF',
    fontWeight: Typography.weight.bold,
  },
  featureMainHeading: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.extraBold,
    color: '#0F172A',
    marginVertical: 4,
    lineHeight: 24,
  },
  featureBullets: {
    marginTop: 6,
  },
  bulletItem: {
    fontSize: Typography.size.xxs,
    color: '#64748B',
    fontWeight: Typography.weight.medium,
    lineHeight: 16,
  },
  featureIllustration: {
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsSection: {
    paddingHorizontal: 20,
    marginTop: 22,
    gap: 12,
  },
  primaryBtn: {
    width: '100%',
  },
  outlineBtn: {
    width: '100%',
  },
  footerSection: {
    alignItems: 'center',
    marginTop: 18,
    zIndex: 2,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  trustText: {
    fontSize: Typography.size.xs,
    color: '#475569',
    fontWeight: Typography.weight.medium,
  },
  bottomWaves: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
    zIndex: 1,
  },
  bottomLeftYellow: {},
  bottomRightGreen: {},
});

export default WelcomeScreen;
