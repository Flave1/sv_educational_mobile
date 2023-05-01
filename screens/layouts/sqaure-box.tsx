import React from "react";
import { Box, HStack, Stack, Text } from "@react-native-material/core";
import CustomText from "./CustomText";
import { View } from "react-native";
import { AppButtonColorDark, AppLight } from "../../tools/color";


const SquareBox = ({ AssIcon, AssCount, NoteIcon, NoteCount, studentCountIcon, studentCount, className }: any) => (
    <Box w={150} h={120} m={2} radius={10} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: AppButtonColorDark }}>
        <Stack spacing={20}>
            <View style={{ margin: 20, marginLeft: 30 }}>
                <Text style={{ fontSize: 25, color: AppLight }}>{className}</Text>
            </View>
            <View>
                <HStack spacing={10}>
                    <HStack>
                        <Text style={{ fontSize: 17, color: AppLight }}>{AssCount}</Text>
                        <CustomText title={AssIcon} />
                    </HStack>
                    <HStack>
                        <Text style={{ fontSize: 17, color: AppLight }}>{NoteCount}</Text>
                        <CustomText title={NoteIcon} />
                    </HStack>
                    <HStack spacing={1}>
                        <Text style={{ fontSize: 17, color: AppLight }}>{studentCount}</Text>
                        <CustomText title={studentCountIcon} />
                    </HStack>
                </HStack>
            </View>
        </Stack>

    </Box>
);

export default SquareBox;