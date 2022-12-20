import React from 'react';
import { TextInput as RNTextInput, View, StyleSheet, useColorScheme } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import { AppDark, AppLight, TextLight } from '../../../tools/color';

export default function CustomTextInput({ icon, ...otherProps }: any) {
  const isDarkMode = useColorScheme() === 'dark';
  const validationColor = isDarkMode ? AppLight : AppDark;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        borderRadius: 8,
        borderColor: validationColor,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 2,
      }}
    >
      <View style={{ padding: 8 }}>
        <Entypo name={icon} color={validationColor} size={16} />
      </View>
      <View style={{ flex: 1 }}>
        <RNTextInput
          style={{ color: validationColor, fontWeight:'bold', fontSize:20 }}
          underlineColorAndroid='transparent'
          placeholderTextColor={isDarkMode ? AppLight : AppDark}
          {...otherProps}
        />
      </View>
    </View>
  );
}