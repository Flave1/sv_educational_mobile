import { Text } from '@react-native-material/core';
import React, { useState } from 'react';
import { TextInput as RNTextInput, View, StyleSheet, useColorScheme } from 'react-native';
import { AppLight, AppDark, TextLight, TextDark } from '../../tools/color';

export default function CustomTextInput({ icon, borderColor, textColor, ...otherProps }: any) {
  const isDarkMode = useColorScheme() === 'dark';
  const bdColor = borderColor ? borderColor : isDarkMode ? AppLight : AppDark;
  const txColor = textColor ? textColor : isDarkMode ? AppLight : AppDark;
  const [showOnFocusStyle, setFocusStyles] = useState(false);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        borderRadius: 8,
        borderColor: bdColor,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 2,
      }}
    >
      <View style={{ padding: 8, }}>
        <Text style={{ color: isDarkMode ? TextLight : TextDark }}>  {icon}</Text>
      </View>
      <View style={[{ flex: 1, borderRadius: 5}]}>
        <RNTextInput
          onFocus={() => {
            setFocusStyles(true);
          }}
          onBlur={() => {
            setFocusStyles(false)
          }}
          style={{ fontWeight: 'bold', fontSize: 20, color: !textColor ?  'white' : 'black'}}
          underlineColorAndroid='transparent'
          placeholderTextColor={'grey'}
          {...otherProps}
        />
      </View>
    </View>
  );
}
// backgroundColor: txColor? showOnFocusStyle ? '#C2C7C9' : '#C2C7C9' : '' 
const styles = StyleSheet.create({
  onFocus: {
    borderRadius: 5
  }
})