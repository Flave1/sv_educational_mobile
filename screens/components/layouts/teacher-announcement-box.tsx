import React from "react";
import { HStack, Banner, Button } from "@react-native-material/core";
import CustomText from "./CustomText";
import { useColorScheme } from "react-native";

const TeacherAnnouncementBox = ({ state, dispatch, backgroundColor }: any) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <Banner
            style={{ backgroundColor: isDarkMode ? '#3498DB' : '#D6DBDF', borderBottomLeftRadius:10, borderTopLeftRadius:10 }}
            text={<CustomText style={{ fontSize: 23 }} title="What Am I Doing here, Somebody please help.... Kus Announcement come here" />}
            buttons={
                <HStack spacing={2}>
                    <Button key="learn-more" variant={isDarkMode ? "contained" : 'text'} style={{ backgroundColor: '#2C3E50' }} title={<CustomText style={{ fontSize: 17 }} title={"Announcemnts"} />} compact />
                </HStack>
            }
        />
    );
}
export default TeacherAnnouncementBox;