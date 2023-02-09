import { Text } from '@react-native-material/core';
import React from 'react';
import {
   useColorScheme,
} from 'react-native';
import { TextDark, TextLight } from '../../../tools/color';

export default function CustomText(props: any) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Text  style={[props.style, {
      color: isDarkMode ? TextLight : TextDark
    }]}>
      {props.title}
    </Text>
  );
}
