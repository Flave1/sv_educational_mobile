import React from 'react';
import { View, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CustomText from '../layouts/CustomText';
import { AppLightBlue } from '../../tools/color';

const Page = ({ backgroundColor, iconName, title }: any) => {
  const icon = <Feather name={iconName} size={300} />
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundColor,
        }]}
    >
      <Text style={{ color: AppLightBlue }}>{icon}</Text>
      <View style={{ marginTop: 16 }}>
        <Text

          style={{
            fontWeight:'bold',
            margin: 10,
            padding: 10,
            textAlign: 'center',
            fontSize: 24,
            color: AppLightBlue,
          }}>{title}</Text>
      </View>
    </View>
  );
};

export default Page;