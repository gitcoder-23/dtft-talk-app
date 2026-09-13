import React from 'react';
import { View } from 'react-native';

interface AppCommonWrapperProps {
  children?: React.ReactNode;
}

export const AppCommonWrapper: React.FC<AppCommonWrapperProps> = ({ children }) => {
  return <View style={{ flex: 1 }}>{children}</View>;
};

export default AppCommonWrapper;
