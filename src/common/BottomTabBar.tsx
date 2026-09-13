import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '../constants/fonts';
import { Colors } from '../constants/color';

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, Platform.OS === 'ios' ? 20 : 8);

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: bottomPadding, height: 56 + bottomPadding }]}>
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
          label = 'Practice';
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
                <Ionicons name="mic" size={26} color={Colors.white} />
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
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 84 : 64,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 8,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: '100%',
  },
  centerTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -16,
  },
  centerIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 3,
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
    bottom: -4,
    width: 16,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
});

export default BottomTabBar;
