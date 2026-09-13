import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../appNavigation/navigationTypes';
import { Typography } from '../../constants/fonts';
import { Colors } from '../../constants/color';
import { AppLogo } from '../../common/AppLogo';
import { CustomButton } from '../../common/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const topInset = Math.max(
    insets.top,
    Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0
  );

  const [authMethod, setAuthMethod] = useState<'mobile' | 'email'>('mobile');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [email, setEmail] = useState('student@dtfttalk.com');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpValues] = useState(['5', '2', '8', '9']);
  const [resendTimer, setResendTimer] = useState(45);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isOtpSent && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, resendTimer]);

  const handleSendOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsOtpSent(true);
      setResendTimer(45);
    }, 600);
  };

  const handleVerifyLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('MainTabs');
    }, 600);
  };

  const handleGuestLogin = () => {
    navigation.navigate('MainTabs');
  };

  return (
    <View style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingTop: topInset + 12 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Bar with Back Button */}
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.primary} />
            </TouchableOpacity>
            <AppLogo size="small" />
          </View>

          {/* Card Container */}
          <View style={styles.authCard}>
            {/* Header */}
            <View style={styles.headerArea}>
              <Text style={styles.cardTitle}>Student Portal Login</Text>
              <Text style={styles.cardSubtitle}>
                Enter your details to continue your spoken English journey on{' '}
                <Text style={{ fontWeight: 'bold', color: Colors.primary }}>DTFT Talk</Text>.
              </Text>
            </View>

            {/* Toggle: Mobile vs Email */}
            {!isOtpSent && (
              <View style={styles.toggleRow}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setAuthMethod('mobile')}
                  style={[
                    styles.toggleTab,
                    authMethod === 'mobile' && styles.toggleTabActive,
                  ]}
                >
                  <Ionicons
                    name="call-outline"
                    size={16}
                    color={authMethod === 'mobile' ? Colors.white : Colors.slate500}
                  />
                  <Text
                    style={[
                      styles.toggleTabText,
                      authMethod === 'mobile' && styles.toggleTabTextActive,
                    ]}
                  >
                    Mobile Number
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setAuthMethod('email')}
                  style={[
                    styles.toggleTab,
                    authMethod === 'email' && styles.toggleTabActive,
                  ]}
                >
                  <Ionicons
                    name="mail-outline"
                    size={16}
                    color={authMethod === 'email' ? Colors.white : Colors.slate500}
                  />
                  <Text
                    style={[
                      styles.toggleTabText,
                      authMethod === 'email' && styles.toggleTabTextActive,
                    ]}
                  >
                    Email Address
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Input Section */}
            {!isOtpSent ? (
              <View style={styles.inputsSection}>
                {authMethod === 'mobile' ? (
                  <View style={styles.phoneInputContainer}>
                    <View style={styles.countryCodeBadge}>
                      <Text style={styles.countryCodeText}>🇮🇳 +91</Text>
                    </View>
                    <TextInput
                      style={styles.textInput}
                      keyboardType="phone-pad"
                      placeholder="Enter 10-digit mobile"
                      placeholderTextColor={Colors.textMuted}
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      maxLength={10}
                    />
                    {phoneNumber.length > 0 && (
                      <TouchableOpacity onPress={() => setPhoneNumber('')}>
                        <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
                      </TouchableOpacity>
                    )}
                  </View>
                ) : (
                  <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={20} color={Colors.primary} style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholder="Enter student email"
                      placeholderTextColor={Colors.textMuted}
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>
                )}

                <CustomButton
                  title="Send Verification Code"
                  showArrow
                  onPress={handleSendOtp}
                  loading={loading}
                  style={styles.actionBtn}
                />
              </View>
            ) : (
              /* OTP Verification Section */
              <View style={styles.otpSection}>
                <View style={styles.otpHeaderRow}>
                  <Text style={styles.otpPromptText}>
                    Code sent to {authMethod === 'mobile' ? `+91 ${phoneNumber}` : email}
                  </Text>
                  <TouchableOpacity onPress={() => setIsOtpSent(false)}>
                    <Text style={styles.editTargetText}>Edit</Text>
                  </TouchableOpacity>
                </View>

                {/* 4 Pin Boxes */}
                <View style={styles.pinBoxesRow}>
                  {otpValues.map((val, index) => (
                    <View key={index} style={styles.pinBox}>
                      <Text style={styles.pinText}>{val}</Text>
                    </View>
                  ))}
                </View>

                {/* Resend Timer */}
                <View style={styles.resendRow}>
                  {resendTimer > 0 ? (
                    <Text style={styles.timerText}>
                      Resend code in 00:{resendTimer < 10 ? `0${resendTimer}` : resendTimer}
                    </Text>
                  ) : (
                    <TouchableOpacity onPress={() => setResendTimer(45)}>
                      <Text style={styles.resendActionText}>Resend Code Now</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <CustomButton
                  title="Verify & Enter DTFT Talk"
                  showArrow
                  onPress={handleVerifyLogin}
                  loading={loading}
                  style={styles.actionBtn}
                />
              </View>
            )}

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social & Guest Buttons */}
            <View style={styles.socialButtonsRow}>
              <TouchableOpacity
                style={styles.socialBtn}
                activeOpacity={0.7}
                onPress={handleGuestLogin}
              >
                <Ionicons name="logo-google" size={18} color={Colors.googleRed} />
                <Text style={styles.socialBtnText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialBtn}
                activeOpacity={0.7}
                onPress={handleGuestLogin}
              >
                <Ionicons name="logo-apple" size={18} color={Colors.slate900} />
                <Text style={styles.socialBtnText}>Apple</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.guestLink}
              activeOpacity={0.7}
              onPress={handleGuestLogin}
            >
              <Text style={styles.guestLinkText}>
                Explore as Guest Student →
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer Safe Shield */}
          <View style={styles.footerShield}>
            <Ionicons name="shield-checkmark" size={18} color={Colors.primary} />
            <Text style={styles.footerShieldText}>Safe • Secure • Trusted</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  authCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 22,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  headerArea: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: Typography.size.xxl,
    fontWeight: Typography.weight.extraBold,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: Typography.size.sm,
    color: Colors.slate500,
    lineHeight: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: Colors.borderLight,
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
  },
  toggleTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  toggleTabActive: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleTabText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semiBold,
    color: Colors.slate500,
  },
  toggleTabTextActive: {
    color: Colors.white,
    fontWeight: Typography.weight.bold,
  },
  inputsSection: {
    gap: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 16,
    paddingHorizontal: 12,
    backgroundColor: Colors.gray50,
    height: 52,
  },
  countryCodeBadge: {
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: Colors.slate300,
    marginRight: 10,
  },
  countryCodeText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.slate800,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 16,
    paddingHorizontal: 14,
    backgroundColor: Colors.gray50,
    height: 52,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: Typography.size.md,
    color: Colors.textPrimary,
    fontWeight: Typography.weight.medium,
  },
  actionBtn: {
    marginTop: 8,
  },
  otpSection: {
    gap: 16,
  },
  otpHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  otpPromptText: {
    fontSize: Typography.size.xs,
    color: Colors.slate500,
  },
  editTargetText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.primary,
  },
  pinBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginVertical: 10,
  },
  pinBox: {
    width: 54,
    height: 54,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.aliceBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinText: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.textPrimary,
  },
  resendRow: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
  },
  resendActionText: {
    fontSize: Typography.size.xs,
    color: Colors.primary,
    fontWeight: Typography.weight.bold,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    paddingHorizontal: 12,
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    paddingVertical: 12,
    backgroundColor: Colors.white,
  },
  socialBtnText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semiBold,
    color: Colors.slate800,
  },
  guestLink: {
    alignItems: 'center',
    marginTop: 18,
  },
  guestLinkText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.primary,
  },
  footerShield: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 24,
  },
  footerShieldText: {
    fontSize: Typography.size.xs,
    color: Colors.slate500,
    fontWeight: Typography.weight.medium,
  },
});

export default LoginScreen;
