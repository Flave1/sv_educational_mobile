import React, { useState } from 'react';
import { TextInput as RNTextInput, View, StyleSheet, useColorScheme, Text } from 'react-native';
import { AppDark, AppLight } from '../../tools/color';
import { Stack } from 'native-base';
// import { QuillDeltaToHtmlConverter, QuillToolbar, Quill } from 'react-native-quill';

export default function CustomTextArea({ icon, height, ...otherProps }: any) {
  const isDarkMode = useColorScheme() === 'dark';
  const validationColor = isDarkMode ? AppLight : AppDark;
  const textAreaHeight = !height ? 300 : height;

  const [editorHtml, setEditorHtml] = useState('');
  const [editorDelta, setEditorDelta] = useState(null);

  const handleEditorChange = (value: any) => {
    setEditorHtml(value);
  };

  // const handleSave = () => {
  //   if (editorDelta) {
  //     const converter = new QuillDeltaToHtmlConverter(editorDelta);
  //     const html = converter.convert();
  //     setEditorHtml(html);
  //   }
  // };


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
        {/* <QuillToolbar />
        <Quill
          theme="snow"
          onChange={setEditorDelta}
          onTextChange={handleEditorChange}
          placeholder="Type something..."
        /> */}
      </Stack>
    </View>
  );
}
