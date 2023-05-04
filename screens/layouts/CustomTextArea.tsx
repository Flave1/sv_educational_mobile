import React, { useState } from 'react';
import { TextInput, View, StyleSheet, useColorScheme, Text } from 'react-native';
import { AppDark, AppLight } from '../../tools/color';
import { Stack } from '@react-native-material/core';

export default function CustomTextArea({ icon, height, ...otherProps }: any) {
  const isDarkMode = useColorScheme() === 'dark';
  const validationColor = isDarkMode ? AppLight : AppLight;
  const textAreaHeight = !height ? 300 : height;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: textAreaHeight,
        borderRadius: 8,
        borderColor: validationColor,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 2,
      }}
    >
      {/* <View style={{ padding: 8, }}>
        <Text style={{ color: isDarkMode ? TextLight : TextDark }}>  {icon}</Text>
      </View> */}
      <Stack style={{ flex: 1 }}>

        <TextInput
          style={{ fontWeight: 'bold', fontSize: 20 }}
          underlineColorAndroid='transparent'
          placeholderTextColor={'grey'}
          {...otherProps}
        />

      </Stack>
    </View>
  );
}
