import React from "react";
import { HStack, Banner, Button } from "@react-native-material/core";
import CustomText from "./CustomText";
import { useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../../screen-routes/navigation";
import { AppLightBlue, AppPurple } from "../../../tools/color";

const TeacherAnnouncementBox = ({ state, dispatch, backgroundColor, navigation }: any) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <Banner
            style={{ backgroundColor: AppPurple, borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}
            text={<CustomText style={{  fontSize: 23 }} title="What Am I Doing here, Somebody please help.... Kus Announcement come here" />}
            buttons={
                <HStack spacing={2}>
                    <Button onPress={() => navigation.navigate(screens.scenes.mainapp.scenes.tutor.screens.announcement.name)} key="learn-more" style={{ backgroundColor: '#2C3E50', }} titleStyle={{ fontSize: 17, textTransform: "capitalize" }} title={'Announcemnts'} compact />
                </HStack>
            }
        />
    );
}
export default TeacherAnnouncementBox;