import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationBar } from 'expo-navigation-bar';
import { AppNavigator } from './src/appNavigation/AppNavigator';

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      try {
        NavigationBar.setStyle('dark');
      } catch {
        // Graceful fallback for non-supported runtime environments
      }
    }
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        {Platform.OS === 'android' && <NavigationBar style="dark" />}
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
