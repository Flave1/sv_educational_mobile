import React from 'react';
import { TextInput as RNTextInput, View, StyleSheet, useColorScheme } from 'react-native';
import { AppDark, AppLight } from '../../tools/color';

export default function CustomTextArea({ icon, height, ...otherProps }: any) {
  const isDarkMode = useColorScheme() === 'dark';
  const validationColor = isDarkMode ? AppLight : AppDark;
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
      <View style={{ flex: 1 }}>
        <RNTextInput
          multiline={true}
          style={{
            fontWeight: 'bold', fontSize: 20,
            color: validationColor,
            height: '100%',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            borderColor: 'grey', borderWidth: 1
          }}
          underlineColorAndroid='transparent'
          placeholderTextColor={'grey'}
          {...otherProps}
        />
      </View>
    </View>
  );
}