import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../appNavigation/navigationTypes';
import { Colors } from '../../constants/color';
import { Typography } from '../../constants/fonts';
import { AppLogo } from '../../common/AppLogo';
import { CustomButton } from '../../common/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [authMethod, setAuthMethod] = useState<'mobile' | 'email'>('mobile');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [email, setEmail] = useState('student@dtfttalk.com');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpValues, setOtpValues] = useState(['5', '2', '8', '9']);
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Bar with Back Button */}
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="#0084FF" />
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
                <Text style={{ fontWeight: 'bold', color: '#0084FF' }}>DTFT Talk</Text>.
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
                    color={authMethod === 'mobile' ? '#FFFFFF' : '#64748B'}
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
                    color={authMethod === 'email' ? '#FFFFFF' : '#64748B'}
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
                      placeholderTextColor="#94A3B8"
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      maxLength={10}
                    />
                    {phoneNumber.length > 0 && (
                      <TouchableOpacity onPress={() => setPhoneNumber('')}>
                        <Ionicons name="close-circle" size={18} color="#94A3B8" />
                      </TouchableOpacity>
                    )}
                  </View>
                ) : (
                  <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={20} color="#0084FF" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholder="Enter student email"
                      placeholderTextColor="#94A3B8"
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
                <Ionicons name="logo-google" size={18} color="#EA4335" />
                <Text style={styles.socialBtnText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialBtn}
                activeOpacity={0.7}
                onPress={handleGuestLogin}
              >
                <Ionicons name="logo-apple" size={18} color="#0F172A" />
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
            <Ionicons name="shield-checkmark" size={18} color="#0084FF" />
            <Text style={styles.footerShieldText}>Safe • Secure • Trusted</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  authCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  headerArea: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: Typography.size.xxl,
    fontWeight: Typography.weight.extraBold,
    color: '#0F172A',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: Typography.size.sm,
    color: '#64748B',
    lineHeight: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
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
    backgroundColor: '#0084FF',
    shadowColor: '#0084FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleTabText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semiBold,
    color: '#64748B',
  },
  toggleTabTextActive: {
    color: '#FFFFFF',
    fontWeight: Typography.weight.bold,
  },
  inputsSection: {
    gap: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 12,
    backgroundColor: '#FAFAFA',
    height: 52,
  },
  countryCodeBadge: {
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#CBD5E1',
    marginRight: 10,
  },
  countryCodeText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: '#1E293B',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 14,
    backgroundColor: '#FAFAFA',
    height: 52,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: Typography.size.md,
    color: '#0F172A',
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
    color: '#64748B',
  },
  editTargetText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: '#0084FF',
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
    borderColor: '#0084FF',
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinText: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: '#0F172A',
  },
  resendRow: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: Typography.size.xs,
    color: '#94A3B8',
  },
  resendActionText: {
    fontSize: Typography.size.xs,
    color: '#0084FF',
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
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    paddingHorizontal: 12,
    fontSize: Typography.size.xs,
    color: '#94A3B8',
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
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  socialBtnText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semiBold,
    color: '#1E293B',
  },
  guestLink: {
    alignItems: 'center',
    marginTop: 18,
  },
  guestLinkText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: '#0084FF',
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
    color: '#64748B',
    fontWeight: Typography.weight.medium,
  },
});

export default LoginScreen;
