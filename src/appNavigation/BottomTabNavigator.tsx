import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './navigationTypes';
import { HomeScreen } from '../pages/Home/HomeScreen';
import { NotesScreen } from '../pages/Notes/NotesScreen';
import { PracticeScreen } from '../pages/Practice/PracticeScreen';
import { ProgressScreen } from '../pages/Progress/ProgressScreen';
import { ProfileScreen } from '../pages/Profile/ProfileScreen';
import { BottomTabBar } from '../common/BottomTabBar';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeTab"
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="NotesTab"
        component={NotesScreen}
        options={{ title: 'Notes' }}
      />
      <Tab.Screen
        name="PracticeTab"
        component={PracticeScreen}
        options={{ title: 'Practice' }}
      />
      <Tab.Screen
        name="ProgressTab"
        component={ProgressScreen}
        options={{ title: 'Progress' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
