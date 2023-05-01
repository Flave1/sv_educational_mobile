import React from "react";
import { Box, HStack, Stack, Text } from "@react-native-material/core";
import { AppButtonColorDark, AppLight, AppLightBlue } from "../../tools/color";


const HomeAssessmentBox = ({ title, deadlineDate, status, group, subject }: any) => (
    <Box w={180} h={120} m={2} radius={6} style={{ justifyContent: 'flex-start', padding: 5, backgroundColor: AppButtonColorDark }}>
        <Stack spacing={2}>
            <Stack>
                <Text style={{ color: 'grey', fontFamily: 'tahoma', fontSize: 12 }}>{'Title'}</Text>
                <Text style={{ color: AppLight, fontSize: 14, fontWeight: 'bold' }}>{title}</Text>
            </Stack>
            <Stack>
                <HStack>
                    <Text style={{ color: 'grey', fontFamily: 'tahoma', width: '75%', fontSize: 12 }}>{'Deadline'}</Text>
                    <Text style={{ color: 'grey', fontSize: 12, fontFamily: 'tahoma' }}>{'Status'}</Text>
                </HStack>
                <Stack>
                    <HStack>
                        <Text style={{ color: AppLightBlue, width: '75%', fontSize: 13, fontWeight: 'bold' }}>{deadlineDate}</Text>
                        <Text style={{ color: AppLightBlue, fontSize: 13, fontWeight: 'bold' }}>{status}</Text>
                    </HStack>
                </Stack>
            </Stack>
            <Stack>
                <HStack>
                    <Text style={{ color: AppLight, width: '50%', fontSize: 13, fontWeight: 'bold', fontFamily: 'tahoma' }}>{group}</Text>
                    <Text style={{ color: AppLight, fontSize: 13, width: '50%', fontWeight: 'bold', fontFamily: 'tahoma' }}>{subject}</Text>
                </HStack>
            </Stack>
        </Stack>

    </Box>
);

export default HomeAssessmentBox;