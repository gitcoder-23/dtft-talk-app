import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../constants/fonts';
import { Colors } from '../constants/color';
import { getSafeBottomPadding } from '../utils/safeArea';

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const bottomPadding = getSafeBottomPadding(insets.bottom, 10);

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: bottomPadding }]}>
      {/* Upper content row holding the interactive tab items */}
      <View style={styles.tabContentRow}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          let label = 'Home';

          if (route.name === 'HomeTab') {
            iconName = isFocused ? 'home' : 'home-outline';
            label = 'Home';
          } else if (route.name === 'NotesTab') {
            iconName = isFocused ? 'document-text' : 'document-text-outline';
            label = 'Notes';
          } else if (route.name === 'PracticeTab') {
            iconName = 'mic';
            label = 'Speak';
          } else if (route.name === 'ProgressTab') {
            iconName = isFocused ? 'stats-chart' : 'stats-chart-outline';
            label = 'Progress';
          } else if (route.name === 'ProfileTab') {
            iconName = isFocused ? 'person' : 'person-outline';
            label = 'Profile';
          }

          // Center Practice Tab with Elevated Circle
          if (route.name === 'PracticeTab') {
            return (
              <TouchableOpacity
                key={route.key}
                activeOpacity={0.85}
                onPress={onPress}
                style={styles.centerTabButton}
              >
                <View style={[styles.centerIconCircle, isFocused && styles.centerIconCircleActive]}>
                  <Ionicons name="mic" size={24} color={Colors.white} />
                </View>
                <Text
                  style={[
                    styles.tabLabel,
                    styles.centerTabLabel,
                    isFocused && styles.activeTabLabel,
                  ]}
                >
                  {label}
                </Text>
                {isFocused && <View style={styles.centerActiveIndicatorLine} />}
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.7}
              onPress={onPress}
              style={styles.tabButton}
            >
              <Ionicons
                name={iconName}
                size={22}
                color={isFocused ? Colors.primary : Colors.textMuted}
              />
              <Text
                style={[
                  styles.tabLabel,
                  isFocused ? styles.activeTabLabel : styles.inactiveTabLabel,
                ]}
              >
                {label}
              </Text>
              {isFocused && <View style={styles.activeIndicatorLine} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 8,
  },
  tabContentRow: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  tabButton: {
    flex: 1,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  centerTabButton: {
    flex: 1,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  centerIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -18,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
  centerIconCircleActive: {
    backgroundColor: Colors.primaryBlueDark,
    transform: [{ scale: 1.05 }],
  },
  centerTabLabel: {
    marginTop: 2,
  },
  tabLabel: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.medium,
    marginTop: 2,
  },
  activeTabLabel: {
    color: Colors.primary,
    fontWeight: Typography.weight.bold,
  },
  inactiveTabLabel: {
    color: Colors.textMuted,
  },
  activeIndicatorLine: {
    position: 'absolute',
    bottom: 2,
    width: 16,
    height: 2.5,
    borderRadius: 1.5,
    backgroundColor: Colors.primary,
  },
  centerActiveIndicatorLine: {
    position: 'absolute',
    bottom: 2,
    width: 28,
    height: 2.5,
    borderRadius: 1.5,
    backgroundColor: Colors.primary,
  },
});

export default BottomTabBar;
