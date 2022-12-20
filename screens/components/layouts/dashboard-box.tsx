import React from "react";
import { Box, HStack, Stack } from "@react-native-material/core";
import CustomText from "./CustomText";
import { View } from "react-native";


const DashboardBox = ({ AssIcon, AssCount, NoteIcon, NoteCount, studentCountIcon, studentCount, className }: any) => (
    <Box w={150} h={120} m={2} radius={10} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#2C3E50' }}>
        <Stack spacing={20}>
            <View style={{ margin: 20 , marginLeft: 40}}>
                <CustomText style={{ fontSize: 30 }} title={className} />
            </View>
            <View>
                <HStack spacing={10}>
                    <HStack >
                        <CustomText style={{fontSize: 17}} title={AssCount} />
                        <CustomText title={AssIcon} />
                    </HStack>
                    <HStack>
                        <CustomText style={{fontSize: 17}} title={NoteCount} />
                        <CustomText title={NoteIcon} />
                    </HStack>
                    <HStack spacing={1}>
                        <CustomText style={{fontSize: 17}} title={studentCount} />
                        <CustomText title={studentCountIcon} />
                    </HStack>
                </HStack>
            </View>
        </Stack>

    </Box>
);

export default DashboardBox;