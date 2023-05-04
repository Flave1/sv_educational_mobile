import { Text } from '@react-native-material/core';
import React from 'react';
import {
   useColorScheme,
} from 'react-native';
import { TextLight, TextDark } from '../../tools/color';

export default function CustomText(props: any) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Text  style={[props.style, {
      color: isDarkMode ? TextLight : TextLight
    }]}>
      {props.title}
    </Text>
  );
}
