import { HStack, Switch, Text } from "@react-native-material/core";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { AppDark, AppLight, TextLight } from "../../tools/color";

const CustomCheckBoxWithBorder = ({ text, onValueChange, isSelected = false }: any) => {
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
            <HStack spacing={7} style={{ margin: 10 }}>
                <Switch value={isSelected} onValueChange={onValueChange} />
                <Text style={{ fontWeight: 'bold', color: isDarkMode ? TextLight : AppDark }}>{text}</Text>
            </HStack>
        </View>
    )
}
export default CustomCheckBoxWithBorder;

export const CustomCheckBox = ({ text, onValueChange, isSelected = false }: any) => {
    const isDarkMode = useColorScheme() === 'dark';
    const validationColor = isDarkMode ? AppLight : AppDark;
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <HStack spacing={7} style={{ margin: 1 }}>
                <Switch value={isSelected} onValueChange={onValueChange} />
                <Text style={{ fontWeight: 'bold', color: isDarkMode ? TextLight : AppDark }}>{text}</Text>
            </HStack>
        </View>
    )
}

