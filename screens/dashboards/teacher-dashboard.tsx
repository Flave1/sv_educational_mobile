import React, { useState } from "react";
import { Text, useColorScheme, View } from "react-native";



import { useNavigation } from "@react-navigation/native";
import ProtectedTeacher from "../authentication/protected-teacher";
import TeacherAnnouncementBox from "../components/layouts/teacher-announcement-box";
import { HStack, Stack } from "@react-native-material/core";
import CustomText from "../components/layouts/CustomText";
import { AppDark, AppLight } from "../../tools/color";
import DashboardBox from "../components/layouts/dashboard-box";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "native-base";
const TeacherDashboard = ({ state, dispatch, backgroundColor }: any) => {

    const navigation = useNavigation()
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <ProtectedTeacher backgroundColor={backgroundColor}>
            {/* <ScrollView> */}
            <Stack style={{ backgroundColor: isDarkMode ? AppLight : AppDark, flex: 1 }}>
                <View style={{ padding: 10, paddingRight: 0 }}>
                    <TeacherAnnouncementBox />
                </View>
                <HStack style={{ padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <DashboardBox
                        AssIcon={<MaterialIcons name="assessment" color="white" size={24} />}
                        AssCount={29}
                        NoteIcon={<MaterialCommunityIcons name="bookshelf" color="white" size={24} />}
                        NoteCount={10}
                        studentCountIcon={<FontAwesome5 name="users" color="white" size={24} />}
                        studentCount={30}
                        className="JSS 1"
                    />
                    <DashboardBox
                        AssIcon={<MaterialIcons name="assessment" color="white" size={24} />}
                        AssCount={29}
                        NoteIcon={<MaterialCommunityIcons name="bookshelf" color="white" size={24} />}
                        NoteCount={10}
                        studentCountIcon={<FontAwesome5 name="users" color="white" size={24} />}
                        studentCount={30}
                        className="JSS 2"
                    />
                </HStack>
                <HStack style={{ padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <DashboardBox
                        AssIcon={<MaterialIcons name="assessment" color="white" size={24} />}
                        AssCount={29}
                        NoteIcon={<MaterialCommunityIcons name="bookshelf" color="white" size={24} />}
                        NoteCount={10}
                        studentCountIcon={<FontAwesome5 name="users" color="white" size={24} />}
                        studentCount={30}
                        className="JSS 1"
                    />
                    <DashboardBox
                        AssIcon={<MaterialIcons name="assessment" color="white" size={24} />}
                        AssCount={29}
                        NoteIcon={<MaterialCommunityIcons name="bookshelf" color="white" size={24} />}
                        NoteCount={10}
                        studentCountIcon={<FontAwesome5 name="users" color="white" size={24} />}
                        studentCount={30}
                        className="JSS 2"
                    />
                </HStack>
                <HStack style={{ padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <DashboardBox
                        AssIcon={<MaterialIcons name="assessment" color="white" size={24} />}
                        AssCount={29}
                        NoteIcon={<MaterialCommunityIcons name="bookshelf" color="white" size={24} />}
                        NoteCount={10}
                        studentCountIcon={<FontAwesome5 name="users" color="white" size={24} />}
                        studentCount={30}
                        className="JSS 1"
                    />
                    <DashboardBox
                        AssIcon={<MaterialIcons name="assessment" color="white" size={24} />}
                        AssCount={29}
                        NoteIcon={<MaterialCommunityIcons name="bookshelf" color="white" size={24} />}
                        NoteCount={10}
                        studentCountIcon={<FontAwesome5 name="users" color="white" size={24} />}
                        studentCount={30}
                        className="JSS 2"
                    />
                </HStack>
               
             
            </Stack>
            {/* </ScrollView> */}
        </ProtectedTeacher>

    );
};

export default TeacherDashboard;