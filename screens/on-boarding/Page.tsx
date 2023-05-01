import React from 'react';
import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CustomText from '../layouts/CustomText';

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
      <CustomText title={icon} />
      <View style={{ marginTop: 16 }}>
        <CustomText style={{
          margin: 10,
          padding: 10,
          textAlign: 'center',
          fontSize: 24
        }} title={title} />
      </View>
    </View>
  );
};

export default Page;