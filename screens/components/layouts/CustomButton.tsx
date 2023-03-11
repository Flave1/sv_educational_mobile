import { Button } from '@react-native-material/core';
import React from 'react';
import { useColorScheme } from 'react-native';
import { AppButtonColorDark, AppDark, AppLight } from '../../../tools/color';

export default function CustomButton({ onPress, backgroundColor }: any) {
  const isDarkMode = useColorScheme() === 'dark';
  const bgColor = backgroundColor ? backgroundColor : isDarkMode ? '#2C3E50' : AppButtonColorDark
  return (
    <Button style={{ backgroundColor:  bgColor}} title="SUBMIT" titleStyle={{ fontWeight: 'bold', fontSize:20 }} onPress={onPress} />
  );
}