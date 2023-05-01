import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import CustomText from './CustomText';

const RoundedButton = ({ label, onPress }: any) => {
  return (
    <TouchableOpacity
      style={{ alignItems: 'center', justifyContent: 'center' }}
      onPress={onPress}
    >
      <CustomText title={label} style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }} />
    </TouchableOpacity>
  );
};

export default RoundedButton;