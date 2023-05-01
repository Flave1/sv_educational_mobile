import React from "react";
import { Box, Pressable, Text } from "@react-native-material/core";
import { AppButtonColorDark } from "../../tools/color";


const CircleBox = ({ icon, text, onPress }: any) => (
    <Pressable onTouchStart={onPress}>
        <Box w={100} h={83} m={2} style={{ alignItems: 'center', paddingTop: 10 }}>
            <Box w={50} h={50} radius={100} style={{ backgroundColor: AppButtonColorDark, justifyContent: 'center', alignItems: 'center' }}>
                {icon}
            </Box>
            <Box style={{ width: '100%', alignItems: 'center' }}>
                <Text textBreakStrategy="balanced" style={{ fontWeight: '300', fontSize:10 }}>{text}</Text>
            </Box>

        </Box>
    </Pressable>
);

export default CircleBox;