import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/color';
import { Typography } from '../constants/fonts';

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
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
                <Ionicons name="mic" size={26} color="#FFFFFF" />
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
              color={isFocused ? '#0084FF' : '#94A3B8'}
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
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#0F172A',
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
    backgroundColor: '#0084FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0084FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
  centerIconCircleActive: {
    backgroundColor: '#0062E0',
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
    color: '#0084FF',
    fontWeight: Typography.weight.bold,
  },
  inactiveTabLabel: {
    color: '#94A3B8',
  },
  activeIndicatorLine: {
    position: 'absolute',
    bottom: -4,
    width: 16,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#0084FF',
  },
});

export default BottomTabBar;
