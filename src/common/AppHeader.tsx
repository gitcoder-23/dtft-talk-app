import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/color';
import { AssetImages } from '../constants/assetImages';
import { AppLogo } from './AppLogo';

interface AppHeaderProps {
  showBack?: boolean;
  onBackPress?: () => void;
  showNotification?: boolean;
  hasUnreadNotifications?: boolean;
  onNotificationPress?: () => void;
  onAvatarPress?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  showBack = false,
  onBackPress,
  showNotification = true,
  hasUnreadNotifications = true,
  onNotificationPress,
  onAvatarPress,
}) => {
  const insets = useSafeAreaInsets();
  const topInset = Math.max(
    insets.top,
    Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0
  );

  return (
    <View style={[styles.headerContainer, { paddingTop: topInset + 8 }]}>
      {/* Left: Optional Back Button or Logo */}
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={26} color={Colors.primaryDarker} />
          </TouchableOpacity>
        )}
        <AppLogo size="small" />
      </View>

      {/* Right: Notifications Bell and Avatar */}
      <View style={styles.rightSection}>
        {showNotification && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onNotificationPress}
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={24} color={Colors.primaryDarker} />
            {hasUnreadNotifications && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.avatarButton}
          onPress={onAvatarPress}
          activeOpacity={0.8}
        >
          <Image
            source={AssetImages.studentAvatar}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 8,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    position: 'relative',
    padding: 6,
    borderRadius: 20,
    backgroundColor: Colors.background,
  },
  unreadDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.danger,
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
  avatarButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.primary,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
});

export default AppHeader;
