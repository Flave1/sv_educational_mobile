import { Button } from '@react-native-material/core';
import React from 'react';
import { useColorScheme } from 'react-native';
import { AppDark, AppLight } from '../../../tools/color';

export default function CustomButton({ onPress }: any) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Button style={{ backgroundColor: isDarkMode ? '#2C3E50' : AppDark }} title="SUBMIT" titleStyle={{ fontWeight: 'bold', fontSize:20 }} onPress={onPress} />
  );
}