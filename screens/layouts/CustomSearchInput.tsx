import { Text } from '@react-native-material/core';
import React, { useState } from 'react';
import { TextInput, View, StyleSheet, useColorScheme } from 'react-native';
import { AppLight, AppDark, TextLight, TextDark, AppButtonColorDark } from '../../tools/color';

export default function CustomSearchInput({ icon, borderColor, textColor, backgroundColor, setSearchQuery, ...otherProps }: any) {
  const isDarkMode = useColorScheme() === 'dark';
  const bdColor = borderColor ? borderColor : isDarkMode ? AppLight : AppLight;
  const txColor = textColor ? textColor : isDarkMode ? AppLight : AppLight;
  const [showOnFocusStyle, setFocusStyles] = useState(false);

  const bgColor = backgroundColor ? backgroundColor : AppButtonColorDark
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
        backgroundColor: bgColor
      }}
    >
      <View style={{ padding: 8, }}>
        <Text style={{ color: isDarkMode ? TextLight : TextDark }}>  {icon}</Text>
      </View>
      <View style={[{ flex: 1, borderRadius: 5 }]}>
        <TextInput
          onChange={(e) => setSearchQuery(e.nativeEvent.text)}
          style={{ fontWeight: 'bold', fontSize: 20, color: !textColor ? 'white' : 'black' }}
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