import { Center, FormControl, NativeBaseProvider, Select, View } from 'native-base';
import React from 'react';
import { useColorScheme } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { AppButtonColorDark, AppDark, AppLight, TextLight } from '../../../tools/color';

export default function CustomDropdownInput({ data, onSelect, icon, ...otherProps }: any) {
  const isDarkMode = useColorScheme() === 'dark';
  const validationColor = isDarkMode ? AppLight : AppDark;
  return (
    <SelectDropdown
      buttonTextStyle={{ color: AppLight }}
      buttonStyle={{ borderRadius: 5, backgroundColor: AppButtonColorDark, width: '100%' }}
      data={data}
      dropdownStyle={{ overflow: 'scroll' }}
      onSelect={onSelect}
      dropdownIconPosition={'right'}
      renderDropdownIcon={() => <SimpleLineIcons name='arrow-down' size={13} color={TextLight} />}
      {...otherProps}


    />
  );
}