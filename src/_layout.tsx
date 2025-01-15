import React from 'react';
import { View } from 'react-native';
import WebLayout from './components/common/Layout/WebLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WebLayout>
      <View>{children}</View>
    </WebLayout>
  );
}