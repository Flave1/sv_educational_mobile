import { Text } from '@react-native-material/core';
import React from 'react';
import { TextInput as RNTextInput, View, StyleSheet, useColorScheme } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import { AppDark, AppLight, TextDark, TextLight } from '../../../tools/color';

export default function CustomTextArea({ icon, ...otherProps }: any) {
  const isDarkMode = useColorScheme() === 'dark';
  const validationColor = isDarkMode ? AppLight : AppDark;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 300,
        borderRadius: 8,
        borderColor: validationColor,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 2,
      }}
    >
      {/* <View style={{ padding: 8, }}>
        <Text style={{ color: isDarkMode ? TextLight : TextDark }}>  {icon}</Text>
      </View> */}
      <View style={{ flex: 1 }}>
        <RNTextInput
          multiline={true}
          style={{
            fontWeight: 'bold', fontSize: 20,
            color: validationColor,
            flexWrap: 'wrap',
            justifyContent: 'flex-start'
          }}
          underlineColorAndroid='transparent'
          placeholderTextColor={'grey'}
          {...otherProps}
        />
      </View>
    </View>
  );
}